import asyncio
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent / "backend"))

from modules.evaluation.service import evaluate_answer
from models.evaluation import SubmitAnswerRequest
from db import questions as questions_db
from db import syllabus as syllabus_db
from rich.console import Console

console = Console()

TEST_ANSWERS = {
    "weak": "The Last Lesson is a story.",
    "partial": (
        "The Last Lesson is written by Alphonse Daudet. "
        "It is about a French class. The teacher is M. Hamel."
    ),
    "good": (
        "The Last Lesson is written by Alphonse Daudet. "
        "It is set in Alsace, France. The story is about Franz, a young student "
        "who is late to school and discovers it is the last French lesson. "
        "The Prussians have ordered all schools to teach German instead of French. "
        "M. Hamel, the teacher, is very sad. The theme is love for one's mother tongue "
        "and the importance of language to national identity."
    ),
}


async def main():
    console.rule("[bold]Evaluation End-to-End Test[/bold]")

    console.print("\n[blue]Step 1:[/blue] Loading question from Supabase...")
    subjects = await syllabus_db.get_all_subjects()
    if not subjects:
        console.print("[red]No subjects found. Run Phase 1 seed SQL first.[/red]")
        sys.exit(1)

    subject_id = subjects[0]["id"]
    chapters = await syllabus_db.get_chapters_by_subject(subject_id)
    if not chapters:
        console.print("[red]No chapters found.[/red]")
        sys.exit(1)

    chapter_id = chapters[2]["id"]  # Chapter 3 — The Last Lesson
    questions = await questions_db.get_questions_by_chapter(chapter_id)
    if not questions:
        console.print("[red]No questions found. Run Phase 1 seed SQL first.[/red]")
        sys.exit(1)

    test_question = next((q for q in questions if q["marks"] == 2), questions[0])
    console.print(f"  Question: {test_question['question_text']}")
    console.print(f"  Marks: {test_question['marks']}")

    for quality, answer_text in TEST_ANSWERS.items():
        console.print(f"\n[blue]Testing {quality} answer...[/blue]")
        console.print(f"  Answer: {answer_text[:80]}...")

        try:
            request = SubmitAnswerRequest(
                question_id=test_question["id"],
                student_answer=answer_text,
                attempt_number=1,
            )
            result = await evaluate_answer(
                request=request,
                user_id="00000000-0000-0000-0000-000000000001",
            )
            console.print(
                f"  [green]Score:[/green] {result.marks_awarded}/{result.marks_total} "
                f"({result.percentage}%)"
            )
            console.print(f"  Model: {result.model_used}")
            console.print(f"  Cached: {result.cached}")
            if result.feedback.strengths:
                console.print(f"  Strength: {result.feedback.strengths[0]}")
            if result.feedback.missing_points:
                console.print(f"  Missing: {result.feedback.missing_points[0]}")
        except Exception as e:
            console.print(f"  [red]Error:[/red] {e}")

    console.rule("[bold green]Evaluation Test Complete[/bold green]")
    console.print("\nVerify scores increase: weak < partial < good")
    console.print("If they do, the evaluation module is working correctly.")


if __name__ == "__main__":
    asyncio.run(main())

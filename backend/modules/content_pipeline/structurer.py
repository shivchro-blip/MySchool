import json
import re
from pathlib import Path
from rich.console import Console

console = Console()

CHUNK_TYPES = [
    "summary", "explanation", "key_points", "example",
    "glossary", "exam_tip", "author_info", "theme", "character",
]

SECTION_PATTERNS = {
    "author_info": [r"about the author", r"the author", r"biography"],
    "summary":     [r"summary", r"synopsis", r"the story", r"the lesson"],
    "theme":       [r"theme", r"central idea", r"message", r"moral"],
    "character":   [r"character", r"characters", r"characterization"],
    "glossary":    [r"glossary", r"difficult words", r"vocabulary", r"new words"],
    "exam_tip":    [r"important questions", r"model questions", r"exam tips", r"points to remember"],
    "key_points":  [r"key points", r"important points", r"highlights"],
}


def detect_section_type(text: str) -> str | None:
    text_lower = text.lower().strip()
    for chunk_type, patterns in SECTION_PATTERNS.items():
        for pattern in patterns:
            if re.search(pattern, text_lower):
                return chunk_type
    return None


def clean_text(text: str) -> str:
    text = re.sub(r"^\s*\d+\s*$", "", text, flags=re.MULTILINE)
    text = re.sub(r" {2,}", " ", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def split_into_sections(pages: list[dict]) -> list[dict]:
    full_text = clean_text("\n".join(p["text"] for p in pages))
    sections = []
    current_header = "introduction"
    current_lines = []

    for line in full_text.split("\n"):
        stripped = line.strip()
        if not stripped:
            continue
        is_header = (
            len(stripped) < 60
            and (stripped.isupper() or stripped.istitle())
            and not stripped.endswith(".")
        )
        if is_header and current_lines:
            sections.append({"header": current_header, "text": "\n".join(current_lines).strip()})
            current_header = stripped
            current_lines = []
        else:
            current_lines.append(line)

    if current_lines:
        sections.append({"header": current_header, "text": "\n".join(current_lines).strip()})

    return sections


def structure_content(
    pages: list[dict],
    subject_code: str,
    class_level: str,
    chapter_number: int,
    chapter_title: str,
) -> list[dict]:
    chunks = []
    for section in split_into_sections(pages):
        if not section["text"] or len(section["text"]) < 30:
            continue
        chunk_type = detect_section_type(section["header"]) or "explanation"
        chunks.append({
            "subject_code":    subject_code,
            "class":           class_level,
            "chapter_number":  chapter_number,
            "chapter_title":   chapter_title,
            "section_header":  section["header"],
            "chunk_type":      chunk_type,
            "content":         clean_text(section["text"]),
            "language":        "en",
            "is_validated":    False,
        })
    console.print(f"[green]Structured[/green] {len(chunks)} chunks from {len(pages)} pages")
    return chunks


def save_structured_json(chunks: list[dict], output_path: str) -> None:
    path = Path(output_path)
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(chunks, f, indent=2, ensure_ascii=False)
    console.print(f"[blue]Saved[/blue] → {output_path}")


def load_structured_json(json_path: str) -> list[dict]:
    path = Path(json_path)
    if path.suffix.lower() != ".json":
        raise ValueError("Structured content path must be a .json file")
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

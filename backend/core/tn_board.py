"""
Tamil Nadu State Board — Constants and Context
==============================================

This module is the single source of truth for all Tamil Nadu State Board
constraints in the system. It is imported by:

  - config.py              (validates environment against board constraints)
  - models/syllabus.py     (enforces valid class levels and content types)
  - modules/evaluation/rubric.py  (mark level guidance)
  - api/v1/admin.py        (question creation validation)

Why this file exists
--------------------
Grapify audit identified "TN State Board Context" and "Syllabus-Aware AI Platform"
as isolated documentation nodes with zero code connections. This module converts
those design intentions into enforced constants that fail loudly at startup
if violated, rather than silently producing wrong behavior at runtime.

Board Reference
---------------
Tamil Nadu State Board of Secondary Education (TNBSE)
Higher Secondary First Year  (+1) — Class 11
Higher Secondary Second Year (+2) — Class 12
Subject: English (Core)
"""

from __future__ import annotations

# ── Class levels ──────────────────────────────────────────────────────────────

VALID_CLASS_LEVELS: tuple[str, ...] = ("+1", "+2")
"""
Tamil Nadu board only has two higher secondary years.
Any class level outside this tuple is invalid.
"""

CLASS_LEVEL_LABELS: dict[str, str] = {
    "+1": "Higher Secondary First Year (Class 11)",
    "+2": "Higher Secondary Second Year (Class 12)",
}

# ── Mark levels ───────────────────────────────────────────────────────────────

VALID_MARK_LEVELS: tuple[int, ...] = (1, 2, 5, 10)
"""
Tamil Nadu board uses exactly these four mark levels for questions.
No other mark values are valid in the system.
"""

MARK_LEVEL_GUIDANCE: dict[int, dict[str, str]] = {
    1: {
        "label":           "Very Short Answer",
        "description":     "Single correct fact or term. No partial marks.",
        "expected_length": "One word or one sentence (10–20 words)",
        "structure":       "None",
        "board_rule":      "Full mark or zero — no partial credit.",
    },
    2: {
        "label":           "Short Answer",
        "description":     "Key term + brief explanation.",
        "expected_length": "2–3 sentences (30–50 words)",
        "structure":       "Term/definition + supporting detail",
        "board_rule":      "1 mark for term only. 2 marks for term + explanation.",
    },
    5: {
        "label":           "Short Essay",
        "description":     "3-4 developed points with elaboration.",
        "expected_length": "One paragraph (80–120 words)",
        "structure":       "Point 1 + Point 2 + Point 3 (+ optional Point 4)",
        "board_rule":      "Award marks per complete point. Partial points get half mark.",
    },
    10: {
        "label":           "Essay",
        "description":     "Full structured essay.",
        "expected_length": "3–4 paragraphs (200–300 words)",
        "structure":       "Introduction + 4–5 developed points + Conclusion",
        "board_rule":      "Deduct 2 marks for missing intro or conclusion. "
                           "Deduct 1 mark per missing key point.",
    },
}

# ── Content types ─────────────────────────────────────────────────────────────

VALID_CONTENT_TYPES: tuple[str, ...] = ("prose", "poem", "grammar", "vocabulary")
"""
Tamil Nadu +1/+2 English syllabus content categories.
Each chapter is classified into one of these types.
"""

CONTENT_TYPE_LABELS: dict[str, str] = {
    "prose":      "Prose (Short Story / Essay)",
    "poem":       "Poem / Poetry",
    "grammar":    "Grammar Exercise",
    "vocabulary": "Vocabulary / Word Study",
}

CONTENT_TYPE_EXAM_PATTERN: dict[str, dict] = {
    "prose": {
        "typical_marks":     [2, 5, 10],
        "question_types":    ["author_info", "character", "summary", "theme"],
        "common_questions":  [
            "Write a brief note on the author",
            "Describe the main character",
            "What is the theme of the lesson?",
            "Give a summary of the lesson",
        ],
    },
    "poem": {
        "typical_marks":     [1, 2, 5],
        "question_types":    ["theme", "summary", "author_info", "explanation"],
        "common_questions":  [
            "Who is the poet of this poem?",
            "What is the central idea of the poem?",
            "Explain the following lines",
        ],
    },
    "grammar": {
        "typical_marks":     [1, 2],
        "question_types":    ["fill_blank", "match"],
        "common_questions":  [
            "Fill in the blanks",
            "Match the following",
        ],
    },
    "vocabulary": {
        "typical_marks":     [1, 2],
        "question_types":    ["short_answer", "fill_blank"],
        "common_questions":  [
            "Give the meaning of the following words",
            "Use the following words in sentences",
        ],
    },
}

# ── Chunk types ───────────────────────────────────────────────────────────────

VALID_CHUNK_TYPES: tuple[str, ...] = (
    "summary",
    "explanation",
    "key_points",
    "example",
    "glossary",
    "exam_tip",
    "author_info",
    "theme",
    "character",
)
"""
Types of content chunks extracted from syllabus PDFs.
Must match the CHECK constraint in the content_chunks DB table.
"""

# ── Question types ────────────────────────────────────────────────────────────

VALID_QUESTION_TYPES: tuple[str, ...] = (
    "short_answer",
    "paragraph",
    "essay",
    "fill_blank",
    "match",
)
"""
Must match the CHECK constraint in the questions DB table.
"""

# ── Language support ──────────────────────────────────────────────────────────

VALID_LANGUAGES: tuple[str, ...] = ("en", "ta")
"""
English (en) is the primary medium of instruction.
Tamil (ta) is available as an explanation language for students.
Tamil explanations are generated by translating English output.
"""

LANGUAGE_LABELS: dict[str, str] = {
    "en": "English",
    "ta": "Tamil (தமிழ்)",
}

# ── Subject registry ──────────────────────────────────────────────────────────

SUBJECT_REGISTRY: dict[str, dict] = {
    "ENG1": {
        "name":        "English",
        "class":       "+1",
        "medium":      "English",
        "total_units": 8,
        "description": "Higher Secondary First Year English — Tamil Nadu State Board",
    },
    "ENG2": {
        "name":        "English",
        "class":       "+2",
        "medium":      "English",
        "total_units": 8,
        "description": "Higher Secondary Second Year English — Tamil Nadu State Board",
    },
}
"""
Registry of supported subjects. Add new subjects here as they are implemented.
Subject codes must match the `code` column in the Supabase subjects table.
"""

# ── AI prompt context ─────────────────────────────────────────────────────────

BOARD_CONTEXT_FOR_AI = """
You are assisting Tamil Nadu State Board students preparing for their
Higher Secondary board examinations (+1 and +2, equivalent to Class 11–12).

Board context:
- Examining body: Tamil Nadu State Board of Secondary Education (TNBSE)
- Medium of instruction: English
- Mark levels: 1-mark (very short), 2-mark (short), 5-mark (paragraph), 10-mark (essay)
- Students write answers by hand in exam hall — no bullet points for essay questions
- Evaluation is strict: marks are awarded per point, not per paragraph

Student profile:
- Age: 16–18 years
- First language: Tamil (mother tongue)
- English proficiency: Intermediate
- Goal: Maximise marks in board examination
""".strip()
"""
Injected into system prompts to give the AI board-specific context.
Import and prepend to EXPLAIN_SYSTEM_PROMPT and EVALUATE_SYSTEM_PROMPT.
"""

# ── Validation helpers ────────────────────────────────────────────────────────

def validate_class_level(value: str) -> str:
    """Raise ValueError if class level is not valid for TN board."""
    if value not in VALID_CLASS_LEVELS:
        raise ValueError(
            f"Invalid class level '{value}'. "
            f"Tamil Nadu board supports: {VALID_CLASS_LEVELS}"
        )
    return value


def validate_marks(value: int) -> int:
    """Raise ValueError if mark level is not valid for TN board."""
    if value not in VALID_MARK_LEVELS:
        raise ValueError(
            f"Invalid mark level '{value}'. "
            f"Tamil Nadu board uses: {VALID_MARK_LEVELS}"
        )
    return value


def validate_content_type(value: str) -> str:
    """Raise ValueError if content type is not valid for TN board."""
    if value not in VALID_CONTENT_TYPES:
        raise ValueError(
            f"Invalid content type '{value}'. "
            f"Supported types: {VALID_CONTENT_TYPES}"
        )
    return value


def get_mark_guidance(marks: int) -> dict[str, str]:
    """Return full mark guidance dict for a given mark level."""
    if marks not in MARK_LEVEL_GUIDANCE:
        raise ValueError(f"No guidance defined for {marks} marks")
    return MARK_LEVEL_GUIDANCE[marks]


def get_exam_pattern(content_type: str) -> dict:
    """Return exam pattern for a given content type."""
    if content_type not in CONTENT_TYPE_EXAM_PATTERN:
        return CONTENT_TYPE_EXAM_PATTERN["prose"]  # safe default
    return CONTENT_TYPE_EXAM_PATTERN[content_type]


__all__ = [
    # Class levels
    "VALID_CLASS_LEVELS",
    "CLASS_LEVEL_LABELS",
    # Mark levels
    "VALID_MARK_LEVELS",
    "MARK_LEVEL_GUIDANCE",
    # Content types
    "VALID_CONTENT_TYPES",
    "CONTENT_TYPE_LABELS",
    "CONTENT_TYPE_EXAM_PATTERN",
    # Chunk and question types
    "VALID_CHUNK_TYPES",
    "VALID_QUESTION_TYPES",
    # Language
    "VALID_LANGUAGES",
    "LANGUAGE_LABELS",
    # Subject registry
    "SUBJECT_REGISTRY",
    # AI context
    "BOARD_CONTEXT_FOR_AI",
    # Validators
    "validate_class_level",
    "validate_marks",
    "validate_content_type",
    "get_mark_guidance",
    "get_exam_pattern",
]

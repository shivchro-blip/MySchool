import pdfplumber
from pathlib import Path
from rich.console import Console

console = Console()


def extract_pdf_pages(pdf_path: str) -> list[dict]:
    path = Path(pdf_path)
    if not path.exists():
        raise FileNotFoundError(f"PDF not found: {pdf_path}")

    pages = []
    with pdfplumber.open(pdf_path) as pdf:
        console.print(f"[blue]Extracting[/blue] {path.name} — {len(pdf.pages)} pages")
        for i, page in enumerate(pdf.pages, start=1):
            text = page.extract_text() or ""
            text = text.strip()
            if text:
                pages.append({"page_number": i, "text": text})
            console.print(f"  Page {i}: {len(text)} chars", style="dim")

    console.print(f"[green]Done[/green] — {len(pages)} pages extracted")
    return pages


def extract_pdf_tables(pdf_path: str) -> list[dict]:
    tables = []
    with pdfplumber.open(pdf_path) as pdf:
        for i, page in enumerate(pdf.pages, start=1):
            for table in page.extract_tables():
                if table:
                    tables.append({"page_number": i, "rows": table})
    return tables

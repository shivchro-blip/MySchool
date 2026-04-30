# PDF Extraction Script — stub
# Phase 2 will implement this fully
# Usage: python scripts/pdf_extract.py --input content/raw/file.pdf --output content/structured/

import argparse


def main():
    parser = argparse.ArgumentParser(description="Extract PDF content to structured JSON")
    parser.add_argument("--input", required=True, help="Path to PDF file")
    parser.add_argument("--output", required=True, help="Output folder for JSON")
    args = parser.parse_args()
    print(f"[stub] Would extract: {args.input} → {args.output}")
    print("Full implementation coming in Phase 2.")


if __name__ == "__main__":
    main()

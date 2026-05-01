"""
Ollama Connection Test
Verifies Ollama is running and the model responds correctly.
Run this before starting the backend for the first time.

Usage:
    python scripts/test_ollama.py
"""

import sys
import asyncio
import json
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent / "backend"))

from ai.ollama_client import is_ollama_available, chat, get_loaded_models
from rich.console import Console

console = Console()


async def main() -> None:
    console.rule("[bold]Ollama Connection Test[/bold]")
    passed = 0
    failed = 0

    # Check 1: Server reachable
    console.print("\n[blue]Check 1:[/blue] Ollama server reachable...")
    if await is_ollama_available():
        console.print("[green]PASS[/green] Ollama server is up")
        passed += 1
    else:
        console.print("[red]FAIL[/red] Ollama not reachable. Run: ollama serve")
        failed += 1
        sys.exit(1)

    # Check 2: Model available
    console.print("\n[blue]Check 2:[/blue] Model available...")
    models = await get_loaded_models()
    console.print(f"  Available: {models}")
    if any("mistral" in m for m in models):
        console.print("[green]PASS[/green] mistral:7b-instruct found")
        passed += 1
    else:
        console.print("[yellow]WARN[/yellow] mistral:7b-instruct not found")
        console.print("  Pull it: ollama pull mistral:7b-instruct")
        failed += 1

    # Check 3: Basic chat
    console.print("\n[blue]Check 3:[/blue] Basic chat response...")
    try:
        response = await chat(
            messages=[
                {"role": "system",  "content": "Reply in exactly 5 words."},
                {"role": "user",    "content": "What is the capital of France?"},
            ],
            max_tokens=20,
        )
        console.print(f"  Response: [italic]{response}[/italic]")
        console.print("[green]PASS[/green] Chat is working")
        passed += 1
    except Exception as e:
        console.print(f"[red]FAIL[/red] Chat error: {e}")
        failed += 1

    # Check 4: JSON output
    console.print("\n[blue]Check 4:[/blue] JSON response format...")
    try:
        response = await chat(
            messages=[
                {"role": "system", "content": "Respond with valid JSON only. No markdown."},
                {"role": "user",   "content": 'Return: {"status": "ok"}'},
            ],
            max_tokens=30,
        )
        json.loads(response.strip())
        console.print(f"  Parsed: {response.strip()}")
        console.print("[green]PASS[/green] JSON responses working")
        passed += 1
    except Exception as e:
        console.print(f"[yellow]WARN[/yellow] JSON issue: {e}")
        console.print("  This may cause parse errors in the explain endpoint.")
        failed += 1

    # Summary
    console.rule(
        f"[bold green]{passed} passed, {failed} failed[/bold green]"
        if failed == 0
        else f"[bold yellow]{passed} passed, {failed} failed[/bold yellow]"
    )
    if failed == 0:
        console.print("Ollama is ready. Start backend: uvicorn main:app --reload")
    sys.exit(0 if failed == 0 else 1)


if __name__ == "__main__":
    asyncio.run(main())

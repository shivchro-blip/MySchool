import asyncio
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent / "backend"))

from ai.ollama_client import is_ollama_available, chat, get_loaded_models
from rich.console import Console

console = Console()


async def main():
    console.rule("[bold]Ollama Connection Test[/bold]")

    console.print("\n[blue]Step 1:[/blue] Checking Ollama server...")
    available = await is_ollama_available()
    if not available:
        console.print("[red]FAIL[/red] Ollama is not running.")
        console.print("Start it with: ollama serve")
        sys.exit(1)
    console.print("[green]OK[/green] Ollama server is reachable")

    console.print("\n[blue]Step 2:[/blue] Checking loaded models...")
    models = await get_loaded_models()
    console.print(f"  Available models: {models}")
    if not any("mistral" in m for m in models):
        console.print("[yellow]WARN[/yellow] mistral:7b-instruct not found")
        console.print("Pull it with: ollama pull mistral:7b-instruct")
    else:
        console.print("[green]OK[/green] mistral:7b-instruct is available")

    console.print("\n[blue]Step 3:[/blue] Testing chat response...")
    messages = [
        {"role": "system", "content": "You are a helpful assistant. Reply in exactly 10 words."},
        {"role": "user",   "content": "What is the capital of France?"},
    ]
    try:
        response = await chat(messages=messages, max_tokens=50)
        console.print(f"  Response: [italic]{response}[/italic]")
        console.print("[green]OK[/green] Chat is working")
    except Exception as e:
        console.print(f"[red]FAIL[/red] Chat error: {e}")
        sys.exit(1)

    console.print("\n[blue]Step 4:[/blue] Testing JSON response format...")
    json_messages = [
        {"role": "system", "content": "Always respond with valid JSON only. No other text."},
        {"role": "user",   "content": 'Return this JSON: {"status": "ok", "test": true}'},
    ]
    try:
        import json
        response = await chat(messages=json_messages, max_tokens=50)
        parsed = json.loads(response.strip())
        console.print(f"  Parsed JSON: {parsed}")
        console.print("[green]OK[/green] JSON responses working")
    except Exception as e:
        console.print(f"[yellow]WARN[/yellow] JSON parsing issue: {e}")
        console.print("  This may cause issues with the explain endpoint.")

    console.rule("[bold green]Ollama Test Complete[/bold green]")
    console.print("\nOllama is ready. Start the backend with:")
    console.print("  cd backend && uvicorn main:app --reload --port 8000")


if __name__ == "__main__":
    asyncio.run(main())

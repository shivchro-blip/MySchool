import json
import re


def parse_llm_json(raw: str) -> tuple[dict | None, str]:
    """Strip markdown fences and parse JSON from LLM output.
    Returns (parsed_dict, cleaned_raw). parsed_dict is None on JSONDecodeError.
    """
    cleaned = re.sub(r"```(?:json)?\s*", "", raw).strip().rstrip("```").strip()
    try:
        return json.loads(cleaned), cleaned
    except json.JSONDecodeError:
        return None, cleaned

"""
Summarise backend request latency from the structured `http_request` logs.

Usage (on the server):
    journalctl -u examcoach-backend --since "1 hour ago" -o cat \
        | python scripts/latency_report.py [--route /api/v1/users/me]

Prints per-route count, p50/p95/p99 duration, 5xx rate, 401 rate and the
auth verification method mix. Non-JSON lines (uvicorn access logs) are skipped.
"""

import argparse
import json
import sys
from collections import Counter, defaultdict


def percentile(values: list[float], p: float) -> float:
    if not values:
        return float("nan")
    ordered = sorted(values)
    k = (len(ordered) - 1) * p / 100
    lo = int(k)
    hi = min(lo + 1, len(ordered) - 1)
    return ordered[lo] + (ordered[hi] - ordered[lo]) * (k - lo)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--route", help="only report this route template")
    args = parser.parse_args()

    durations: dict[str, list[float]] = defaultdict(list)
    statuses: dict[str, Counter] = defaultdict(Counter)
    auth_methods: Counter = Counter()
    auth_rejections: Counter = Counter()

    for line in sys.stdin:
        line = line.strip()
        if not line.startswith("{"):
            continue
        try:
            rec = json.loads(line)
        except json.JSONDecodeError:
            continue
        event = rec.get("event")
        if event == "auth_rejected":
            auth_rejections[rec.get("reason", "?")] += 1
            continue
        if event != "http_request":
            continue
        route = f'{rec.get("method")} {rec.get("route")}'
        if args.route and rec.get("route") != args.route:
            continue
        durations[route].append(float(rec.get("duration_ms", 0)))
        statuses[route][int(rec.get("status", 0))] += 1
        if rec.get("auth_method"):
            auth_methods[rec["auth_method"]] += 1

    header = f'{"route":48} {"count":>7} {"p50":>8} {"p95":>8} {"p99":>8} {"5xx%":>6} {"401%":>6}'
    print(header)
    print("-" * len(header))
    for route in sorted(durations, key=lambda r: -len(durations[r])):
        values = durations[route]
        total = len(values)
        s5xx = sum(c for s, c in statuses[route].items() if s >= 500)
        s401 = statuses[route][401]
        print(f"{route[:48]:48} {total:7d} {percentile(values, 50):8.1f} "
              f"{percentile(values, 95):8.1f} {percentile(values, 99):8.1f} "
              f"{100 * s5xx / total:6.2f} {100 * s401 / total:6.2f}")

    if auth_methods:
        total = sum(auth_methods.values())
        mix = ", ".join(f"{m} {100 * c / total:.1f}%" for m, c in auth_methods.most_common())
        print(f"\nauth methods: {mix}")
    if auth_rejections:
        print("auth rejections: " + ", ".join(f"{r}={c}" for r, c in auth_rejections.most_common()))


if __name__ == "__main__":
    main()

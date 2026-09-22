"""Recover displayed values and error-bar geometry from the original vector PDFs.

Run from website: uv run --with pymupdf python scripts/extract-chart-data.py
The output is JSON. Error extents are read from vector paths, not raster pixels;
the original statistical definition of those bars is deliberately not inferred.
"""
import hashlib
import json
from pathlib import Path

import pymupdf

SOURCES = Path(__file__).resolve().parent / "reference-figures"
SPECS = {
    "tasks": ("dagger_main.pdf", [
        ("Insert Bread", ["No Steer", "0", "1", "2"], [59.5, 86.7, 95.3, 100.0], [None, 2.72, 1.39, 0.19]),
        ("Hang Cup", ["No Steer", "0", "1", "2"], [39.6, 67.7, 80.5, 88.1], [None, 2.76, 2.62, 2.75]),
        ("Push Ball", ["No Steer", "0", "1", "2"], [26.4, 85.6, 93.0, 98.4], [None, 3.09, 2.97, 1.86]),
    ]),
    "policies": ("dagger_new.pdf", [
        ("\u03c0\u2080.\u2085", ["0", "1", "2"], [86.7, 95.3, 100.0], [2.72, 1.39, 0.19]),
        ("DP", ["0", "1", "2", "3"], [63.6, 83.1, 94.9, 98.4], [2.36, 2.15, 1.25, 0.24]),
        ("FastWAM", ["0", "1", "2"], [78.4, 86.5, 94.3], [2.72, 2.10, 0.98]),
    ]),
}


def rgb(color):
    return tuple(round(v * 255) for v in color) if color else None


result = {"successDomain": [0, 115], "steeringDomain": [-0.5, 5.5], "sets": {}}
for key, (filename, specs) in SPECS.items():
    source = SOURCES / filename
    page = pymupdf.open(source)[0]
    paths = page.get_drawings()
    text = page.get_text().splitlines()
    axes = sorted(set(tuple(d["rect"]) for d in paths
                      if rgb(d["color"]) == (207, 212, 220)
                      and d["rect"].width < 0.001 and d["rect"].height > 40))
    assert len(axes) == 6
    panels = []
    for index, (title, rounds, success, steering) in enumerate(specs):
        left, top, _, bottom = axes[index * 2]
        right = axes[index * 2 + 1][0]
        panel = {"title": title, "rounds": rounds}
        for name, values, color, domain, precision in [
            ("success", success, (247, 179, 22), [0, 115], 1),
            ("steering", steering, (127, 152, 167), [-0.5, 5.5], 2),
        ]:
            bars = sorted(set(tuple(d["rect"]) for d in paths
                              if rgb(d["color"]) == color and d["fill"] is None
                              and len(d["items"]) == 1 and d["rect"].width < 0.001
                              and left < d["rect"].x0 < right))
            assert len(bars) == sum(v is not None for v in values)
            to_value = lambda y: domain[0] + (bottom - y) / (bottom - top) * (domain[1] - domain[0])
            entries = []
            bar_index = 0
            for value in values:
                if value is None:
                    entries.append(None)
                    continue
                x, upper_y, _, lower_y = bars[bar_index]
                bar_index += 1
                low, high = to_value(lower_y), to_value(upper_y)
                # Check source text and plotted centers independently before exporting.
                label = f"{value:.{precision}f}" + ("%" if name == "success" else "")
                assert label in text, label
                center = (low + high) / 2
                assert abs(center - value) < 0.051 if precision == 1 else abs(center - value) < 0.0051
                entries.append({"value": value, "low": round(low, 6), "high": round(high, 6)})
            panel[name] = entries
        panels.append(panel)
    result["sets"][key] = {"source": filename, "sha256": hashlib.sha256(source.read_bytes()).hexdigest(), "panels": panels}
print(json.dumps(result, indent=2, ensure_ascii=True))

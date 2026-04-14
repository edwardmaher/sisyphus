# Progress

## Features
- Overall progress view (triggered by `o` keypress)
- Coding completion graph
- Coding value grade graph
- Writing word count graph
- Writing value grade graph
- Reading pages graph

## Trigger
User presses `o` when prompted at end of daily review. Replaces chat area with graph view. Press any key to exit back or quit.

## Graph Specifications

### X-Axis Logic
- < 7 days of data: x-axis = individual days (Mon, Tue, ...), points = dashes (`-`)
- ≥ 7 days of data: x-axis = two markers (2 months ago label, current month label), points = periods (`.`)

### Coding — Completion Graph
- Y-axis: 0 to 3/5 (0.0 to 0.6), markers at 1/10, 3/10, 5/10
- Arrow (`↑`) at top for values above 3/5
- Maps "adequate" = 1/5 per day contribution (rough heuristic display)

### Coding — Value Grade Graph
- Y-axis: F, C, B, A (whole letter markers only)
- Points represent daily value grade

### Writing — Word Count Graph
- Y-axis: 0 to 2000, markers every 500
- Arrow at top for word counts above 2000

### Writing — Value Grade Graph
- Y-axis: F, C, B, A
- Points represent daily average self-grade

### Reading — Pages Graph
- Y-axis: 0 to 100, markers every 30
- Arrow at top for pages above 100

## Rendering
Use a simple ASCII graph renderer (no external charting library).
Each graph: title line, y-axis with labels, data points, x-axis.
Render all graphs vertically stacked, scrollable if terminal too short.

## Data Source
Load all `~/.sisyphus/data/YYYY-MM-DD.json` files. Parse and sort by date. Extract relevant fields per graph.

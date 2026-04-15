# UI

## Features
- Terminal layout with persistent Sisyphus ASCII panel
- Pushing animation (default state)
- Yelling animation (triggered by missed day)
- Chat message area that coexists with animation
- Animation does not interrupt chat input/output

## Layout
```
┌─────────────────────────────────────────┐
│  [SISYPHUS ASCII PANEL — left or top]   │
│  3-4 frame loop, renders independently  │
├─────────────────────────────────────────┤
│  [CHAT / MESSAGE AREA]                  │
│  Sisyphus: Good morning...              │
│  > [user input]                         │
└─────────────────────────────────────────┘
```
Use Ink's `<Box>` with `flexDirection="column"` or split-pane approach.
Animation runs in a `useInterval` hook, updating frame index every ~200ms.
Chat area scrolls independently.

## Animation States
- **Pushing** (default): Sisyphus pushes boulder up. 3–4 frames, loops forever.
- **Yelling** (missed day): Sisyphus stands next to boulder yelling. 3–4 frames, loops until apology accepted.
State stored in React context; toggled by tracking module on boot.

## ASCII Assets
Frames loaded from `src/assets/pushing/frame-{1..4}.txt` and `src/assets/yelling/frame-{1..4}.txt`.
Files provided by user later — render placeholder `[ANIMATION]` until present.

## Chat Component
- Messages rendered as list, newest at bottom.
- Sisyphus messages prefixed with `Sisyphus: `
- User input line always visible at bottom.
- Input disabled while Sisyphus is "typing" (streaming Gemma response).

## Constraints
- Must work in standard 80-column terminal.
- No mouse required.
- `o` key press from "view progress?" prompt opens progress view.

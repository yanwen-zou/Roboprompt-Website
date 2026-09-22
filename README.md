# RoboPrompt project website

A self-contained static research project page. Open `dist/index.html` directly
in a browser, or serve `dist` with any static web server.

- `dist/index.html`: paper content and section structure.
- `dist/styles.css`: notebook grid, handwritten type, and responsive layout.
- `dist/main.js`: accessible demo switching and video playback.
- `dist/assets`: locally served fonts, research figures, and experiment videos.

Research content comes from `root.tex` and `sections/`. Authors are omitted to
match the anonymous paper. No venue, code repository, or publication URL is
invented. Demo footage is prerecorded and does not connect to a robot.

The site needs no build step or external runtime dependencies. Keep all of
`dist` together when deploying. Large videos load only when needed.

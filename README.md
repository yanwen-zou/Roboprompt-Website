# RoboPrompt project website

A self-contained static research project page. Open `dist/index.html` directly
in a browser, or serve `dist` with any static web server.

- `dist/index.html`: paper content and section structure.
- `dist/styles.css`: notebook grid, handwritten type, and responsive layout.
- `dist/main.js`: accessible demo switching and video playback.
- `dist/assets`: locally served fonts, research figures, and experiment videos.

Research content comes from `root.tex` and `sections/`. The author order and
contribution markers follow the supplied author list. Homepage links are from
the ActiveGlasses project page, plus Wendi Chen's supplied homepage; Guoxuan
Xu's unconfirmed homepage is intentionally not linked.

GitHub, Feishu, and X buttons are disabled with empty `data-url` attributes until
the project URLs are supplied. Replace them with anchors when adding the URLs.
No venue or publication URL is invented.

Demo footage is prerecorded and does not connect to a robot. The top row shows
bread, cup, and maze steering; the full presentation follows on its own row.
`phase-i-training.mp4` is the looping Phase I excerpt from the v8 method video.
Its mosaic shows illustrative collection examples, not a verified inventory of
the 500 training episodes. Figures come from `overview.pdf`, `architechture.pdf`,
`dagger_main.pdf`, and `dagger_new.pdf` in `../pics`.

The site needs no build step or external runtime dependencies. Keep all of
`dist` together when deploying. Large videos load only when needed.

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

GitHub, Feishu, and X Post buttons are disabled with empty `data-url` attributes until
the project URLs are supplied. Replace them with anchors when adding the URLs.
No venue or publication URL is invented.

Demo footage is prerecorded and does not connect to a robot. The top row shows
bread, cup, and maze steering; the full presentation follows on its own row.
The current method loops use the user-specified V9 editing pack:
`../video/method_animation/v9_nonactive_play/RoboPrompt_methods_v9_editing_pack 2/clips`.
`phase-i-v9.mp4` is 16-21 seconds of `02_Phase_I.mp4`; `tot-filtering-v9.mp4`
is 4-21 seconds of `04_TOT_filtering.mp4`. These loops have no overlay icons;
clicking the video or pressing Enter/Space while focused toggles playback.
Reduced-motion preferences disable automatic playback.

The progress metric compares the mean of 86.7, 67.7, and 85.6 percent at Round 0
with 100.0, 88.1, and 98.4 percent at the final DAgger round: 80.0 to 95.5
percent, or +15.5 percentage points, for pi_0.5 over three tasks.
The BibTeX block is intentionally empty until citation details are provided.
Figures come from `overview.pdf`, `architechture.pdf`, `dagger_main.pdf`, and
`dagger_new.pdf` in `../pics`.

The site needs no build step or external runtime dependencies. Keep all of
`dist` together when deploying. Large videos load only when needed.

## GitHub Pages

Repository: https://github.com/yanwen-zou/Roboprompt-Website

The `Deploy GitHub Pages` workflow publishes `dist` on pushes to `main` and
supports manual runs. The repository's Pages source must be GitHub Actions.
Only the static website is uploaded, not local QA or hosting credentials.

Project URL: https://yanwen-zou.github.io/Roboprompt-Website/

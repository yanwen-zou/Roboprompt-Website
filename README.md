# RoboPrompt project website

A self-contained static research project page. Open `dist/index.html` directly
in a browser, or serve `dist` with any static web server.

- `dist/index.html`: paper content and section structure.
- `dist/styles.css`: notebook grid, handwritten type, and responsive layout.
- `dist/main.js`: accessible demo switching and video playback.
- `dist/assets`: locally served fonts, research figures, and experiment videos.

Research content comes from `root.tex` and `sections/`. The author order and
contribution markers follow the supplied author list. Homepage links are from
the ActiveGlasses project page, plus the supplied homepages for Wendi Chen and
Guoxuan Xu (https://fluorescex.github.io/).

GitHub, Feishu, and X Post buttons are disabled with empty `data-url` attributes until
the project URLs are supplied. Replace them with anchors when adding the URLs.
No venue or publication URL is invented.

Demo footage is prerecorded and does not connect to a robot. The top row shows
bread, cup, and maze steering; the full presentation follows on its own row.
The current full presentation is `dist/assets/roboprompt-website-audio.mp4`,
converted from `../video/website_version/website_version.mov` to H.264 at
1920x1080 with fast-start playback. Its original AAC audio is copied without
re-encoding; there is no subtitle track and playback is not muted by default.
The matching cover comes from the same source folder. Independent steering
and method clips retain their existing sources.
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

## Native experiment charts

`dist/charts.js` renders the two result figures as responsive SVG components;
`dist/charts-data.js` supplies their data. The renderer retains the original
three-panel groups, dual axes (0-115% and -0.5-5.5), point labels, error bars,
and dashed No Steer-to-Round-0 segments. Mobile layouts stack the panels.
SVG text inherits the site's fonts and the plot background is transparent.

All 41 displayed means are transcribed from the PDF labels at their original
precision. Error-bar endpoints are recovered from the PDF vector paths using
the original axis transforms and rounded to six decimals; these are geometric
reconstructions, not newly calculated statistical estimates. In particular,
the script does not assume that the bars are standard deviations or confidence
intervals. Negative lower limits and limits above 100% are retained as drawn.

The exact source PDFs are in `scripts/reference-figures/`, with SHA-256 hashes
recorded in the data file. To inspect or regenerate the data JSON:

```sh
uv run --with pymupdf python scripts/extract-chart-data.py
```

The script checks every mean against source text and error-bar midpoints before
exporting. The old PNGs remain as no-JavaScript fallbacks. Screen readers also
receive a semantic table for every panel. No chart library or external service
is required at runtime.

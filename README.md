# Studio Portfolio

A static portfolio site split from the original single-file HTML into separate markup, CSS, and JavaScript.

## Structure

- `index.html` - page markup and third-party script/style links.
- `src/css/styles.css` - all project styles.
- `src/js/main.js` - cursor behavior, GSAP setup, and animation code.
- `assets/images/` - image exports and photography.
- `assets/videos/` - video assets.
- `assets/fonts/` - local font files if the project moves away from Google Fonts.
- `archive/studio-portfolio.original.html` - untouched copy of the imported source file.

## Running Locally

Open `index.html` in a browser, or run a small static server from this folder:

```powershell
npm run dev
```

Then visit `http://localhost:8080`.

## GSAP Notes

GSAP and ScrollTrigger are currently loaded from CDN in `index.html`, before `src/js/main.js`. Keep additional animation modules under `src/js/` as the project grows.

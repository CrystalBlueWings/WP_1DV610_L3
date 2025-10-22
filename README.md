# WP_1DV610_L3 — Sudoku Puzzle Solver App

> **L3A** depends on my **L2M** module (`sudoku-puzzle-solver`, published on npm).  
> **L2T** (tests for the module) live in a separate repository, as required by the course design.

## Disclaimer

This module was created as part of a school assignment.

## Description

### What is this?

A small React SPA to play Sudoku in the browser:
- generate puzzles in three difficulties
- enter digits with mouse/keyboard (arrows/Tab navigation)
- request **hints** (one safe next move)
- **check** the current grid for correctness
- **solve** the whole puzzle
- automatically **persist**/restore progress (localStorage)
- **clear** saved state and immediately start fresh (no page reload)

### Who is this for?

- **End users:** play Sudoku and get assistance. 
- **Module users:** the app demonstrates the public API of the `sudoku-puzzle-solver` module.  
- **Examiners:** the repo shows Clean Code (ch.2–11) discipline, a clear boundary to third‑party code, a test plan, and a working public deployment.

## Quick Start (local)

```bash
# Prerequisites: Node >= 20
cd sudoku-app
npm ci

# Optional: silence a dev warning
npm i -D @babel/plugin-proposal-private-property-in-object

# Optional: update browserslist DB
npx update-browserslist-db@latest

# Run dev server
npm start
# open http://localhost:3000
```

## Scripts

* npm start – run the dev server
* npm test – run smoke tests (uses Jest/Testing Library + mocks for L2)
* npm run build – production build

## Testing

The assignment allows manual testing (“at least one test per requirement”). See [`Test_Plan_and_Specification.md`](Test_Plan_and_Specification.md) for the full manual test suite.
Automated smoke tests live in [`src/App.test.js`](./sudoku-app/src/App.test.js) and mock the L2 module’s internals to keep the runner fast and deterministic.

## Bugs / Issues

All known bugs have been resolved as of 2025-10-22.

## Version

2.0.0

## Dependencies

- Node.js version 20.6.0 or later.
- npm package [`sudoku-puzzle-solver`](https://www.npmjs.com/package/sudoku-puzzle-solver)

## Deployment

The app is deployed on Netlify: [`Sudoku Game`](https://gorgeous-entremet-890297.netlify.app/)

## License

This project is licensed under the MIT license. For more information, see [`LICENSE`](LICENSE).

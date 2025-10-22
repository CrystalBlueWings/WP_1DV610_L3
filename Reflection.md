# Reflection on Clean Code (Chapters 2–11)

## Ch.2 – Meaningful Names

I renamed or kept names that “reveal intent” (e.g., `GameController`, `SudokuService`, `PuzzleBoard`, `getHint`, `updateCellValue`) so a reader answers the “big questions” by reading names alone. The app avoids “disinformation” and cutesy names; for example, `originalGrid` adds real context instead of something like `baseGrid`. I also avoided noise like type encodings or clever abbreviations; “choose technical names” only if the domain expects them (e.g., Sudoku “grid”, “cell”). I tried to “pick one word per concept” (e.g., consistently using “grid”, not mixing it with “board” in model code). One trade‑off: UI uses `PuzzleBoard` to match user language while the model uses `grid`, balancing “domain vs. solution names” and readability.

## Ch.3 – Functions

I applied “small functions that do one thing”. Event handlers delegate to cohesive helpers (e.g., `#updateCellValue`, `#solveCurrentPuzzle`, `#persist`). I kept argument lists short (often monadic) and removed redundant public wrappers (the teacher pointed this out): if a public method added no value, I inlined it and kept just the useful one. I avoided flag arguments and separated queries from commands where feasible. The chapter’s spirit of “do one thing” guided the split between `App` (UI orchestration), `GameController` (application logic), and `SudokuService` (boundary to L2).

## Ch.4 – Comments

I prefer code that needs fewer comments—“comments do not make up for bad code”. Where comments exist, they explain *why* (e.g., in `App.test.js` mocks) rather than restating *what* the code already shows. I removed commented‑out code paths (e.g., the old wrapper methods) and kept comments brief. The risk of stale comments is high in UI code that evolves; therefore I rely on expressive names and small functions.

## Ch.5 – Formatting

I kept files short and organized logically—high‑level orchestration at the top, details below. Vertical spacing separates concepts; horizontal formatting stays within reasonable line length. The grid rendering in `PuzzleBoard` maintains a clear hierarchy (container → rows → cells). Consistent indentation and grouping make it easy to scan and understand “at a glance”.

## Ch.6 – Objects and Data Structures

The `Puzzle` class encapsulates its state (`#grid`, `#originalGrid`), exposing behavior (`updateCell`, `resetGrid`, getters) instead of public fields. This hides representation and enables us to change underlying storage safely later. The app keeps the “Law of Demeter” in mind by routing all Sudoku logic through `GameController`/`SudokuService` rather than UI components reaching into L2 objects. I intentionally rejected hybrid “anemic” objects for the model and gave `Puzzle` the responsibility to maintain its own invariants.

## Ch.7 – Error Handling

I use exceptions internally (via the L2 boundary classes) rather than return codes where appropriate—“prefer exceptions to returning error codes”. In the UI, I convert failure states to user messages (e.g., “Puzzle cannot be solved.”, “No hints available”). I also isolate try/catch inside `SudokuService`, keeping error‑handling code separate from the main logic flow. That keeps the happy path readable while failures are handled consistently.

## Ch.8 – Boundaries

`SudokuService` is a dedicated wrapper for the third‑party L2 module—this follows the guidance to keep third‑party APIs at arm’s length and to write tests at the boundary. In tests, I mock the boundary to avoid bringing the external module into the runner (Jest). This decoupling gives me freedom to upgrade/replace the L2 module later. It also kept the app code simple and expressive by not leaking vendor types through the UI.

## Ch.9 – Unit Tests

The automated tests here are intentionally minimal “smoke” tests, but I still adhere to the “clean tests” mindset—readability and clear assertions. I favor the “single concept per test” rule and try to minimize the number of asserts. The **F.I.R.S.T.** properties (Fast, Independent, Repeatable, Self‑validating, Timely) influenced the choice to mock the boundary, keeping tests fast and deterministic. Overall, tests protect core rendering and controls and support safe refactoring.

## Ch.10 – Classes

Classes are small and cohesive: `Puzzle` (state + invariants), `GameController` (app logic), `SudokuService` (boundary), UI components (presentation + events). Public APIs are minimal and stable; most helpers are private to their class. Data is encapsulated (private fields in `Puzzle`), and responsibilities are clearly separated to avoid “god classes”. This matches the chapter’s call for small, focused, and well‑encapsulated classes.

## Ch.11 – Systems

I separated “construction” from “use”: the UI constructs a `GameController`, which composes `SudokuService`. The system respects layers (UI → controller → boundary → L2). Local persistence (`#persist`, `#tryRestore`) is isolated behind simple helpers, so changing the persistence mechanism wouldn’t ripple through the UI. The result is a system that is easy to evolve and to deploy (Netlify config isolates build concerns).

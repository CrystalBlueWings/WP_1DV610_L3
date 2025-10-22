# Vision and Requirements Specification

## Vision

### Background and Problem Description

Sudoku is one of the world's most popular logic puzzles. The problem that this app aims to solve is to provide an easy-to-use and visually appealing way for users to play and solve Sudoku puzzles. The app will also help users solve difficult Sudoku puzzles by using the existing Sudoku-solver module (L2) as a library, which can automatically generate solutions or give hints.

### Target Audience

Primarily, the app is aimed at people who enjoy logic puzzles and want to play or improve their Sudoku skills. It is also suitable for beginners who can start with easier puzzles and gradually increase the difficulty level.

### Market and Competitors

There are many Sudoku apps on the market, ranging from simple websites to advanced mobile apps. Competitors include `Sudoku.com` and websites offering online Sudoku solvers. However, many of these lack advanced features like step-by-step hints and the ability to learn the game's logic in a pedagogical way.

### Unique Features

* Automatic solving of Sudoku puzzles.
* Step-by-step hint generation.
* Visually appealing user interface with easy-to-navigate features.
* Ability to adjust the difficulty level of generated puzzles.
* Responsive SPA design, making it accessible on both computers and mobile devices.

### Technologies

* **Frontend**: React to create a responsive Single Page Application (SPA).
* **Backend**: No dedicated backend; the Sudoku-solver package (L2) is integrated directly into the app as an npm module.
* **Deployment**: The app will be deployed on Netlify for easy accessibility.
* **Version Control**: GitHub will be used for code management.
* **Code Standard**: ESLint for code style. Focus on Clean Code principles.

## Requirements Specification

1. Functional Requirements

    * FR1. Start a new puzzle with chosen difficulty (`easy`, `medium`, `hard`).  
    * FR2. Enter digits 1–9 in editable cells; non‑editable cells must be read‑only.  
    * FR3. Request a **hint**; the app fills a valid next move if one exists.  
    * FR4. **Solve** the current puzzle completely.  
    * FR5. **Check** if the current grid is complete and valid; show a clear message.  
    * FR6. **Persist** and **restore** an in‑progress puzzle (browser localStorage).  
    * FR7. **Clear** saved state and immediately start a fresh puzzle (no page reload).

2. Non-Functional Product Requirements

    * NFR1. Performance: UI interactions should feel instantaneous on a typical laptop/phone.  
    * NFR2. Usability: Clear visual distinction between fixed vs editable cells; keyboard navigation with arrows/Tab.  
    * NFR3. Offline‑friendly: Works without a server connection once loaded; state saved locally.  
    * NFR4. Code quality: Small, cohesive classes; encapsulated data; minimal public surface; Clean Code ch. 2–11 applied.  
    * NFR5. Accessibility: Inputs labeled for screen readers; focusable cells; no critical information only conveyed by color.


3. Organizational Requirements

    3.1 Version Control:

    * Use Git with the following branch structure:

        * **L3A** app in its own repo on GitHub. The **L2** module (and **L2T**) live in separate repos.

        * **main/master** - Stable, production-ready version.
        * **feature/** - (Optional) Individual features/functions developed on separate branches and merged after testing.

    3.2 Code Standard:

    * Use ESLint and Clean Code principles. Focus on clear names, small methods, separation of concerns, readability and understandability.

    3.3 Code Documentation:

    * Code will be commented using JSDoc standards. The [`README.md`](README.md) will explain the project's purpose, installation, and usage.

4. External Requirements

    4.1 Ethical Requirements:

    * The app should be free from content that could be harmful or misleading.
    * The user experience should be free from unwanted ads or aggressive marketing.

    4.2 Laws & Standards:

    * The app does not handle personal data, minimizing GDPR requirements.
    * If cookies are used, they will only be used to save game data locally, and users will be informed of this transparently.

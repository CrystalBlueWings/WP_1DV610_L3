# Vision and Requirements Specification

## Vision

### Background and Problem Description

Sudoku is one of the world's most popular logic puzzles. The problem that this app aims to solve is to provide an easy-to-use and visually appealing way for users to play and solve Sudoku puzzles. The app will also help users solve difficult Sudoku puzzles by using the existing Sudoku-solver module, which can automatically generate solutions or give hints.

### Target Audience

Primarily, the app is aimed at people who enjoy logic puzzles and want to play or improve their Sudoku skills. It is also suitable for beginners who need help learning the game through step-by-step tips.

### Market and Competitors

There are many Sudoku apps on the market, ranging from simple websites to advanced mobile apps. Competitors include Sudoku.com and websites offering online Sudoku solvers. However, many of these lack advanced features like step-by-step hints and the ability to learn the game's logic in a pedagogical way.

### Unique Features

* Automatic solving of Sudoku puzzles.
* Step-by-step hint generation.
* Visually appealing user interface with easy-to-navigate features.
* Ability to adjust the difficulty level of generated puzzles.
* Responsive SPA design, making it accessible on both computers and mobile devices.

### Technologies

* **Frontend**: React to create a responsive Single Page Application (SPA).
* **Backend**: No dedicated backend; the Sudoku-solver package is integrated directly into the app as an npm module.
* **Deployment**: The app will be deployed on Netlify for easy accessibility.
* **Version Control**: GitHub will be used for code management.
* **Code Standard**: ESLint for code style. Focus on Clean Code principles.

## Requirements Specification

1. Functional Requirements

    * The user should be able to start a new Sudoku puzzle with varying difficulty levels.
    * The user should be able to fill in, erase, and check solutions directly in the browser.
    * The app should be able to provide step-by-step hints for solving the puzzle.
    * The user should be able to automatically solve a Sudoku puzzle via the Solver module.
    * The app should save and restore ongoing puzzles (locally in the browser).

2. Non-Functional Product Requirements

    * The app should be fast and responsive, providing a seamless user experience.
    * The interface should be easy to navigate and visually appealing.
    * The solution should work without a server connection once the page is loaded.
    * Code should be readable, well-documented, and structured according to Clean Code principles.

3. Organizational Requirements

    3.1 Version Control:

    * Use Git with the following branch structure:

        * **main/master** - Stable, production-ready version.
        * **feature/** - Individual features/functions developed on separate branches and merged after testing.

    3.2 Code Standard:

    * Use ESLint and Clean Code principles. Focus on clear names, small methods, and separation of concerns.

    3.3 Code Documentation:

    * Code will be commented using JSDoc standards. The [`README.md`](README.md) will explain the project's purpose, installation, and usage.

4. External Requirements

    4.1 Ethical Requirements:

    * The app should be free from content that could be harmful or misleading.
    * The user experience should be free from unwanted ads or aggressive marketing.

    4.2 Laws & Standards:

    * The app does not handle personal data, minimizing GDPR requirements.
    * Cookies will only be used to save game data locally, and users will be informed of this transparently.

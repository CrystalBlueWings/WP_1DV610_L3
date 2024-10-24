<!-- # Test Report for SudokuSolver App

## Comments

All tests were run using Jest and passed successfully. The app is stable and ready for further development.

## Screenshots

![testResults1]()
![testResults2]()
![testResults2]() -->

<!-- ----------------------------------------------------------------- -->

# Test Plan and Test Specification

## Test Strategy

The app will be tested both manually and automatically:

- **Manual Testing**: The user interface will be tested by performing specific tasks, e.g., starting a new puzzle, using solver functions, and providing hints.
- **Automated Testing**: Unit tests for the Sudoku solver and functionalities directly tied to the module.
- **Negative Testing**: Error handling will be tested by inputting invalid values or performing illogical actions.

## Test Specification

| **Test Case**         | **Input**                              | **Expected Outcome**                               | **Step-by-Step**                                                                 |
|-----------------------|----------------------------------------|---------------------------------------------------|----------------------------------------------------------------------------------|
| **TC1: Start new puzzle**  | Select "New Puzzle" and difficulty     | A new puzzle is generated and displayed            | 1. Open the app. 2. Click "New Puzzle". 3. Select a difficulty.                  |
| **TC2: Fill in cell**      | Enter a number in an empty cell         | The number is displayed in the cell                | 1. Click on an empty cell. 2. Enter a number between 1-9.                        |
| **TC3: Solve puzzle**      | Click "Solve Puzzle"                    | The puzzle is solved, and the solution is shown    | 1. Fill in a partially completed puzzle. 2. Click "Solve Puzzle".                |
| **TC4: Hint function**     | Click "Get Hint"                        | A hint for the next possible move is shown         | 1. Open a puzzle. 2. Click "Get Hint".                                           |
| **TC5: Invalid input**     | Enter a number that violates the rules  | Error message is displayed                        | 1. Click on a filled cell. 2. Enter a number that breaks the rules.              |

## Test Report

- **Date**: [Insert current date]
- **Version**: 1.0.0
- **Test Environment**: Firefox

### Results (!!! Preliminary results. Update later. !!!)

| **Test Case** | **Status** | **Comment**                                  |
|---------------|------------|----------------------------------------------|
| **TC1**       | OK         | New puzzle generated as expected.            |
| **TC2**       | OK         | Numbers entered without issue.               |
| **TC3**       | OK         | Solver works and provides correct solution.  |
| **TC4**       | OK         | Hint function provides correct hints.        |
| **TC5**       | OK         | Error handling works as per the specification.|

### Analysis (!!! Preliminary analysis. Just a placeholder right now. Update later. !!!)

The system feels stable, and the functionality works as expected. User testing shows that the interface is easy to navigate. Some minor improvements can be made in terms of visual feedback when incorrect input is entered.

# Test Plan and Test Specification

## Test Strategy

The app will be tested both manually and automatically:

- **Manual Testing**: The user interface will be tested by performing specific tasks, e.g., starting a new puzzle, using solver functions, and providing hints.
- **Automated Testing**: Unit tests with Jest framework for the Sudoku solver and functionalities directly tied to the module.
- **Negative Testing**: Error handling will be tested by inputting invalid values or performing illogical actions.

## Test Specification (!!! OBS! Behöver uppdateras! )

| **Test Case**         | **Input**                              | **Expected Outcome**                               | **Step-by-Step**                                                                 |
|-----------------------|----------------------------------------|---------------------------------------------------|----------------------------------------------------------------------------------|
| **TC1: Start new puzzle**  | Select "New Puzzle" and difficulty     | A new puzzle is generated and displayed            | 1. Open the app. 2. Click "New Puzzle". 3. Select a difficulty.                  |
| **TC2: Fill in cell**      | Enter a number in an empty cell         | The number is displayed in the cell                | 1. Click on an empty cell. 2. Enter a number between 1-9.                        |
| **TC3: Solve puzzle**      | Click "Solve Puzzle"                    | The puzzle is solved, and the solution is shown    | 1. Fill in a partially completed puzzle. 2. Click "Solve Puzzle".                |
| **TC4: Hint function**     | Click "Get Hint"                        | A hint for the next possible move is shown         | 1. Open a puzzle. 2. Click "Get Hint".                                           |
| **TC5: Invalid input**     | Enter a number that violates the rules  | Error message is displayed                        | 1. Click on a filled cell. 2. Enter a number that breaks the rules.              |

## Test Report

- **Date**: [2024-10-25]
- **Version**: 1.0.0
- **Test Environment**: Firefox

## Comments

<!-- All tests were run using Jest and passed successfully. The app is stable and ready for further development. -->

The app was tested manually:

- Manual Testing: The user interface was tested by performing specific tasks, such as starting a new puzzle, using solver functions, providing hints, and verifying cell interactions.

- Negative Testing: Error handling was tested by attempting invalid inputs and actions.

## Screenshots

![CheckSolutionMessageForGridWithConflicts](images\CheckSolutionMessageForGridWithConflicts.png)
![CheckSolutionMessageForSolvedGrid](images\CheckSolutionMessageForSolvedGrid.png)

### Results (!!! Preliminary results. Update later. !!!)

| **Test Case** | **Status** | **Comment**                                  |
|---------------|------------|----------------------------------------------|
| **TC1**       | OK         | New puzzles are generated and displayed correctly for all difficulty levels ("Easy", "Medium", "Hard").          |
| **TC2**       | OK         | NUsers can interact with empty cells using mouse and keyboard. Only numbers 1-9 are accepted in empty cells.              |
| **TC3**       | OK         | "Solve Puzzle" button works as expected, solving the puzzle and displaying the solution.  |
| **TC4**       | OK         | "Get Hint" button provides correct hints when cells are empty. Displays appropriate message when no hints are available or puzzle is complete.     |
| **TC5**       | OK         | Input is rejected when entering invalid characters; only numbers 1-9 are accepted. Error handling works as per the specification.|
| **TC6**       | OK         | "Reset Puzzle" resets the puzzle to its initial state as expected, regardless of the current state of the puzzle.|
| **TC7**       | OK         | "Check Solution" displays correct messages when the puzzle is solved correctly and when it is unsolved or contains conflicts.|
| **TC8**       | OK         | Keyboard navigation between cells works as expected using arrow keys. Users can move focus across the grid seamlessly.|
| **TC9**       | OK         | Uneditable cells cannot be modified by the user. Attempting to change their values has no effect, maintaining the integrity of the initial puzzle.|
| **TC10**       | OK         | Editable and uneditable cells are visually distinct, with uneditable cells displayed in grey and non-interactive, and editable cells displayed in blue and interactive.|

### Analysis

#### Functional Testing

    Puzzle Generation: The application successfully generates new puzzles for each difficulty level. Each new puzzle presents a different configuration, ensuring variety and replayability.
    User Interaction: Users can interact with the puzzle grid using both the mouse and keyboard. The input is restricted to valid numbers (1-9), enhancing user experience and preventing errors.
    Solver Functions: The "Solve Puzzle" feature works correctly, providing solutions to the puzzles. The "Get Hint" feature offers useful hints, aiding users who may be stuck.
    Error Handling: The app effectively handles invalid inputs, preventing users from entering letters, symbols, or numbers outside the range of 1-9. Appropriate messages are displayed when actions cannot be performed.
    Reset and Check Solution: The "Reset Puzzle" function restores the puzzle to its original state. The "Check Solution" feature accurately assesses whether the puzzle is solved correctly.

#### User Experience

    Visual Feedback: The application provides clear visual cues. Editable cells are blue and interactive, while uneditable cells are grey and non-interactive. This distinction helps users understand which cells they can modify.
    Keyboard Navigation: Users can navigate the grid using arrow keys, enhancing accessibility and ease of use.
    Responsive Design: The interface responds smoothly to user actions, with immediate feedback on inputs and commands.

#### Stability and Performance

    The application is stable with no crashes or unexpected behavior observed during testing.
    Performance is smooth, with quick responses to user inputs and function executions.

#### Areas for Improvement

    Visual Enhancements: Adding animations or transitions when cells are updated could enhance the user experience.
    Additional Features: Implementing features like time tracking, score keeping, or different game modes could increase engagement.
    Accessibility: Ensuring the app is fully accessible to users with disabilities, such as adding screen reader support and keyboard shortcuts.

### Conclusion

The SudokuSolver application passes all the specified test cases, indicating that it functions correctly and provides a good user experience. The app is stable, user-friendly, and meets the requirements for a Sudoku puzzle game. Users can:

    Generate new puzzles with varying difficulty levels.
    Interact with the puzzle grid effectively.
    Receive hints and solve puzzles.
    Reset puzzles and check solutions.

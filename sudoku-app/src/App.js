import React, { Component } from 'react'
import PuzzleBoard from './components/PuzzleBoard.js' // Import the main grid component.
import HintButton from './components/HintButton.js' // Import the hint button component.
import SolverButton from './components/SolverButton.js' // Import the solver button component.
import GameController from './controllers/GameController.js' // Import the game controller to manage state.
import './styles/App.css' // Import general app styles.

/**
 * App class - Main entry point for the Sudoku application.
 * Handles the top-level state and interaction logic.
 */
class App extends Component {
  /**
   * Initializes the App component.
   *
   * @param {object} props - The properties passed to the component.
   */
  constructor (props) {
    super(props)

    // Bind methods to the instance.
    this.handleCellChange = this.handleCellChange.bind(this)
    this.handleHint = this.handleHint.bind(this)
    this.handleSolve = this.handleSolve.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.handleNewGame = this.handleNewGame.bind(this)
    this.handleCheckSolution = this.handleCheckSolution.bind(this)

    // Initialize the game controller to manage game logic.
    this.gameController = new GameController()

    // Generate a medium difficulty puzzle as default.
    this.gameController.generateNewPuzzle('medium') // Generate a default puzzle.

    // Initialize the state to hold the current grid.
    this.state = {
      grid: this.gameController.getGrid(), // Get the initial grid from the GameController.
      originalGrid: this.gameController.getOriginalGrid(),
      isCompleted: false // Track if the puzzle is complete.
    }
  }

  /**
   * Handles changes in the cell's value.
   * Delegates the update to the GameController and updates the state.
   *
   * @param {number} row - Row index of the cell.
   * @param {number} col - Column index of the cell.
   * @param {number|null} value - The new value for the cell (1-9 or null).
   */
  handleCellChange (row, col, value) {
    this.#updateCellValue(row, col, value)
  }

  /**
   * Handles generating a hint and updating the grid.
   * If a hint is available, update the specific cell with the hint's value.
   *
   * @param {number} row - Row index of the cell to be updated.
   * @param {number} col - Column index of the cell to be updated.
   * @param {number} value - The hint value to set.
   */
  handleHint (row, col, value) {
    const hint = this.gameController.getHint()
    if (hint) {
      this.#applyHint(hint.row, hint.col, hint.value)
    } else {
      alert('No hints available or puzzle is complete.')
    }
  }

  /**
   * Handles solving the entire puzzle and updating the grid.
   * If the puzzle is solvable, update the grid with the solution.
   */
  handleSolve () {
    this.#solveCurrentPuzzle()
  }

  /**
   * Handles checking the puzzle solution.
   */
  handleCheckSolution () {
    this.#handleCheckSolution()
  }

  /**
   * Resets the puzzle to its original state.
   */
  handleReset () {
    this.#resetPuzzleState()
  }

  /**
   * Starts a new game with a fresh puzzle.
   *
   * @param {string} difficulty - The difficulty level for the new puzzle ('easy', 'medium', 'hard').
   */
  handleNewGame (difficulty = 'medium') {
    this.#generateNewGame(difficulty)
  }

  /* Private methods */

  /**
   * Updates a cell's value.
   *
   * @param {number} row - Row index of the cell.
   * @param {number} col - Column index of the cell.
   * @param {number|null} value - The new value for the cell (1-9 or null).
   * @private
   */
  #updateCellValue (row, col, value) {
    this.gameController.updateCellValue(row, col, value) // Update the cell in the GameController.
    this.setState({ grid: this.gameController.getGrid() }) // Update the grid state.
  }

  /**
   * Applies a hint to the grid.
   *
   * @param {number} row - Row index of the cell to be updated.
   * @param {number} col - Column index of the cell to be updated.
   * @param {number} value - The hint value to set.
   * @private
   */
  #applyHint (row, col, value) {
    this.gameController.updateCellValue(row, col, value) // Update the cell with the hint.
    this.setState({ grid: this.gameController.getGrid() }) // Update the grid state.
  }

  /**
   * Private method to solve the current puzzle.
   * Updates the state with the solved grid if successful.
   *
   * @private
   */
  #solveCurrentPuzzle () {
    const solvedGrid = this.gameController.solvePuzzle() // Solve the puzzle using the GameController.

    // If the puzzle was solved, update the state.
    if (solvedGrid) {
      this.setState({ grid: solvedGrid, isCompleted: true })
    } else {
      alert('Puzzle cannot be solved.') // Alert if the puzzle cannot be solved.
    }
  }

  /**
   * Private method to handle checking the puzzle solution.
   *
   * @private
   */
  #handleCheckSolution () {
    const isComplete = this.gameController.isPuzzleComplete()
    const isValid = this.gameController.validatePuzzle()

    if (isComplete && isValid) {
      alert('Congratulations! Puzzle solved.')
    } else {
      alert('The puzzle is not solved correctly or is incomplete.')
    }
  }

  /**
   * Private method to reset the puzzle to its initial state.
   *
   * @private
   */
  #resetPuzzleState () {
    this.gameController.resetPuzzle() // Reset the puzzle in the GameController.

    this.setState({
      grid: this.gameController.getGrid(),
      originalGrid: this.gameController.getOriginalGrid(),
      isCompleted: false
    })
  }

  /**
   * Private method to generate a new game with a specified difficulty.
   *
   * @param {string} difficulty - The difficulty level for the new puzzle ('easy', 'medium', 'hard').
   * @private
   */
  #generateNewGame (difficulty) {
    this.gameController.generateNewPuzzle(difficulty) // Generate a new puzzle.

    this.setState({
      grid: this.gameController.getGrid(),
      originalGrid: this.gameController.getOriginalGrid(),
      isCompleted: false
    })
  }

  /**
   * Private method to handle rendering the app.
   *
   * @returns {React.Element} The JSX representation of the app.
   * @private
   */
  #renderApp () {
    const { grid, originalGrid, isCompleted } = this.state

    return (
      <div className="app-container">
        <h1>Sudoku Game</h1>
        {/* Render the main Sudoku grid */}
        <PuzzleBoard
          grid={grid}
          originalGrid={originalGrid}
          isCompleted={isCompleted}
          onCellChange={this.handleCellChange}
        />
        <div className="controls">
          {/* Render the control buttons */}
          <HintButton onHint={this.handleHint} />
          <SolverButton onSolve={this.handleSolve} />
          <button onClick={this.handleCheckSolution}>Check Solution</button>
          <button onClick={this.handleReset}>Reset Puzzle</button>
          <button onClick={() => this.handleNewGame('easy')}>New Easy Game</button>
          <button onClick={() => this.handleNewGame('medium')}>New Medium Game</button>
          <button onClick={() => this.handleNewGame('hard')}>New Hard Game</button>
        </div>
      </div>
    )
  }

  /* Required methods */

  /**
   * Renders the main application.
   *
   * @returns {React.Element} The JSX representation of the app.
   */
  render () {
    return this.#renderApp()
  }
}

export default App

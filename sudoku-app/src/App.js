import React, { Component } from 'react'
import PuzzleBoard from './components/PuzzleBoard.js' // Import the main grid component.
import HintButton from './components/HintButton.js' // Import the hint button component.
import SolverButton from './components/SolverButton.js' // Import the solver button component.
import GameController from './controllers/GameController.js' // Import the game controller to manage state.
import './styles/App.css' // Import general app styles.

// Key for local storage.
const STORAGE_KEY = 'sudoku-app-state-v1'

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
    this.handleClearSaved = this.handleClearSaved.bind(this)

    // Initialize the game controller to manage game logic.
    this.gameController = new GameController()

    // Try to restore saved game state from local storage. Otherwise, generate a new puzzle.
    const restored = this.#tryRestore()
    if (!restored) {
      this.gameController.generateNewPuzzle('medium')
    }

    // Initialize the state to hold the current grid.
    this.state = {
      grid: this.gameController.getGrid(), // Get the initial grid from the GameController.
      originalGrid: this.gameController.getOriginalGrid(),
      isCompleted: false, // Track if the puzzle is complete.
      difficulty: this.gameController.difficulty // Store the current difficulty level.
    }
  }

  /**
   * Lifecycle method called after the component updates.
   * Used to persist the game state to local storage.
   */
  componentDidUpdate () { this.#persist() } // Persist state after each update.

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

  /**
   * Handles the stored game state and clears it from local storage.
   */
  handleClearSaved () {
    const confirmed = window.confirm('Clear saved game and start a new puzzle?')
    if (!confirmed) return

    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch { /* no-op */ }

    // Re-start with a new puzzle (medium as baseline)
    const difficulty = 'medium'
    this.gameController.generateNewPuzzle(difficulty)
    this.setState({
      grid: this.gameController.getGrid(),
      originalGrid: this.gameController.getOriginalGrid(),
      isCompleted: false,
      difficulty
    })
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
    this.setState({ grid: this.gameController.getGrid(), isCompleted: false }) // Update the grid state and reset completion status.
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
    const isValid = this.gameController.validatePuzzle() // via L2

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
      isCompleted: false,
      difficulty
    })
  }

  // ---- Persistence ----

  /**
   * Private method to persist the current game state to local storage.
   *
   * @private
   */
  #persist () {
    const { grid, originalGrid, isCompleted, difficulty } = this.state // Get current state.

    // Persist the game state to local storage. Try-catch to handle potential storage errors.
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        grid, originalGrid, isCompleted, difficulty
      }))
    } catch (e) {
      // No-op: localStorage can be blocked in some browsers/settings. No-op means we silently fail.
    }
  }

  /**
   * Private method to attempt restoring the game state from local storage.
   *
   * @returns {boolean} True if restoration was successful, false otherwise.
   * @private
   */
  #tryRestore () {
    // Try to load the game state from local storage.
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return false
      const data = JSON.parse(raw)
      if (!this.#isValidGrid(data?.grid) || !this.#isValidGrid(data?.originalGrid)) return false
      // Load into controller + keep difficulty
      this.gameController.difficulty = data.difficulty || 'medium'
      this.gameController.puzzle.setGrid(data.grid)
      this.gameController.puzzle.setOriginalGrid(data.originalGrid)
      return true // Successfully restored.
    } catch { return false } // On any error, return false.
  }

  /**
   * Private method to validate the grid structure.
   *
   * @param {any} grid - The grid to validate.
   * @returns {boolean} True if the grid is a valid 9x9 array, false otherwise.
   * @private
   */
  #isValidGrid (grid) {
    if (!Array.isArray(grid) || grid.length !== 9) return false // Must be an array of 9 rows.
    return grid.every(r => Array.isArray(r) && r.length === 9) // Each row must be an array of 9 columns.
  }

  /**
   * Private method to handle rendering the app.
   *
   * @returns {React.Element} The JSX representation of the app.
   * @private
   */
  #renderApp () {
    const { grid, originalGrid, isCompleted, difficulty } = this.state

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
          <button onClick={this.handleClearSaved}>Clear saved game</button>
        </div>
        <p>Current difficulty: <strong>{difficulty}</strong></p>
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

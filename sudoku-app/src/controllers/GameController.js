import Puzzle from '../models/Puzzle.js'
import SudokuService from '../services/SudokuService.js' // To generate, solve, and provide hints

/**
 * GameController class - Manages the overall game state and user interactions.
 */
class GameController {
  /**
   * Constructor for the GameController class.
   * Initializes the game state, including the puzzle model and validator.
   */
  constructor () {
    // Initialize game state variables.
    this.puzzle = new Puzzle() // Instance of the Puzzle model to manage the grid.
    this.sudokuService = new SudokuService()
    this.difficulty = 'medium' // Store the current difficulty level for later use.
  }

  /**
   * Generates a new Sudoku puzzle with the specified difficulty.
   *
   * @param {string} difficulty - The difficulty level ('easy', 'medium', 'hard').
   */
  generateNewPuzzle (difficulty = 'medium') { // Default to 'medium' if no difficulty is provided.
    this.difficulty = difficulty // Store the selected difficulty level.
    const generatedGrid = this.sudokuService.generatePuzzle(difficulty)
    this.puzzle.setGrid(generatedGrid)
    this.puzzle.setOriginalGrid(generatedGrid)
  }

  /**
   * Handles changes to a specific cell in the Sudoku grid.
   * Updates a specific cell in the grid.
   *
   * @param {number} row - Row index of the cell.
   * @param {number} col - Column index of the cell.
   * @param {number|null} value - The new value for the cell (1-9 or null).
   */
  updateCellValue (row, col, value) {
    this.puzzle.updateCell(row, col, value)
  }

  /**
   * Validates if the current puzzle is correctly solved (uses L2 module validation).
   *
   * @returns {boolean} - True if the puzzle is correctly solved, false otherwise.
   */
  validatePuzzle () {
    return this.sudokuService.validateGrid(this.puzzle.getGrid())
  }

  /**
   * Solves the current Sudoku puzzle.
   *
   * @returns {number[][]|null} - The solved grid or null if unsolvable.
   */
  solvePuzzle () {
    const solvedGrid = this.sudokuService.solvePuzzle(this.puzzle.getGrid())
    if (solvedGrid) {
      this.puzzle.setGrid(solvedGrid)
    }
    return solvedGrid
  }

  /**
   * Checks if the current puzzle is complete.
   * A puzzle is considered complete if all cells in the grid are filled (non-null).
   *
   * @returns {boolean} - True if the puzzle is complete, false otherwise.
   */
  isPuzzleComplete () {
    const grid = this.puzzle.getGrid()
    return grid.every(row => row.every(cell => cell !== null)) // Check if all cells are non-null. Returns true if complete.
  }

  /**
   * Retrieves a hint for the next move (via L2).
   *
   * @returns {object|null} - An object with row, col, and value keys for the hint, or null if no hint is available.
   */
  getHint () {
    return this.sudokuService.getHint(this.puzzle.getGrid())
  }

  /**
   * Retrieves the current grid state.
   *
   * @returns {number[][]} - The current state of the grid.
   */
  getGrid () {
    return this.puzzle.getGrid() // Delegate to the Puzzle model to get the current grid.
  }

  /**
   * Retrieves the original grid state.
   *
   * @returns {number[][]} - The original grid as it was initially generated.
   */
  getOriginalGrid () {
    return this.puzzle.getOriginalGrid() // Delegate to the Puzzle model to get the original grid.
  }

  /**
   * Resets the puzzle to its original generated state.
   */
  resetPuzzle () {
    this.puzzle.resetGrid()
  }
}

export default GameController

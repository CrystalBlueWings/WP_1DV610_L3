/* Handles game state, manages interactions between the UI and the Puzzle model, and uses Validator for validation.
This class will act as the central manager for the game's state and user interactions. */

import Puzzle from '../models/Puzzle.js'
import Validator from '../utils/Validator.js'
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
    this.validator = new Validator() // Validator instance to validate puzzle states.
    this.sudokuService = new SudokuService()
  }

  /**
   * Generates a new Sudoku puzzle with the specified difficulty.
   *
   * @param {string} difficulty - The difficulty level ('easy', 'medium', 'hard').
   */
  generateNewPuzzle (difficulty) {
    this.#generateNewPuzzleInternal(difficulty)
  }

  /**
   * Handles changes to a specific cell in the Sudoku grid.
   *
   * @param {number} row - Row index of the cell.
   * @param {number} col - Column index of the cell.
   * @param {number|null} value - The new value for the cell (1-9 or null).
   */
  updateCellValue (row, col, value) {
    this.#updateCellValueInternal(row, col, value)
  }

  /**
   * Validates if the current puzzle is correctly solved.
   *
   * @returns {boolean} - True if the puzzle is correctly solved, false otherwise.
   */
  validatePuzzle () {
    return this.#validatePuzzleInternal()
  }

  /**
   * Solves the current Sudoku puzzle.
   *
   * @returns {number[][]|null} - The solved grid or null if unsolvable.
   */
  solvePuzzle () {
    return this.#solvePuzzleInternal()
  }

  /**
   * Retrieves a hint for the next move.
   *
   * @returns {object|null} - An object with row, col, and value keys for the hint, or null if no hint is available.
   */
  getHint () {
    return this.#getHintInternal()
  }

  /**
   * Retrieves the current grid state.
   *
   * @returns {number[][]} - The current state of the grid.
   */
  getGrid () {
    return this.#getGridInternal()
  }

  /**
   * Resets the puzzle to its original generated state.
   */
  resetPuzzle () {
    this.#resetPuzzleInternal()
  }

  /* Private methods */

  /**
   * Private method to generate a new puzzle grid based on the specified difficulty.
   * Updates the Puzzle model with the generated grid.
   *
   * @param {string} difficulty - The difficulty level ('easy', 'medium', 'hard').
   * @private
   */
  #generateNewPuzzleInternal (difficulty) {
    const generatedGrid = this.sudokuService.generatePuzzle(difficulty) // Generate grid using the service.
    this.puzzle.setGrid(generatedGrid) // Update the puzzle model with the generated grid.
  }

  /**
   * Private method to update the value of a specific cell in the grid.
   * Delegates the update to the Puzzle model.
   *
   * @param {number} row - Row index of the cell.
   * @param {number} col - Column index of the cell.
   * @param {number|null} value - The new value for the cell (1-9 or null).
   * @private
   */
  #updateCellValueInternal (row, col, value) {
    this.puzzle.updateCell(row, col, value) // Delegate to the Puzzle model to update the grid.
  }

  /**
   * Private method to validate the current puzzle using the Validator class.
   *
   * @returns {boolean} - True if the puzzle is correctly solved, false otherwise.
   * @private
   */
  #validatePuzzleInternal () {
    return this.validator.isValid(this.puzzle.getGrid()) // Validate using the Validator class.
  }

  /**
   * Private method to solve the current Sudoku puzzle.
   * If a solution is found, updates the Puzzle model.
   *
   * @returns {number[][]|null} - The solved grid or null if unsolvable.
   * @private
   */
  #solvePuzzleInternal () {
    const solvedGrid = this.sudokuService.solvePuzzle(this.puzzle.getGrid()) // Solve the grid using the service.
    if (solvedGrid) {
      this.puzzle.setGrid(solvedGrid) // Update the puzzle with the solved grid.
    }
    return solvedGrid
  }

  /**
   * Private method to retrieve a hint for the next move using SudokuService.
   *
   * @returns {object|null} - An object with row, col, and value keys for the hint, or null if no hint is available.
   * @private
   */
  #getHintInternal () {
    return this.sudokuService.getHint(this.puzzle.getGrid()) // Fetch a hint using the service.
  }

  /**
   * Private method to get the current grid from the Puzzle model.
   *
   * @returns {number[][]} - The current state of the grid.
   * @private
   */
  #getGridInternal () {
    return this.puzzle.getGrid() // Delegate to the Puzzle model to get the current grid.
  }

  /**
   * Private method to reset the puzzle to its original state.
   * Resets the grid to its initially generated configuration.
   *
   * @private
   */
  #resetPuzzleInternal () {
    this.puzzle.resetGrid() // Reset the grid to its original state.
  }
}

export default GameController

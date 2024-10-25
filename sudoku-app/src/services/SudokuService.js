import SudokuGenerator from 'sudoku-puzzle-solver/src/sudokuGenerator' // Import the generator from the npm module
import SudokuSolver from 'sudoku-puzzle-solver/src/sudokuSolver' // Import the solver from the npm module
import HintGenerator from 'sudoku-puzzle-solver/src/hintGenerator' // Import the hint generator from the npm module
import SudokuValidator from 'sudoku-puzzle-solver/src/sudokuValidator' // Import the validator from the npm module

/**
 * Service class that handles all interactions with the sudoku-puzzle-solver package.
 * This class provides methods to generate, solve, validate, and get hints for Sudoku puzzles.
 */
class SudokuService {
  /**
   * Constructor for the SudokuService class.
   * Initializes the SudokuGenerator instance for puzzle generation.
   */
  constructor () {
    // Initialize instances of the imported classes for internal use.
    this.sudokuGenerator = new SudokuGenerator()
  }

  /**
   * Generates a new Sudoku puzzle grid based on the specified difficulty.
   *
   * @param {string} difficulty - Difficulty level ('easy', 'medium', 'hard').
   * @returns {number[][]} - A 9x9 matrix representing the new Sudoku grid.
   */
  generatePuzzle (difficulty = 'medium') {
    return this.#generateNewPuzzleGrid(difficulty)
  }

  /**
   * Solves a given Sudoku grid.
   *
   * @param {number[][]} grid - A 9x9 matrix representing the current Sudoku puzzle.
   * @returns {number[][]|null} - A 9x9 matrix with the solved puzzle or null if unsolvable.
   */
  solvePuzzle (grid) {
    return this.#solvePuzzleGrid(grid)
  }

  /**
   * Validates if a given Sudoku grid is complete and correct.
   *
   * @param {number[][]} grid - A 9x9 matrix representing the Sudoku puzzle.
   * @returns {boolean} - True if the grid is valid and complete, false otherwise.
   */
  validateGrid (grid) {
    return this.#validateSudokuGrid(grid)
  }

  /**
   * Public method to validate the structure of a Sudoku grid.
   * Exposes the private method for external access.
   *
   * @param {Array} grid - The grid to validate, expected to be a 9x9 matrix.
   * @returns {boolean} - Returns true if the grid has the correct structure, false otherwise.
   */
  isValidGridStructure (grid) {
    return this.#isValidGridStructure(grid)
  }

  /**
   * Provides a hint for a given Sudoku grid.
   * The hint suggests a number that can be placed in a specific cell.
   *
   * @param {number[][]} grid - A 9x9 matrix representing the current Sudoku puzzle.
   * @returns {object|null} - An object with row, col, and value keys, or null if no hint is available.
   */
  getHint (grid) {
    // Validate the grid structure before calling any npm package functions.
    if (!this.#isValidGridStructure(grid)) {
      console.error('Invalid grid structure:', grid)
      return null
    }
    // Proceed with hint generation using the package's functionality.
    return this.#getHintFromGrid(grid)
  }

  /* Private methods */

  /**
   * Private method to generate a new puzzle grid.
   *
   * @param {string} difficulty - Difficulty level ('easy', 'medium', 'hard').
   * @returns {number[][]} - A 9x9 matrix representing the generated Sudoku grid.
   * @private
   */
  #generateNewPuzzleGrid (difficulty) {
    try {
      // Generate an incomplete Sudoku grid based on difficulty level.
      const puzzleGrid = this.sudokuGenerator.generateUnfinishedSudokuGrid(difficulty)
      return puzzleGrid
    } catch (error) {
      console.error('Error generating Sudoku puzzle:', error)
      // return Array(9).fill(Array(9).fill(null)) // Return an empty 9x9 grid in case of error.
      return Array.from({ length: 9 }, () => Array(9).fill(null)) // Return an empty 9x9 grid in case of error.
    }
  }

  /**
   * Private method to solve the puzzle.
   *
   * @param {number[][]} grid - A 9x9 matrix representing the current Sudoku puzzle.
   * @returns {number[][]|null} - A 9x9 matrix with the solved puzzle or null if unsolvable.
   * @private
   */
  #solvePuzzleGrid (grid) {
    try {
      // Initialize a new SudokuSolver instance with the provided grid.
      const solver = new SudokuSolver(grid)

      // Solve the puzzle using a backtracking algorithm.
      const isSolved = solver.solveGrid()

      // Return the solved grid if successful, otherwise null.
      return isSolved ? solver.grid.sudokuGrid : null
    } catch (error) {
      console.error('Error solving Sudoku puzzle:', error)
      return null
    }
  }

  /**
   * Private method to validate the Sudoku grid.
   *
   * @param {number[][]} grid - A 9x9 matrix representing the Sudoku puzzle.
   * @returns {boolean} - True if the grid is valid and complete, false otherwise.
   * @private
   */
  #validateSudokuGrid (grid) {
    try {
      // Initialize a new SudokuValidator instance with the provided grid.
      const validator = new SudokuValidator(grid)

      // Check if the grid has a valid solution.
      return validator.isValidGrid()
    } catch (error) {
      console.error('Error validating Sudoku grid:', error)
      return false
    }
  }

  /**
   * Private method to get a hint.
   *
   * @param {number[][]} grid - A 9x9 matrix representing the current Sudoku puzzle.
   * @returns {object|null} - An object with row, col, and value keys for the hint, or null if no hint is available.
   * @private
   */
  #getHintFromGrid (grid) {
    try {
      // Initialize a new HintGenerator instance with the current grid.
      const hintGenerator = new HintGenerator(grid)

      // Use the HintGenerator to get a hint for the next step.
      const hintCell = hintGenerator.getCellsWithFewestCandidates(1)[0]

      // // Check if the grid has a valid structure.
      // if (!this.#isValidGridStructure(grid)) {
      //   console.error('Invalid grid structure:', grid)
      //   return null
      // }

      // If a hint is available, return the suggested row, column, and value.
      if (hintCell && hintCell.candidates.length > 0) {
        return {
          row: hintCell.row,
          col: hintCell.col,
          value: hintCell.candidates[0] // Return the first valid candidate.
        }
      }
      return null // No hint available.
    } catch (error) {
      console.error('Error generating hint for Sudoku puzzle:', error)
      return null
    }
  }

  /**
   * Private method to validate the structure of a Sudoku grid.
   * Ensures that the grid is a 9x9 matrix with each row being an array of length 9.
   *
   * @param {Array} grid - The grid to validate, expected to be a 9x9 matrix.
   * @returns {boolean} - Returns true if the grid has the correct structure, false otherwise.
   * @private
   */
  #isValidGridStructure (grid) {
    // Check if grid is a 9x9 matrix.
    if (!Array.isArray(grid) || grid.length !== 9) return false
    return grid.every(row => Array.isArray(row) && row.length === 9)
  }
}

export default SudokuService

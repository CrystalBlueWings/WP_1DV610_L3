/* Represents the core model for a Sudoku puzzle, encapsulating the puzzle grid and related operations.
This class encapsulates the puzzle's state, including the grid data and its operations. */

/**
 * Puzzle class - Represents the core model for a Sudoku puzzle.
 */
class Puzzle {
  /**
   * Constructor for the Puzzle class.
   * Initializes the current grid state and the original grid for reset purposes.
   */
  constructor () {
    this.grid = [] // The current grid state.
    this.originalGrid = [] // The initial generated grid for resetting purposes.
  }

  /**
   * Set the grid with a new puzzle.
   * Creates a deep copy of the provided grid to avoid reference issues.
   *
   * @param {number[][]} newGrid - A 9x9 matrix representing the Sudoku puzzle.
   */
  setGrid (newGrid) {
    this.#setGridInternal(newGrid)
  }

  /**
   * Set the original grid.
   * Used to store the initial state of the grid for resetting purposes.
   *
   * @param {number[][]} newGrid - A 9x9 matrix representing the original Sudoku puzzle.
   */
  setOriginalGrid (newGrid) {
    this.#setOriginalGrid(newGrid)
  }

  /**
   * Retrieve the current grid.
   * Returns a deep copy of the grid to maintain immutability.
   *
   * @returns {number[][]} - The current grid state.
   */
  getGrid () {
    return this.#getGridInternal()
  }

  /**
   * Retrieves the original grid.
   * Returns a deep copy of the original grid to maintain immutability.
   *
   * @returns {number[][]} - A deep copy of the original grid state.
   */
  getOriginalGrid () {
    return this.#getOriginalGrid()
  }

  /**
   * Update a specific cell's value in the grid.
   *
   * @param {number} row - Row index of the cell.
   * @param {number} col - Column index of the cell.
   * @param {number|null} value - The new value for the cell (1-9 or null).
   */
  updateCell (row, col, value) {
    this.#updateCellInternal(row, col, value)
  }

  /**
   * Reset the grid to its original generated state.
   */
  resetGrid () {
    this.#resetGridInternal()
  }

  /* Private Methods */

  /**
   * Private method to set the grid with a new puzzle.
   * Creates a deep copy of the provided grid to avoid reference issues.
   *
   * @param {number[][]} newGrid - A 9x9 matrix representing the Sudoku puzzle.
   * @private
   */
  #setGridInternal (newGrid) {
    this.grid = this.#deepCopyGrid(newGrid) // Create a deep copy to avoid reference issues.
  }

  /**
   * Private method to set the original grid state with a new puzzle.
   * Creates a deep copy of the provided grid to avoid reference issues and store the initial puzzle configuration.
   *
   * @param {number[][]} newGrid - A 9x9 matrix representing the original Sudoku puzzle.
   * @private
   */
  #setOriginalGrid (newGrid) {
    this.originalGrid = this.#deepCopyGrid(newGrid) // Store the original for reset purposes.
  }

  /**
   * Private method to retrieve the current grid.
   * Returns a deep copy of the grid to maintain immutability.
   *
   * @returns {number[][]} - A deep copy of the current grid state.
   * @private
   */
  #getGridInternal () {
    return this.#deepCopyGrid(this.grid) // Return a deep copy to maintain encapsulation.
  }

  /**
   * Private method to retrieve the original grid state.
   * Returns a deep copy of the original grid to maintain encapsulation and avoid direct mutation.
   *
   * @returns {number[][]} - A deep copy of the original grid state.
   * @private
   */
  #getOriginalGrid () {
    return this.#deepCopyGrid(this.originalGrid)
  }

  /**
   * Private method to update a specific cell's value in the grid.
   * Only updates if the provided row and column indices are valid.
   *
   * @param {number} row - Row index of the cell.
   * @param {number} col - Column index of the cell.
   * @param {number|null} value - The new value for the cell (1-9 or null).
   * @private
   */
  #updateCellInternal (row, col, value) {
    if (this.#isValidIndex(row, col)) {
      this.grid[row][col] = value // Update the value if indexes are valid.
    }
  }

  /**
   * Private method to reset the grid to its original generated state.
   * Creates a deep copy of the original grid to reset the current state.
   *
   * @private
   */
  #resetGridInternal () {
    this.grid = this.#deepCopyGrid(this.originalGrid) // Reset to the original state.
  }

  /**
   * Validates if the row and column indices are within bounds (0-8).
   *
   * @param {number} row - Row index.
   * @param {number} col - Column index.
   * @returns {boolean} - True if both indices are within valid bounds.
   * @private
   */
  #isValidIndex (row, col) {
    return row >= 0 && row < 9 && col >= 0 && col < 9 // Ensure indices are within the 9x9 grid.
  }

  /**
   * Creates a deep copy of a 9x9 grid to maintain immutability.
   *
   * @param {number[][]} grid - The grid to copy.
   * @returns {number[][]} - A deep copy of the grid.
   * @private
   */
  #deepCopyGrid (grid) {
    return JSON.parse(JSON.stringify(grid)) // Use JSON methods to create a deep copy.
  }
}

export default Puzzle

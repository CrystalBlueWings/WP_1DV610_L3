/**
 * Validator class - Handles validation logic for a Sudoku puzzle.
 * This class includes methods to validate rows, columns, and 3x3 subgrids in a Sudoku grid.
 */
class Validator {
  /**
   * Validates if the provided grid follows Sudoku rules.
   * The grid must have unique numbers (1-9) in every row, column, and 3x3 subgrid.
   *
   * @param {number[][]} grid - A 9x9 matrix representing the Sudoku puzzle.
   * @returns {boolean} - True if the grid is valid according to Sudoku rules, false otherwise.
   */
  isValid (grid) {
    return this.#isValidInternal(grid)
  }

  /* Private Methods */

  /**
   * Private method to validate the grid using internal methods.
   * Checks rows, columns, and 3x3 subgrids for validity.
   *
   * @param {number[][]} grid - A 9x9 matrix representing the Sudoku puzzle.
   * @returns {boolean} - True if all parts of the grid are valid, false otherwise.
   * @private
   */
  #isValidInternal (grid) {
    return (
      this.#areRowsValid(grid) &&
      this.#areColumnsValid(grid) &&
      this.#areBoxesValid(grid)
    )
  }

  /**
   * Checks if all rows in the grid are valid.
   * Each row must contain unique numbers (1-9).
   *
   * @param {number[][]} grid - A 9x9 matrix representing the Sudoku puzzle.
   * @returns {boolean} - True if all rows are valid, false otherwise.
   * @private
   */
  #areRowsValid (grid) {
    for (const row of grid) {
      if (!this.#isUnitValid(row)) {
        return false
      }
    }
    return true
  }

  /**
   * Checks if all columns in the grid are valid.
   * Each column must contain unique numbers (1-9).
   *
   * @param {number[][]} grid - A 9x9 matrix representing the Sudoku puzzle.
   * @returns {boolean} - True if all columns are valid, false otherwise.
   * @private
   */
  #areColumnsValid (grid) {
    for (let col = 0; col < 9; col++) {
      const column = grid.map(row => row[col]) // Create a column array.
      if (!this.#isUnitValid(column)) {
        return false
      }
    }
    return true
  }

  /**
   * Checks if all 3x3 subgrids (boxes) in the grid are valid.
   * Each 3x3 box must contain unique numbers (1-9).
   *
   * @param {number[][]} grid - A 9x9 matrix representing the Sudoku puzzle.
   * @returns {boolean} - True if all 3x3 boxes are valid, false otherwise.
   * @private
   */
  #areBoxesValid (grid) {
    for (let boxRow = 0; boxRow < 3; boxRow++) {
      for (let boxCol = 0; boxCol < 3; boxCol++) {
        const box = this.#getBox(grid, boxRow, boxCol)
        if (!this.#isUnitValid(box)) {
          return false
        }
      }
    }
    return true
  }

  /**
   * Extracts a 3x3 box from the grid based on the box row and column indices.
   * The box is represented as a flat array.
   *
   * @param {number[][]} grid - A 9x9 matrix representing the Sudoku puzzle.
   * @param {number} boxRow - The 3x3 box's row index (0-2).
   * @param {number} boxCol - The 3x3 box's column index (0-2).
   * @returns {number[]} - A flat array of numbers in the 3x3 box.
   * @private
   */
  #getBox (grid, boxRow, boxCol) {
    const box = []
    const startRow = boxRow * 3
    const startCol = boxCol * 3

    // Iterate over the 3x3 box to extract numbers.
    for (let row = startRow; row < startRow + 3; row++) {
      for (let col = startCol; col < startCol + 3; col++) {
        box.push(grid[row][col])
      }
    }
    return box
  }

  /**
   * Checks if a unit (row, column, or 3x3 box) contains no duplicates.
   * A valid unit should only have unique numbers (1-9) with no repeats.
   *
   * @param {number[]} unit - An array of numbers representing a row, column, or 3x3 box.
   * @returns {boolean} - True if the unit contains no duplicates, false otherwise.
   * @private
   */
  #isUnitValid (unit) {
    const seen = new Set() // Set to track unique numbers.
    for (const num of unit) {
      if (num !== null && num !== undefined) {
        if (seen.has(num)) {
          return false // Duplicate found.
        }
        seen.add(num)
      }
    }
    return true
  }
}

export default Validator

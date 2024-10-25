import React, { Component } from 'react'
import Cell from './Cell.js' // Import the Cell component to render each cell in the Sudoku grid.
import '../styles/PuzzleBoard.css' // Import CSS styles.

/**
 * PuzzleBoard component - Handles the rendering of the Sudoku grid.
 * Manages the game's current grid state and user interactions.
 */
class PuzzleBoard extends Component {
  /**
   * Constructor for the PuzzleBoard component.
   *
   * @param {object} props - React props passed to the component.
   */
  constructor (props) {
    super(props)

    // Create React refs for each cell to manage focus.
    this.cellRefs = Array.from({ length: 9 }, () => Array(9).fill(null))
  }

  /**
   * Handles changes in the cell's value and update the state.
   *
   * @param {number} row - Row index of the cell
   * @param {number} col - Column index of the cell
   * @param {number|null} value - New value to set (1-9 or null)
   */
  handleCellChange (row, col, value) {
    this.#handleCellChange(row, col, value)
  }

  /**
   * Handles cell movement within the Sudoku grid based on key input.
   * Determines the new cell position based on the direction key and whether the shift key is held.
   *
   * @param {number} row - The current row index of the focused cell.
   * @param {number} col - The current column index of the focused cell.
   * @param {string} direction - The direction of movement ('ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Tab').
   * @param {boolean} shiftKey - True if the shift key is held during movement, false otherwise.
   */
  handleCellMove (row, col, direction, shiftKey) {
    this.#handleCellMove(row, col, direction, shiftKey)
  }

  /* Private methods */

  /**
   * Private method to handle changes in a cell's value.
   *
   * @param {number} row - Row index of the cell.
   * @param {number} col - Column index of the cell.
   * @param {number|null} value - New value to set (1-9 or null).
   * @private
   */
  #handleCellChange (row, col, value) {
    if (this.props.onCellChange) {
      this.props.onCellChange(row, col, value)
    }
  }

  /**
   * Private method to handle cell movement based on arrow keys.
   *
   * @param {number} row - Current row index.
   * @param {number} col - Current column index.
   * @param {string} direction - Direction key pressed.
   * @param {boolean} shiftKey - Whether the shift key is held.
   * @private
   */
  #handleCellMove (row, col, direction, shiftKey) {
    let newRow = row
    let newCol = col

    switch (direction) {
      case 'ArrowLeft':
        newCol = (col - 1 + 9) % 9
        break
      case 'ArrowRight':
        newCol = (col + 1) % 9
        break
      case 'ArrowUp':
        newRow = (row - 1 + 9) % 9
        break
      case 'ArrowDown':
        newRow = (row + 1) % 9
        break
      case 'Tab':
        if (shiftKey) {
          // Move to the previous cell.
          if (col === 0) {
            newCol = 8
            newRow = (row - 1 + 9) % 9
          } else {
            newCol = col - 1
          }
        } else {
          // Move to the next cell.
          if (col === 8) {
            newCol = 0
            newRow = (row + 1) % 9
          } else {
            newCol = col + 1
          }
        }
        break
      default:
        break
    }

    // Focus the new cell.
    if (this.cellRefs[newRow][newCol]) {
      this.cellRefs[newRow][newCol].focus()
    }
  }

  /**
   * Private method to handle the rendering of the Sudoku puzzle board.
   *
   * @returns {React.Element} The JSX representation of the Sudoku grid.
   * @private
   */
  #renderPuzzleBoard () {
    const { grid, originalGrid } = this.props // Use originalGrid from Props instead of State.

    return (
      <div className="puzzle-board">
        {/* Render the 9x9 grid using Cell components */}
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cellValue, colIndex) => (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                ref={(cellInstance) => { this.cellRefs[rowIndex][colIndex] = cellInstance }}
                value={cellValue}
                isEditable={originalGrid[rowIndex][colIndex] === null} // Editable if initially empty.
                onChange={(newValue) => this.handleCellChange(rowIndex, colIndex, newValue)}
                onMove={(direction, shiftKey) => this.#handleCellMove(rowIndex, colIndex, direction, shiftKey)
                }
              />
            ))}
          </div>
        ))}
      </div>
    )
  }

  /* Required methods */

  /**
   * Renders the PuzzleBoard component.
   *
   * @returns {React.Element} The JSX representation of the Sudoku puzzle board.
   */
  render () {
    return this.#renderPuzzleBoard()
  }
}

export default PuzzleBoard

/* This component will serve as the main Sudoku grid, handling the rendering of a 9x9 grid of cells.
Each cell will be managed by the Cell.js component. */

import React, { Component } from 'react'
import Cell from './Cell.js' // Import the Cell component to render each cell in the Sudoku grid.
// import SudokuService from '../services/SudokuService.js' // Import the service responsible for puzzle logic.
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

    // // Create an instance of SudokuService.
    // this.sudokuService = new SudokuService()

    // Create React refs for each cell to manage focus.
    this.cellRefs = Array.from({ length: 9 }, () => Array(9).fill(null))

    // // Bind methods.
    // this.#handleCellMove = this.#handleCellMove.bind(this)
    // this.#handleCellChange = this.#handleCellChange.bind(this)

    // // State initialization.
    // const emptyGrid = Array(9).fill(Array(9).fill(null)) // 9x9 empty grid.

    // this.state = {
    //   grid: emptyGrid, // Initialize grid.
    //   originalGrid: emptyGrid, // Initialize empty grid.
    //   isCompleted: false // Track if the puzzle is complete.
    // }
  }

  // /**
  //  * Handles navigation between cells in the Sudoku grid based on arrow key input.
  //  * Updates focus to the cell in the specified direction.
  //  *
  //  * @param {number} row - The current row index of the focused cell.
  //  * @param {number} col - The current column index of the focused cell.
  //  * @param {string} direction - The direction to move ('ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown').
  //  */
  // handleMove = (row, col, direction) => {
  //   let newRow = row
  //   let newCol = col

  //   if (direction === 'ArrowLeft') {
  //     newCol = (col - 1 + 9) % 9
  //   } else if (direction === 'ArrowRight') {
  //     newCol = (col + 1) % 9
  //   } else if (direction === 'ArrowUp') {
  //     newRow = (row - 1 + 9) % 9
  //   } else if (direction === 'ArrowDown') {
  //     newRow = (row + 1) % 9
  //   }

  //   if (this.cellRefs[newRow][newCol]) {
  //     this.cellRefs[newRow][newCol].focus()
  //   }
  // }

  // /**
  //  * React lifecycle method that runs after the component has mounted.
  //  * Generates a new puzzle of medium difficulty when the component loads.
  //  */
  // componentDidMount () {
  //   this.generateNewPuzzle('medium') // Generate a new puzzle of medium difficulty on load.
  // }

  // /**
  //  * React lifecycle method that runs after the component has updated.
  //  * It checks if the `grid` prop has changed and updates the component's state accordingly.
  //  *
  //  * @param {object} prevProps - The previous props before the update.
  //  * @private
  //  */
  // componentDidUpdate (prevProps) {
  //   if (prevProps.grid !== this.props.grid) {
  //     console.log('PuzzleBoard - Grid Updated:', this.props.grid)
  //     this.setState({ grid: this.props.grid })
  //   }
  // }

  // /**
  //  * Generates a new puzzle and set the grid state.
  //  *
  //  * @param {string} difficulty - The difficulty level ('easy', 'medium', 'hard')
  //  */
  // generateNewPuzzle (difficulty) {
  //   this.#generateNewPuzzle(difficulty)
  // }

  // /**
  //  * Validates if the current grid state is complete and correct.
  //  */
  // checkCompletion = () => {
  //   this.#checkCompletion()
  // }

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

  // /**
  //  * Private method to generate a new puzzle and set the grid state.
  //  *
  //  * @param {string} difficulty - The difficulty level ('easy', 'medium', 'hard').
  //  * @private
  //  */
  // #generateNewPuzzle (difficulty) {
  //   // Use the instance of SudokuService to generate a new puzzle.
  //   const newPuzzle = this.sudokuService.generatePuzzle(difficulty)
  //   this.setState({
  //     grid: newPuzzle,
  //     originalGrid: JSON.parse(JSON.stringify(newPuzzle)) // Store the initially generated grid as a deep copy to prevent modifications and to avoid referencing issues.
  //   })
  // }

  // /**
  //  * Private method to validate if the grid is complete.
  //  * Updates the `isCompleted` state if the puzzle is solved.
  //  *
  //  * @private
  //  */
  // #checkCompletion () {
  //   // Check if all cells are filled.
  //   const isComplete = this.state.grid.every(row => row.every(cell => cell !== null))

  //   // Use the instance of SudokuService to validate the grid.
  //   const isValid = this.sudokuService.validateGrid(this.state.grid)

  //   // Only consider it solved if both complete and valid.
  //   const isSolved = isComplete && isValid
  //   this.setState({ isCompleted: isSolved })

  //   if (isSolved) {
  //     alert('Congratulations! Puzzle solved.')
  //   } else {
  //     alert('The puzzle is not solved correctly or is incomplete.')
  //   }
  // }

  /**
   * Private method to handle changes in a cell's value.
   *
   * @param {number} row - Row index of the cell.
   * @param {number} col - Column index of the cell.
   * @param {number|null} value - New value to set (1-9 or null).
   * @private
   */
  #handleCellChange (row, col, value) {
    // const updatedGrid = this.state.grid.map((rowData, rowIndex) =>
    //   rowData.map((cellValue, colIndex) =>
    //     rowIndex === row && colIndex === col ? value : cellValue
    //   )
    // )
    // this.setState({ grid: updatedGrid })

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
    // const { grid, originalGrid } = this.state
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
                // onMove={(direction) => this.handleMove(rowIndex, colIndex, direction)}
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

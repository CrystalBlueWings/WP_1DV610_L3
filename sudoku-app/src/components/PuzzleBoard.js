/* This component will serve as the main Sudoku grid, handling the rendering of a 9x9 grid of cells.
Each cell will be managed by the Cell.js component. */

import React, { Component } from 'react'
import Cell from './Cell.js' // Import the Cell component to render each cell in the Sudoku grid.
import SudokuService from '../services/SudokuService.js' // Import the service responsible for puzzle logic.
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

    // Create an instance of SudokuService.
    this.sudokuService = new SudokuService()

    // State initialization.
    const emptyGrid = Array(9).fill(Array(9).fill(null)) // 9x9 empty grid.

    // Create React refs for each cell.
    this.cellRefs = Array.from({ length: 9 }, () => Array(9).fill(null))

    this.state = {
      grid: emptyGrid, // Initialize grid.
      originalGrid: emptyGrid, // Initialize empty grid.
      isCompleted: false // Track if the puzzle is complete.
    }
  }

  /**
   * Handles navigation between cells in the Sudoku grid based on arrow key input.
   * Updates focus to the cell in the specified direction.
   *
   * @param {number} row - The current row index of the focused cell.
   * @param {number} col - The current column index of the focused cell.
   * @param {string} direction - The direction to move ('ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown').
   */
  handleMove = (row, col, direction) => {
    let newRow = row
    let newCol = col

    if (direction === 'ArrowLeft') {
      newCol = (col - 1 + 9) % 9
    } else if (direction === 'ArrowRight') {
      newCol = (col + 1) % 9
    } else if (direction === 'ArrowUp') {
      newRow = (row - 1 + 9) % 9
    } else if (direction === 'ArrowDown') {
      newRow = (row + 1) % 9
    }

    if (this.cellRefs[newRow][newCol]) {
      this.cellRefs[newRow][newCol].focus()
    }
  }

  /**
   * React lifecycle method that runs after the component has mounted.
   * Generates a new puzzle of medium difficulty when the component loads.
   */
  componentDidMount () {
    this.generateNewPuzzle('medium') // Generate a new puzzle of medium difficulty on load.
  }

  /**
   * React lifecycle method that runs after the component has updated.
   * It checks if the `grid` prop has changed and updates the component's state accordingly.
   *
   * @param {object} prevProps - The previous props before the update.
   * @private
   */
  componentDidUpdate (prevProps) {
    if (prevProps.grid !== this.props.grid) {
      console.log('PuzzleBoard - Grid Updated:', this.props.grid)
      this.setState({ grid: this.props.grid })
    }
  }

  /**
   * Generates a new puzzle and set the grid state.
   *
   * @param {string} difficulty - The difficulty level ('easy', 'medium', 'hard')
   */
  generateNewPuzzle (difficulty) {
    this.#generateNewPuzzle(difficulty)
  }

  /**
   * Validates if the current grid state is complete and correct.
   */
  checkCompletion = () => {
    this.#checkCompletion()
  }

  /**
   * Handles changes in the cell's value and update the state.
   *
   * @param {number} row - Row index of the cell
   * @param {number} col - Column index of the cell
   * @param {number|null} value - New value to set (1-9 or null)
   */
  handleCellChange = (row, col, value) => {
    this.#handleCellChange(row, col, value)
  }

  /* Private methods */

  /**
   * Private method to generate a new puzzle and set the grid state.
   *
   * @param {string} difficulty - The difficulty level ('easy', 'medium', 'hard').
   * @private
   */
  #generateNewPuzzle (difficulty) {
    // Use the instance of SudokuService to generate a new puzzle.
    const newPuzzle = this.sudokuService.generatePuzzle(difficulty)
    this.setState({
      grid: newPuzzle,
      originalGrid: JSON.parse(JSON.stringify(newPuzzle)) // Store the initially generated grid as a deep copy to prevent modifications and to avoid referencing issues.
    })
  }

  /**
   * Private method to validate if the grid is complete.
   * Updates the `isCompleted` state if the puzzle is solved.
   *
   * @private
   */
  #checkCompletion () {
    // Check if all cells are filled.
    const isComplete = this.state.grid.every(row => row.every(cell => cell !== null))

    // Use the instance of SudokuService to validate the grid.
    const isValid = this.sudokuService.validateGrid(this.state.grid)

    // Only consider it solved if both complete and valid.
    const isSolved = isComplete && isValid
    this.setState({ isCompleted: isSolved })

    if (isSolved) {
      alert('Congratulations! Puzzle solved.')
    } else {
      alert('The puzzle is not solved correctly or is incomplete.')
    }
  }

  /**
   * Private method to handle changes in a cell's value.
   * Updates the grid state with the new value.
   *
   * @param {number} row - Row index of the cell.
   * @param {number} col - Column index of the cell.
   * @param {number|null} value - New value to set (1-9 or null).
   * @private
   */
  #handleCellChange (row, col, value) {
    const updatedGrid = this.state.grid.map((rowData, rowIndex) =>
      rowData.map((cellValue, colIndex) =>
        rowIndex === row && colIndex === col ? value : cellValue
      )
    )
    this.setState({ grid: updatedGrid })
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

  /**
   * Private method to handle the rendering of the Sudoku puzzle board.
   *
   * @returns {React.Element} The JSX representation of the Sudoku grid.
   * @private
   */
  #renderPuzzleBoard () {
    const { grid, originalGrid } = this.state

    return (
      <div className="puzzle-board">
        {/* Render the 9x9 grid using Cell components */}
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cellValue, colIndex) => (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                ref={(cellInstance) => {
                  this.cellRefs[rowIndex][colIndex] = cellInstance
                }}
                value={cellValue}
                isEditable={originalGrid[rowIndex][colIndex] === null} // Editable if initially empty.
                onChange={(newValue) => this.handleCellChange(rowIndex, colIndex, newValue)}
                onMove={(direction) => this.handleMove(rowIndex, colIndex, direction)}
              />
            ))}
          </div>
        ))}
      </div>
    )
  }
}

export default PuzzleBoard

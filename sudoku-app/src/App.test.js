import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './App.js'

// ---- Mocks to avoid loading ESM from node_modules/src ----
jest.mock('sudoku-puzzle-solver/src/sudokuGenerator', () => {
  // default export: constructor with method generateUnfinishedSudokuGrid()
  return function MockSudokuGenerator () {
    return {
      /**
       * Generates an unfinished Sudoku grid.
       *
       * @returns {number[][]} - A 9x9 grid with nulls representing empty cells.
       */
      generateUnfinishedSudokuGrid: () =>
        Array.from({ length: 9 }, () => Array(9).fill(null))
    }
  }
})

jest.mock('sudoku-puzzle-solver/src/sudokuSolver', () => {
  // default export: constructor(grid) with solveGrid() and a grid property
  return function MockSudokuSolver (grid) {
    this.grid = {
      sudokuGrid: Array.from({ length: 9 }, () => Array(9).fill(1))
    }
    /**
     * Solves the Sudoku grid.
     *
     * @returns {boolean} - True if solved successfully.
     */
    this.solveGrid = () => true
  }
})

jest.mock('sudoku-puzzle-solver/src/hintGenerator', () => {
  // default export: constructor(grid) with getCellsWithFewestCandidates()
  return function MockHintGenerator () {
    /**
     * Retrieves cells with the fewest candidates.
     *
     * @returns {Array} - An array of cell objects with row, col, and candidates.
     */
    this.getCellsWithFewestCandidates = () => [{ row: 0, col: 0, candidates: [5] }]
  }
})

jest.mock('sudoku-puzzle-solver/src/sudokuValidator', () => {
  // default export: constructor(grid) with isValidGrid()
  return function MockSudokuValidator () {
    /**
     * Validates the Sudoku grid.
     *
     * @returns {boolean} - True if the grid is valid.
     */
    this.isValidGrid = () => true
  }
})

// Basic test to check if the App component renders correctly.
test('renders Sudoku Game heading and Solve button', () => {
  render(<App />) // Render the App component. Renders the component into a virtual DOM for testing.
  expect(screen.getByRole('heading', { name: /sudoku game/i })).toBeInTheDocument() // Check for heading. Returns the heading element if found.
  expect(screen.getByRole('button', { name: /solve puzzle/i })).toBeInTheDocument() // Check for Solve button. Returns the button element if found.
})

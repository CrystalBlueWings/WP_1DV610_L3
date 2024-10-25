/* This component handles solving the entire puzzle or specific cells/boxes.
For now, only implement a button to solve the entire grid.
Add more buttons later. */

import React, { Component } from 'react'
import SudokuService from '../services/SudokuService' // Import the service that handles puzzle solving
import '../styles/SolverButton.css' // Import styles specific to the Solver Button

/**
 * SolverButton component - Provides a button to solve the current Sudoku puzzle.
 * Uses SudokuService to solve the puzzle and updates the state via the parent component.
 */
class SolverButton extends Component {
  /**
   * Constructor for the SolverButton component.
   *
   * @param {object} props - React props passed to the component.
   */
  constructor (props) {
    super(props)

    // Bind the event handler to the class
    this.solvePuzzle = this.solvePuzzle.bind(this)
  }

  /**
   * Solves the current puzzle.
   * If the puzzle is solvable, updates the grid state via the parent component.
   */
  solvePuzzle () {
    this.#solveCurrentPuzzle()
  }

  /* Private methods */

  /**
   * Private method to solve the current puzzle using the SudokuService.
   * If a solution is found, triggers a callback to update the parent component's state.
   * Alerts the user if the puzzle cannot be solved.
   *
   * @private
   */
  #solveCurrentPuzzle () {
    const solvedGrid = SudokuService.solvePuzzle(this.props.grid) // Attempt to solve the grid

    // If the solution is found, update the grid via the parent component
    if (solvedGrid) {
      this.props.onSolve(solvedGrid)
    } else {
      alert('Puzzle cannot be solved.')
    }
  }

  /* Required methods */

  /**
   * Renders the SolverButton component.
   *
   * @returns {React.Element} The JSX representation of the solve button.
   */
  render () {
    return this.#renderSolverButton()
  }

  /**
   * Private method to handle the rendering of the Solve button.
   *
   * @returns {React.Element} The JSX representation of the solve button.
   * @private
   */
  #renderSolverButton () {
    return (
      <button onClick={this.solvePuzzle}>
        Solve Puzzle
      </button>
    )
  }
}

export default SolverButton

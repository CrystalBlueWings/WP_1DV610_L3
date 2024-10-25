/* This component handles solving the entire puzzle or specific cells/boxes.
For now, only implement a button to solve the entire grid.
Add more buttons later. */

import React, { Component } from 'react'
// import SudokuService from '../services/SudokuService.js' // Import the service that handles puzzle solving
import '../styles/SolverButton.css' // Import styles specific to the Solver Button

/**
 * SolverButton component - Provides a button to solve the current Sudoku puzzle.
 * Triggers a callback to the parent component to handle puzzle solving.
 */
class SolverButton extends Component {
  // /**
  //  * Constructor for the SolverButton component.
  //  *
  //  * @param {object} props - React props passed to the component.
  //  */
  // constructor (props) {
  //   super(props)

  //   // Create an instance of SudokuService
  //   this.sudokuService = new SudokuService()

  //   // Bind the event handler to the class
  //   this.solvePuzzle = this.solvePuzzle.bind(this)
  // }

  /**
   * Solves the current puzzle.
   * Calls the onSolve prop passed from the parent component.
   */
  solvePuzzle () {
    // this.#solveCurrentPuzzle()

    if (this.props.onSolve) {
      this.props.onSolve()
    }
  }

  /* Private methods */

  // /**
  //  * Private method to solve the current puzzle using the SudokuService.
  //  * If a solution is found, triggers a callback to update the parent component's state.
  //  * Alerts the user if the puzzle cannot be solved.
  //  *
  //  * @private
  //  */
  // #solveCurrentPuzzle () {
  //   const solvedGrid = this.sudokuService.solvePuzzle(this.props.grid) // Attempt to solve the grid

  //   // If the solution is found, update the grid via the parent component
  //   if (solvedGrid) {
  //     this.props.onSolve(solvedGrid)
  //   } else {
  //     alert('Puzzle cannot be solved.')
  //   }
  // }

  /**
   * Private method to handle the rendering of the Solve button.
   *
   * @returns {React.Element} The JSX representation of the solve button.
   * @private
   */
  #renderSolverButton () {
    return (
      // <button onClick={this.solvePuzzle}>
      <button onClick={this.solvePuzzle.bind(this)}>
        Solve Puzzle
      </button>
    )
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
}

export default SolverButton

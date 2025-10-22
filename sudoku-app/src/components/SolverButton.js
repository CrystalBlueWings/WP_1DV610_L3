import React, { Component } from 'react'
import '../styles/SolverButton.css' // Import styles specific to the Solver Button

/**
 * SolverButton component - Provides a button to solve the current Sudoku puzzle.
 * Triggers a callback to the parent component to handle puzzle solving.
 */
class SolverButton extends Component {
  /**
   * Solves the current puzzle.
   * Calls the onSolve prop passed from the parent component.
   */
  solvePuzzle () {
    if (this.props.onSolve) {
      this.props.onSolve()
    }
  }

  /* Private methods */

  /**
   * Private method to handle the rendering of the Solve button.
   *
   * @returns {React.Element} The JSX representation of the solve button.
   * @private
   */
  #renderSolverButton () {
    return (
      <button type="button" className="solve-button" onClick={this.solvePuzzle.bind(this)}>
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

/* The hint button should provide step-by-step hints.
Could add options for different hint types like the easiest move, a specific cell, or the easiest 3x3 box. */

import React, { Component } from 'react'
import SudokuService from '../services/SudokuService' // Import the service that provides puzzle hints
import '../styles/HintButton.css' // Import styles specific to the Hint Button

/**
 * HintButton component - Provides a button to generate hints for the Sudoku puzzle.
 * Uses SudokuService to generate hints based on the current state of the grid.
 */
class HintButton extends Component {
  /**
   * Constructor for the HintButton component.
   *
   * @param {object} props - React props passed to the component.
   */
  constructor (props) {
    super(props)

    // Bind the event handler to the class
    this.generateHint = this.generateHint.bind(this)
  }

  /**
   * Generates a hint for the user.
   * If a hint is available, updates the grid state via the parent component.
   */
  generateHint () {
    this.#generateHintForUser()
  }

  /* Private methods */

  /**
   * Private method to generate a hint using the SudokuService.
   * Fetches a hint for the current grid and triggers a callback if a hint is found.
   *
   * @private
   */
  #generateHintForUser () {
    const hint = SudokuService.getHint(this.props.grid) // Get a hint based on the current grid state

    // If a hint is available, pass it to the parent component
    if (hint) {
      this.props.onHint(hint.row, hint.col, hint.value)
    } else {
      alert('No hints available or puzzle is complete.')
    }
  }

  /* Required methods */

  /**
   * Renders the HintButton component.
   *
   * @returns {React.Element} The JSX representation of the hint button.
   */
  render () {
    return this.#renderHintButton()
  }

  /**
   * Private method to handle the rendering of the Hint button.
   *
   * @returns {React.Element} The JSX representation of the hint button.
   * @private
   */
  #renderHintButton () {
    return (
      <button onClick={this.generateHint}>
        Get Hint
      </button>
    )
  }
}

export default HintButton

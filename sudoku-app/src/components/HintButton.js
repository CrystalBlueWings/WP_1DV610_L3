/* The hint button should provide step-by-step hints.
Could add options for different hint types like the easiest move, a specific cell, or the easiest 3x3 box. */

import React, { Component } from 'react'
// import SudokuService from '../services/SudokuService.js' // Import the service that provides puzzle hints
import '../styles/HintButton.css' // Import styles specific to the Hint Button

/**
 * HintButton component - Provides a button to generate hints for the Sudoku puzzle.
 * Triggers a callback to the parent component to handle hint generation.
 */
class HintButton extends Component {
  // /**
  //  * Constructor for the HintButton component.
  //  *
  //  * @param {object} props - React props passed to the component.
  //  */
  // constructor (props) {
  //   super(props)

  //   // Create an instance of SudokuService
  //   this.sudokuService = new SudokuService()

  //   // Bind the event handler to the class
  //   this.generateHint = this.generateHint.bind(this)
  // }

  /**
   * Generates a hint for the user.
   * Calls the onHint prop passed from the parent component.
   */
  generateHint () {
    console.log('SudokuService:', this.sudokuService) // Show the instance
    console.log('getHint method:', this.sudokuService.getHint) // Should be a function

    // if (typeof this.sudokuService.getHint === 'function') {
    //   this.#generateHintForUser()
    // } else {
    //   console.error('getHint is not a function')
    // }

    if (this.props.onHint) {
      this.props.onHint()
    }

    // this.#generateHintForUser()
  }

  /* Private methods */

  // /**
  //  * Private method to generate a hint using the SudokuService.
  //  * Fetches a hint for the current grid and triggers a callback if a hint is found.
  //  *
  //  * @private
  //  */
  // #generateHintForUser () {
  //   console.log('Current Grid State before hint generation:', this.props.grid) // Log the grid state

  //   if (!this.sudokuService.isValidGridStructure(this.props.grid)) {
  //     console.error('Invalid grid structure before generating hint:', this.props.grid)
  //     alert('Invalid grid structure detected.')
  //     return
  //   }

  //   const hint = this.sudokuService.getHint(this.props.grid)

  //   // If a hint is available, pass it to the parent component.
  //   if (hint) {
  //     this.props.onHint(hint.row, hint.col, hint.value)
  //   } else {
  //     alert('No hints available or puzzle is complete.')
  //   }
  // }

  /**
   * Private method to handle the rendering of the Hint button.
   *
   * @returns {React.Element} The JSX representation of the hint button.
   * @private
   */
  #renderHintButton () {
    return (
      // <button onClick={this.generateHint}>
      <button onClick={this.generateHint.bind(this)}>
        Get Hint
      </button>
    )
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
}

export default HintButton

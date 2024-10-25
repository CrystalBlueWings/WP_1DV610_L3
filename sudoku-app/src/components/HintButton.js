import React, { Component } from 'react'
import '../styles/HintButton.css' // Import styles specific to the Hint Button

/**
 * HintButton component - Provides a button to generate hints for the Sudoku puzzle.
 * Triggers a callback to the parent component to handle hint generation.
 */
class HintButton extends Component {
  /**
   * Generates a hint for the user.
   * Calls the onHint prop passed from the parent component.
   */
  generateHint () {
    if (this.props.onHint) {
      this.props.onHint()
    }
  }

  /* Private methods */

  /**
   * Private method to handle the rendering of the Hint button.
   *
   * @returns {React.Element} The JSX representation of the hint button.
   * @private
   */
  #renderHintButton () {
    return (
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

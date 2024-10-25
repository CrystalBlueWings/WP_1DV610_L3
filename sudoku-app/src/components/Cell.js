/* This component is responsible for rendering each cell of the Sudoku grid.
It will handle validation to ensure only numbers 1-9 can be entered. */

import React, { Component } from 'react'
import '../styles/Cell.css' // Import styles specific to each cell

/**
 * Cell component - Represents an individual cell in the Sudoku grid.
 * Handles input validation and renders the cell based on its editable status.
 */
class Cell extends Component {
  /**
   * Constructor for the Cell component.
   *
   * @param {object} props - React props passed to the component.
   */
  constructor (props) {
    super(props)

    // Bind the event handler to the class
    this.handleChange = this.handleChange.bind(this)
  }

  /**
   * Handles changes in the input field.
   * Validates the input to ensure only digits 1-9 are allowed.
   *
   * @param {object} e - Event object from the input field.
   */
  handleChange (e) {
    this.#handleInputChange(e)
  }

  /* Private methods */

  /**
   * Private method to handle input changes and validate digits.
   * Converts the input to an integer if valid and passes it to the parent component.
   *
   * @param {object} e - Event object from the input field.
   * @private
   */
  #handleInputChange (e) {
    const inputValue = e.target.value
    // Allow only digits 1-9 or empty input.
    if (/^[1-9]?$/.test(inputValue)) {
      this.props.onChange(inputValue ? parseInt(inputValue) : null) // Convert to integer if valid.
    }
  }

  /* Required methods */

  /**
   * Renders the Cell component.
   *
   * @returns {React.Element} The JSX representation of a single cell.
   */
  render () {
    return this.#renderCell()
  }

  /**
   * Private method to handle the rendering of the Sudoku cell.
   * Styles the cell based on its editability.
   *
   * @returns {React.Element} The JSX representation of a single cell.
   * @private
   */
  #renderCell () {
    const { value, isEditable } = this.props

    return (
      <input
        type="text"
        className={`cell ${isEditable ? 'editable' : 'non-editable'}`} // Style based on editability.
        value={value || ''} // Show empty if value is null.
        onChange={this.handleChange} // Attach the change handler..
        readOnly={!isEditable} // Disable input if not editable
      />
    )
  }
}

export default Cell
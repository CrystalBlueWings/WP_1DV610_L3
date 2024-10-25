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

    // Create a React ref to access the input element directly.
    this.inputRef = React.createRef()

    // Bind the event handler to the class
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  /**
   * Sets focus on the cell's input field.
   * Uses the React ref `inputRef` to control focus between cells.
   */
  focus () {
    if (this.inputRef.current) {
      this.inputRef.current.focus()
    }
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

  /**
   * Handles key down events to restrict input to digits 1-9.
   * Prevents other key inputs from affecting the cell's value.
   *
   * @param {object} e - Event object from the input field.
   */
  handleKeyDown (e) {
    this.#handleKeyDown(e)
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

  /**
   * Private method to handle key down events for the cell's input field.
   * Restricts input to digits 1-9, navigation keys, and deletion keys.
   * Prevents any other key inputs from affecting the cell's value.
   *
   * @param {object} e - The keyboard event object triggered by a key press.
   * @private
   */
  #handleKeyDown (e) {
    const allowedKeys = [
      'Backspace',
      'Delete',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
      'Tab'
    ]
    const isNumberKey = /^[1-9]$/.test(e.key)

    // Allow navigation and deletion keys.
    if (allowedKeys.includes(e.key) || isNumberKey) {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Tab'].includes(e.key)) {
        e.preventDefault()
        if (this.props.onMove) {
          this.props.onMove(e.key, e.shiftKey)
        }
      }
      return // Allow valid key inputs.
    }

    // Prevent default behavior for invalid keys.
    e.preventDefault()
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
        ref={this.inputRef}
        type="text"
        className={`cell ${isEditable ? 'editable' : 'non-editable'}`} // Style based on editability.
        value={value || ''} // Show empty if value is null.
        onChange={this.handleChange} // Attach the change handler.
        onKeyDown={this.handleKeyDown} // Attach the key down handler.
        readOnly={!isEditable} // Disable input if not editable
      />
    )
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
}

export default Cell

import { useState } from 'react'

// Owns the local form state (input + error). The only owned state here is
// form-scoped and lifted to the parent through the onGuess / onReset callbacks.
function GuessInput({ onGuess, onReset, won }) {
  const [input, setInput] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    // Guard non-numeric input: parseInt + Number.isNaN rejects empty/NaN.
    const value = parseInt(input, 10)

    if (Number.isNaN(value)) {
      setError('Please enter a valid number.')
      return
     }

    // Enforce the valid range before the value is lifted to the parent.
    if (value < 1 || value > 20) {
      setError('Enter a number between 1 and 20.')
      return
     }

    onGuess(value)
    setInput('')
    setError('')
   }

  function handleReset() {
    // Clear local form state, then signal the parent to reset the game.
    setInput('')
    setError('')
    onReset()
   }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          disabled={won}
        />
        <button type="submit" disabled={won}>
          Guess
        </button>
      </form>
      <button type="button" onClick={handleReset}>
        Play Again
      </button>

      {error && <p>{error}</p>}
    </div>
  )
}

export default GuessInput

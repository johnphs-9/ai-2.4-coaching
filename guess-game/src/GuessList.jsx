import GuessItem from './GuessItem'

// Dumb container: maps the guesses array to GuessItem rows. Holds no state.
function GuessList({ guesses, secretNumber }) {
  if (guesses.length === 0) {
    return null
   }

  return (
    <ul>
      {guesses.map((guess, index) => (
        <GuessItem key={index} guess={guess} secretNumber={secretNumber} />
      ))}
    </ul>
  )
}

export default GuessList

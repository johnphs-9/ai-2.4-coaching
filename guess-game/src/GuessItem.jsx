// Pure, stateless row. Derives its own high/low/correct label from the props
// so the list stays free of per-item state.
function GuessItem({ guess, secretNumber }) {
  let status
  if (guess === secretNumber) {
    status = 'Correct'
  } else if (guess > secretNumber) {
    status = 'Too high'
  } else {
    status = 'Too low'
  }

  return <li>{guess} — {status}</li>
}

export default GuessItem

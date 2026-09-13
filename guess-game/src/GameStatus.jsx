// Pure, stateless view: renders the derived status string, or nothing when
// there are no guesses yet.
function GameStatus({ status }) {
  if (!status) {
    return null
   }

  return <p>{status}</p>
}

export default GameStatus

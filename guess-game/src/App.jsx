import { useState } from "react";
import GameStatus from "./GameStatus";
import GuessInput from "./GuessInput";
import GuessList from "./GuessList";

// Generates a fresh secret in [1, 20]. Used as the lazy initializer for the
// first render and again on every reset.
function makeSecret() {
  return Math.floor(Math.random() * 20) + 1;
}

// App is the single source of truth: it owns the game state and derives every
// display value from it. Children receive props (data down) and report back
// through callbacks (events up).
function App() {
  // Owned state. secretNumber is initialised lazily so the random number is
  // generated exactly once on mount (not on every render).
  const [secretNumber, setSecretNumber] = useState(makeSecret);
  const [guesses, setGuesses] = useState([]);

  // Derived values: computed from guesses rather than stored, so there is no
  // redundant state to keep in sync.
  const lastGuess = guesses.length > 0 ? guesses[guesses.length - 1] : null;
  const won = lastGuess === secretNumber;

  // The status message is derived from the last guess, not held in state.
  let status;
  if (guesses.length === 0) {
    status = "";
   } else if (won) {
    status = "Correct! You guessed it!";
   } else if (lastGuess > secretNumber) {
    status = "Too high!";
   } else {
    status = "Too low!";
   }

  // Callbacks lifted from GuessInput: append a validated guess...
  function handleGuess(value) {
    setGuesses([...guesses, value]);
   }

  // ...or reset the game, clearing history and rolling a new random secret.
  function handleReset() {
    setGuesses([]);
    setSecretNumber(makeSecret());
   }

  return (
    <div>
      <h1>Number Guessing Game</h1>
      <p>Guess the secret number between 1 and 20.</p>

      <GameStatus status={status} />

      <GuessInput onGuess={handleGuess} onReset={handleReset} won={won} />

         <GuessList guesses={guesses} secretNumber={secretNumber} />

         {/* Separated section at the bottom of the page: the architecture diagram */}
         <hr />
         <section>
           <h2>Architecture</h2>
           <img
            src="src/assets/architecture.svg"
            alt="Component architecture diagram"
            width="100%"
           />
         </section>
       </div>
    );
}

export default App;

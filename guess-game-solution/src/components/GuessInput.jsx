import { useState } from "react";
import styles from "./GuessInput.module.css";

function GuessInput({ onGuess, disabled }) {
  const [inputValue, setInputValue] = useState("");

  const inputChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // parseInt: convert the input value to an integer
    // 10 is the radix, indicating that the number is in base 10
    // returns an integer if the input is a valid number, otherwise NaN
    const guess = parseInt(inputValue, 10);

    // If the parsed guess is not a number, return early
    if (isNaN(guess)) return;

    // Call the onGuess callback with the valid guess
    onGuess(guess);
    // Reset the input field after submitting the guess
    setInputValue("");
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <label htmlFor="guess-input">Enter a number between 1 and 20</label>
      <div className={styles.controls}>
        <input
          id="guess-input"
          className={styles.input}
          type="text"
          inputMode="numeric"
          value={inputValue}
          onChange={inputChangeHandler}
          disabled={disabled}
        />
        <button className={styles.button} type="submit" disabled={disabled}>
          Guess
        </button>
      </div>
    </form>
  );
}

export default GuessInput;

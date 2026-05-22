# Coaching Session 2.4: Number Guessing Game

## Overview

- **Duration:** ~3 hours (30 min Q&A, ~2 hours activity, 30 min debrief)
- **Prerequisites:** Lessons 2.1, 2.2, and 2.3

## Session Objectives

By the end of this session, you will be able to:

1. **Design** a React component tree for a small interactive app from scratch
2. **Apply** `useState`, props, callbacks, and conditional rendering together in a single project
3. **Derive** display values from state instead of storing redundant copies

## Introduction

This coaching session gives you unstructured time to build a complete mini-app independently, using only the concepts from Lessons 2.1 to 2.3. There is no step-by-step walkthrough; the goal is to practice making your own design decisions: where to put state, how to split components, and how to wire them together. At the end, two learners will present their solutions before the instructor walks through a suggested approach.

---

## Part 1: Q&A (30 minutes)

Before the activity begins, the floor is open for questions about anything from Lessons 2.1, 2.2, and 2.3.

Come prepared with questions on topics you found unclear, patterns you want to understand better, or anything from the CRM exercises that did not quite make sense.

---

## Part 2: Activity — Number Guessing Game (~2 hours)

### The Brief

Build a number guessing game in React. The app sets a secret number between 1 and 20, accepts guesses from the user, and tells the user whether each guess is too high, too low, or correct.

This activity only requires the concepts you have already learned:

- `useState`
- Event handling
- Props and callbacks
- Component functions
- Conditional rendering
- CSS Modules

### Core Requirements

1. A secret number is fixed between 1 and 20. You may hard-code it as a constant to start.
2. The user can type a number into an input field and submit it.
3. After each guess, the app displays one of three status messages: "Too high!", "Too low!", or "Correct! You guessed it!"

### Getting Started

Create a new Vite project for this activity. Keep it separate from the CRM project.

```bash
npm create vite@latest guess-game -- --template react
cd guess-game
npm install
npm run dev
```

> **Before writing any JSX**, spend a few minutes on paper (or in a comment block) sketching:
> - What components will you create?
> - What state does each component need?
> - What props will each component receive?
>
> Planning upfront saves debugging time later.

### Hints

1. Start with everything in `App.jsx`. Get the core loop working (input, submit, status message) before splitting into components.
2. The status message can be derived from the last guess; you do not need a separate `useState` for it.
3. When you are ready to split components, think about which piece of UI has one clear job: the input form, the status display, the past guesses list.
4. To prevent crashing on non-numeric input, use `parseInt(guess, 10)` and check for `NaN` before evaluating the guess.

---

### Challenge Features

Once the core requirements work, attempt as many of these as time allows. They are listed in order of difficulty.

**1. Reset the game**

Add a "Play Again" button that resets the game to its initial state. The secret number and all past guesses should clear.

**2. Generate a random secret number**

Replace the hard-coded secret number with `Math.floor(Math.random() * 20) + 1`. Call this when the component first renders and again when the player resets.

**3. Display past guesses**

Keep a list of every guess the player has made. Render the list below the input, showing each guess and whether it was too high or too low. When the player resets, clear the list.

---

### Suggested Component Structure

You are free to structure your components however you like. Here is one approach to consider:

```
App
├── GameStatus       — displays the current status message
├── GuessInput       — controlled input + submit button
└── GuessList        — list of all past guesses
    └── GuessItem    — a single guess entry
```

Think about which component needs to own each piece of state, and what props each child needs to do its job.

---

## Part 3: Debrief (30 minutes)

### Learner Presentations

Two learners will share their screen and walk through their solution. As you watch, consider:

- How did they decide where to put state?
- How did they structure their components?
- Is there anything you would do differently?

### Instructor Walkthrough

After the presentations, the instructor will walk through a suggested solution covering:

1. Project setup and folder structure
2. State design in `App.jsx`
3. `GuessInput` as a controlled component with a local input state
4. Computing the status message as derived state from the guesses list
5. Rendering the `GuessList` with past guesses
6. The reset handler and `Math.random()` for random secret numbers

---

## Common Mistakes

**Mutating state directly**

```jsx
// Wrong — does not trigger a re-render
guesses.push(newGuess);

// Correct — creates a new array
setGuesses([...guesses, newGuess]);
```

**Storing derived values in `useState`**

```jsx
// Wrong — two sources of truth that can get out of sync
const [statusMessage, setStatusMessage] = useState("");

// Correct — compute it during render
const statusMessage =
  guesses.length === 0
    ? "Make your first guess!"
    : lastGuess > secretNumber
    ? "Too high!"
    : lastGuess < secretNumber
    ? "Too low!"
    : "Correct! You guessed it!";
```

**The `&&` gotcha with numbers**

```jsx
// Wrong — renders "0" as text when guesses.length is 0
{guesses.length && <GuessList guesses={guesses} />}

// Correct — explicit boolean check
{guesses.length > 0 && <GuessList guesses={guesses} />}
```

**Forgetting `key` on list items**

```jsx
// Wrong
{guesses.map((g) => <GuessItem guess={g} />)}

// Correct — key must be stable and unique
{guesses.map((g, index) => <GuessItem key={index} guess={g} />)}
```

---

## Summary

Congratulations on completing the coaching session. Here is what you practised today:

- **Component design**: breaking a small app into focused, reusable pieces
- **State ownership**: identifying which component should own each piece of state
- **Derived state**: computing display values from existing state instead of duplicating them
- **Props and callbacks**: wiring components together with one-way data flow

In the next lesson (2.5), you will extend these skills to work with lists, asynchronous operations, and side effects using `useEffect`.

import React, { useState } from "react";
import axios from "axios";
import classes from "./App.module.scss";
import WordDisplay from "./components/wordDisplay/WordDisplay";

function RandomWordDisplay() {
  const [wordArr, setWordArr] = useState<string[]>([]);
  const [letterVisibility, setLetterVisibility] = useState<boolean[]>([]);
  const [isStarted, setIsStarted] = useState<boolean>(false);

  const fetchRandomWord = async () => {
    try {
      const response = await axios.get(
        "https://random-word-api.herokuapp.com/word"
      );
      const word = response.data[0];
      const letters = word.split(/(?!$)/u);
      const visibility = letters.map(() => Math.random() < 0.4);
      setWordArr(letters);
      setLetterVisibility(visibility);
    } catch (error) {
      console.error("Error fetching random word:", error);
    }
  };

  return (
    <div className={classes.container}>
      <h1>HangMan Game</h1>
      {isStarted || (
        <button
          onClick={async () => {
            await fetchRandomWord();
            setIsStarted(true);
          }}
        >
          Start Game
        </button>
      )}
      {isStarted && (
        <WordDisplay wordArr={wordArr} letterVisibility={letterVisibility} />
      )}
    </div>
  );
}

export default RandomWordDisplay;

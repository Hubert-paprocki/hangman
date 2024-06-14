import React, { useState } from "react";
import axios from "axios";
import classes from "./App.module.scss";
import WordDisplay from "./components/wordDisplay/WordDisplay";
import LetterPicker from "./components/letterPicker/LetterPicker";

interface Letter {
  char: string;
  isVisible: boolean;
}

function RandomWordDisplay() {
  const [wordData, setWordData] = useState<Letter[]>([]);
  const [isStarted, setIsStarted] = useState<boolean>(false);

  const fetchRandomWord = async () => {
    try {
      let word = "";
      let wordLength = 0;

      do {
        const response = await axios.get(
          "https://random-word-api.herokuapp.com/word"
        );
        word = response.data[0];
        wordLength = word.length;
      } while (wordLength < 4);

      const letters = word.split(/(?!$)/u);
      const wordData = letters.map((char) => ({
        char,
        isVisible: Math.random() < 0.6,
      }));
      setWordData(wordData);
    } catch (error) {
      console.error("Error fetching random word:", error);
    }
  };

  return (
    <div className={classes.container}>
      <h1>HangMan Game</h1>
      {!isStarted && (
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
        <>
          <WordDisplay wordData={wordData} />
          <LetterPicker
            letterArr={wordData
              .filter((letter) => !letter.isVisible)
              .map((letter) => letter.char)}
          />
        </>
      )}
    </div>
  );
}

export default RandomWordDisplay;

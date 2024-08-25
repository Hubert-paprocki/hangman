import { useState } from "react";

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

  const changeVisibility = (index: number) => {
    setWordData((prevWordData) =>
      prevWordData.map((letter, i) =>
        i === index ? { ...letter, isVisible: !letter.isVisible } : letter
      )
    );
  };

  const generateWord = async () => {
    try {
      const response = await fetch("http://localhost:5000/generate-word", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to generate word");
      }

      const data = await response.json();
      const word = data.message;

      const letters = word.split(/(?!$)/);
      const wordData = letters.map((char: any) => ({
        char,
        isVisible: Math.random() < 0.6,
      }));

      setWordData(wordData);
      setIsStarted(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={classes.container}>
      <h1>HangMan Game</h1>
      {!isStarted && <button onClick={generateWord}>Start Game</button>}
      {isStarted && (
        <>
          <WordDisplay
            wordData={wordData}
            changeVisibility={changeVisibility}
          />
          <LetterPicker
            changeVisibility={changeVisibility}
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

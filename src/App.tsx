import { useState } from "react";

import classes from "./App.module.scss";
import WordDisplay from "./components/wordDisplay/WordDisplay";
import LetterPicker from "./components/letterPicker/LetterPicker";
import { isVisible } from "@testing-library/user-event/dist/utils";

export interface Letter {
  letter: string;
  isVisible: boolean;
  id: string;
}

function RandomWordDisplay() {
  const [wordData, setWordData] = useState<Letter[]>([]);
  const [isStarted, setIsStarted] = useState<boolean>(false);

  const changeVisibility = (id: string) => {
    setWordData((prevWordData) =>
      prevWordData.map((letter) =>
        letter.id === id ? { ...letter, isVisible: true } : letter
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

      setWordData(word);
      setIsStarted(true);
    } catch (err) {
      console.error(err);
    }
  };
  console.log(wordData, `test`);
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
            letterArr={wordData.filter((letter) => !letter.isVisible)}
          />
        </>
      )}
    </div>
  );
}

export default RandomWordDisplay;

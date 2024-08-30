import React from "react";
import LetterCell from "./LetterCell";
import classes from "./WordDisplay.module.scss";
import { Letter } from "../../App";

interface WordDisplayProps {
  wordData: Letter[];
  changeVisibility: (id: string) => void;
}

function WordDisplay({ wordData, changeVisibility }: WordDisplayProps) {
  return (
    <ul className={classes.list}>
      {wordData.map((word) => (
        <LetterCell
          key={word.id}
          letter={word.letter}
          isVisible={word.isVisible}
          id={word.id}
          changeVisibility={changeVisibility}
        />
      ))}
    </ul>
  );
}

export default WordDisplay;

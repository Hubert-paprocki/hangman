import React from "react";
import LetterCell from "./LetterCell";
import classes from "./WordDisplay.module.scss";

interface WordDisplayProps {
  readonly wordArr: string[];
  readonly letterVisibility: boolean[];
}

function WordDisplay(props: WordDisplayProps) {
  const { wordArr, letterVisibility } = props;

  return (
    <ul className={classes.list}>
      {wordArr.map((letter, index) => (
        <LetterCell
          key={index}
          letter={letter}
          visible={letterVisibility[index]}
        />
      ))}
    </ul>
  );
}

export default WordDisplay;

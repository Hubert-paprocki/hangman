import React from "react";
import LetterCell from "./LetterCell";
import classes from "./WordDisplay.module.scss";

interface Letter {
  char: string;
  isVisible: boolean;
}

interface WordDisplayProps {
  readonly wordData: Letter[];
}

function WordDisplay(props: WordDisplayProps) {
  const { wordData } = props;

  return (
    <div>
      <ul className={classes.list}>
        {wordData.map((letter, index) => (
          <LetterCell
            key={index}
            letter={letter.char}
            visible={letter.isVisible}
          />
        ))}
      </ul>
    </div>
  );
}

export default WordDisplay;

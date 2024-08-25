import React from "react";
import LetterCell from "./LetterCell";
import classes from "./WordDisplay.module.scss";

interface WordDisplayProps {
  wordData: { char: string; isVisible: boolean }[];
  changeVisibility: (index: number) => void; // Add changeVisibility to props
}

function WordDisplay(props: WordDisplayProps) {
  return (
    <ul className={classes.list}>
      {props.wordData.map((letter, index) => (
        <LetterCell
          key={index}
          letter={letter.char}
          visible={letter.isVisible}
          index={index} // Add index prop
          changeVisibility={props.changeVisibility} // Add changeVisibility prop
        />
      ))}
    </ul>
  );
}

export default WordDisplay;

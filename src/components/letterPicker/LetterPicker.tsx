import React from "react";
import classes from "./LetterPicker.module.scss";
import LetterCell from "../wordDisplay/LetterCell";

interface LetterPickerProps {
  letterArr: string[];
  changeVisibility: (index: number) => void;
}

function LetterPicker(props: LetterPickerProps) {
  return (
    <ul className={classes.letterPickerList}>
      {props.letterArr.map((letter, index) => (
        <LetterCell
          key={index}
          letter={letter}
          visible
          button
          changeVisibility={props.changeVisibility}
          index={index} // Added index prop
        />
      ))}
    </ul>
  );
}

export default LetterPicker;

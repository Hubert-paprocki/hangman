import React from "react";
import classes from "./LetterPicker.module.scss";
import LetterCell from "../wordDisplay/LetterCell";
import { Letter } from "../../App";

interface LetterPickerProps {
  letterArr: Letter[];
  changeVisibility: (id: string) => void;
}

function LetterPicker(props: LetterPickerProps) {
  return (
    <ul className={classes.letterPickerList}>
      {props.letterArr.map((word) => (
        <LetterCell
          key={word.id}
          letter={word.letter}
          isVisible
          button
          changeVisibility={props.changeVisibility}
          id={word.id}
        />
      ))}
    </ul>
  );
}

export default LetterPicker;

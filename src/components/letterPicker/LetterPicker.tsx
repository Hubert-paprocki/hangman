import React from "react";
import classes from "./LetterPicker.module.scss";
import LetterCell from "../wordDisplay/LetterCell";

interface LetterPickerProps {
  letterArr: string[];
}

function LetterPicker(props: LetterPickerProps) {
  console.log(props.letterArr);
  return (
    <ul className={classes.letterPickerList}>
      {props.letterArr.map((letter, index) => (
        <LetterCell key={index} letter={letter} visible button />
      ))}
    </ul>
  );
}

export default LetterPicker;

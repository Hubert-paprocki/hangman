import React from "react";
import classes from "./WordDisplay.module.scss";

interface LetterCellProps {
  readonly letter: string;
  readonly visible?: boolean;
}

function LetterCell(props: LetterCellProps) {
  return (
    <li className={classes.listItem}>
      {props.visible ? props.letter : <>&#x200b; &#x200b;</>}
    </li>
  );
}

export default LetterCell;

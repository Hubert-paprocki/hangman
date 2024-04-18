import React from "react";
import classes from "./WordDisplay.module.scss";

interface LetterCellProps {
  readonly letter: string;
  readonly visible?: boolean;
  readonly button?: boolean;
}

function LetterCell(props: LetterCellProps) {
  return props.button ? (
    <li>
      <button className={classes.listItemButton}>{props.letter}</button>
    </li>
  ) : (
    <li className={classes.listItem}>
      {props.visible ? props.letter : <>&#x200b; &#x200b;</>}
    </li>
  );
}

export default LetterCell;

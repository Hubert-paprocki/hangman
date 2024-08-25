import React from "react";
import classes from "./WordDisplay.module.scss";

interface LetterCellProps {
  readonly letter: string;
  readonly visible?: boolean;
  readonly button?: boolean;
  changeVisibility?: (index: number) => void;
  index: number; // Added index to props
}

function LetterCell(props: LetterCellProps) {
  return props.button ? (
    <li>
      <button
        onClick={() => {
          props.changeVisibility && props.changeVisibility(props.index);
        }}
        value={props.letter}
        className={classes.listItemButton}
      >
        {props.letter}
      </button>
    </li>
  ) : (
    <li className={classes.listItem}>
      {props.visible ? props.letter : <>&#x200b;&#x200b;</>}
    </li>
  );
}

export default LetterCell;

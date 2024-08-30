import React from "react";
import classes from "./WordDisplay.module.scss";

interface LetterCellProps {
  readonly letter: string;
  readonly isVisible?: boolean;
  readonly button?: boolean;
  changeVisibility?: (id: string) => void;
  id: string;
}

function LetterCell(props: LetterCellProps) {
  return props.button ? (
    <li>
      <button
        onClick={() => {
          props.changeVisibility && props.changeVisibility(props.id);
        }}
        value={props.letter}
        className={classes.listItemButton}
      >
        {props.letter}
      </button>
    </li>
  ) : (
    <li className={classes.listItem}>
      {props.isVisible ? props.letter : <>‎ ‎</>}
    </li>
  );
}

export default LetterCell;

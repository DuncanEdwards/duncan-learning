import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  main: {
    color: "blue",
    margin: "10px",
  },
  button: {
    background: "red",
    border: "solid 1px black",
  },
});

export const NameBadge = () => {
  const { main, button } = useStyles();
  return (
    <div>
      <h1>This is a badge</h1>
      <div className={main}>This is a description</div>
      <button className={button}>Press me</button>
    </div>
  );
};

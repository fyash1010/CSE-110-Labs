import { useContext, useState } from "react";
import { ThemeContext, themes } from "./ThemeContext";

function ToggleTheme() {
  const { toggleTheme } = useContext(ThemeContext);

  return <button onClick={toggleTheme}>Switch Theme</button>;
}

export default ToggleTheme;


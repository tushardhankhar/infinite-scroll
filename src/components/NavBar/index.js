import React, { useContext } from "react";
import { ThemeContext } from "../../context/themeContext";
import { DarkThemeLogo, LightThemeLogo } from "../../assests";

export default function NavBar() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div>
      {theme === "light" ? (
        <img
          id="theme-logo"
          src={LightThemeLogo}
          alt="img"
          onClick={() => setTheme("dark")}
        />
      ) : (
        <img
          id="theme-logo"
          src={DarkThemeLogo}
          alt="img"
          onClick={() => setTheme("light")}
        />
      )}
    </div>
  );
}

import "./App.css";
import Books from "./components/Book";
import { ThemeContext } from "./context/themeContext";
import NavBar from "./components/NavBar";
import { useContext } from "react";

function App() {
  const { theme } = useContext(ThemeContext);
  return (
      <div className={`App ${theme === "light" ? "light" : "dark"}`}>
        <NavBar />
        <Books />
      </div>
  );
}

export default App;

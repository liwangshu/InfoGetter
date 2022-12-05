import Weather from "./Weather";
import { useTheme } from "../context/ThemeContext";

function Container() {
  const { theme } = useTheme();
  return (
    <main className={`${theme}`} id="container_main">
      <div className={`container2 ${theme}`}>
        <Weather />
      </div>
      <footer></footer>
    </main>
  );
}

export default Container;

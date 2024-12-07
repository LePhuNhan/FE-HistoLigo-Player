import { useState, createContext } from "react";

const DarkModeContext = createContext();
function DarkModeProvider({ children }) {
  const [flag, setFlag] = useState(() => {
    const savedFlag = localStorage.getItem("flag");
    return savedFlag ? JSON.parse(savedFlag) : false;
  });
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  const toggleTheme = () => {
    const newTheme = !theme;
    setTheme(newTheme);
    localStorage.setItem("theme", JSON.stringify(newTheme));
  };

  const value = {
    theme,
    toggleTheme,
  };

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  );
}

export { DarkModeContext, DarkModeProvider };

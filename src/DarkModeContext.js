import { useState, createContext } from "react";

const DarkModeContext = createContext();
function DarkModeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Check for theme in localStorage, default to 'false' if not found
    return JSON.parse(localStorage.getItem("theme")) || false;
  });

  const toggleTheme = () => {
    const newTheme = !theme;
    setTheme(newTheme);
    // Lưu theme vào localStorage
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

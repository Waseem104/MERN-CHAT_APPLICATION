import { THEMES } from "../constants/Themes";
import { useThemeStore } from "../store/useThemeStore";
import { useState, useEffect } from "react";

const Settings = () => {
  const { theme, setTheme } = useThemeStore();
  const [selectedTheme, setSelectedTheme] = useState(theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", selectedTheme);
  }, [selectedTheme]);

  const handleThemeChange = (t) => {
    setSelectedTheme(t);
    setTheme(t);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 p-4">
      <div className="w-full md:w-3/5 lg:w-2/5 p-4 bg-base-100 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Select Theme</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {Object.keys(THEMES).map((t) => (
            <button
              key={t}
              onClick={() => handleThemeChange(THEMES[t])}
              className={`p-2 rounded-lg ${
                selectedTheme === THEMES[t]
                  ? "bg-base-200"
                  : "hover:bg-base-200/50"
              }`}
            >
              <div data-theme={THEMES[t]} className="p-2 rounded-lg">
                <div className="flex space-x-2">
                  <div className="w-6 h-6 rounded bg-primary"></div>
                  <div className="w-6 h-6 rounded bg-secondary"></div>
                  <div className="w-6 h-6 rounded bg-accent"></div>
                  <div className="w-6 h-6 rounded bg-neutral"></div>
                </div>
              </div>
              <span className="block mt-2 text-center">
                {THEMES[t].charAt(0).toUpperCase() + THEMES[t].slice(1)}
              </span>
            </button>
          ))}
        </div>
        <h2 className="text-xl font-semibold mb-4 text-center">
          Theme Preview
        </h2>
        <div
          data-theme={selectedTheme}
          className="p-4 rounded-lg bg-base-100 shadow-inner"
        >
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-primary relative">
                <p className="absolute top-1.5 left-4 font-bold">j</p>
              </div>
              <div className="flex-1 p-2 rounded-lg bg-secondary text-white">
                This is a preview of the {selectedTheme} theme.
              </div>
            </div>
            <div className="flex items-center space-x-2 justify-end">
              <div className="flex-1 p-2 rounded-lg bg-accent text-white">
                Looks great!
              </div>
              <div className="w-10 h-10 rounded-full bg-neutral relative">
                <p className="absolute top-1.5 right-3.5 font-bold">A</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getDetails } from "../Services/Api";
import {
  DEFAULT_THEME_STATE,
  mapApiDataToForm,
  mergeThemeState as composeThemeState,
  applyThemeToRoot,
  THEME_SETTINGS_ROUTE,
} from "../Config/themeSettings";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(DEFAULT_THEME_STATE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const applyAndStoreTheme = useCallback((incoming, options) => {
    const resolved = composeThemeState(incoming, options);
    setTheme(resolved);
    applyThemeToRoot(resolved);
    return resolved;
  }, []);

  const refreshTheme = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getDetails(THEME_SETTINGS_ROUTE);
      const payload =
        response?.data?.themeSettings ||
        response?.data?.data ||
        response?.data ||
        response ||
        {};
      const mapped = mapApiDataToForm(payload);
      const resolved = applyAndStoreTheme(mapped);
      setError(null);
      return resolved;
    } catch (err) {
      console.error("Failed to refresh theme settings", err);
      const fallback = applyAndStoreTheme({}, { includeCssDefaults: true });
      setError(err);
      return fallback;
    } finally {
      setLoading(false);
    }
  }, [applyAndStoreTheme]);

  const updateTheme = useCallback(
    (nextTheme) => applyAndStoreTheme(nextTheme, { includeCssDefaults: false }),
    [applyAndStoreTheme]
  );

  useEffect(() => {
    applyThemeToRoot(DEFAULT_THEME_STATE);
  }, []);

  useEffect(() => {
    refreshTheme();
  }, [refreshTheme]);

  const value = useMemo(
    () => ({ theme, loading, error, refreshTheme, updateTheme }),
    [theme, loading, error, refreshTheme, updateTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useThemeSettings = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeSettings must be used within a ThemeProvider");
  }
  return context;
};

export default ThemeContext;

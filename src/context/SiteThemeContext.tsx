import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type SiteTimeTheme = "morning" | "afternoon" | "night";

const SiteThemeContext = createContext<{
  theme: SiteTimeTheme;
  setTheme: (t: SiteTimeTheme) => void;
} | null>(null);

export function SiteThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<SiteTimeTheme>("morning");
  const setTheme = useCallback((t: SiteTimeTheme) => {
    setThemeState(t);
  }, []);

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  return (
    <SiteThemeContext.Provider value={value}>
      {children}
    </SiteThemeContext.Provider>
  );
}

export function useSiteTheme() {
  const ctx = useContext(SiteThemeContext);
  if (!ctx) {
    throw new Error("useSiteTheme must be used within SiteThemeProvider");
  }
  return ctx;
}

export function siteThemeToEmbla(
  t: SiteTimeTheme,
): "day" | "evening" | "night" {
  if (t === "morning") return "day";
  if (t === "afternoon") return "evening";
  return "night";
}

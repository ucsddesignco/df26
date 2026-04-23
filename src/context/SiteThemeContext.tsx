import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

export type SiteTimeTheme = "morning" | "afternoon" | "night";

/** Single source of truth for the theme toggle: moon → night, flower → morning, leaf → afternoon (evening UI). */
export const THEME_TOGGLE_OPTIONS = [
  { mode: "moon" as const, theme: "night" as const, label: "Night mode" },
  { mode: "flower" as const, theme: "morning" as const, label: "Morning mode" },
  { mode: "leaf" as const, theme: "afternoon" as const, label: "Afternoon mode" },
] as const;

export type ThemeToggleMode = (typeof THEME_TOGGLE_OPTIONS)[number]["mode"];

/** Hero train body stripes: morning (flower), afternoon / leaf (evening), night (moon). */
export const TRAIN_STRIPE_FILL: Record<SiteTimeTheme, string> = {
  morning: "#AEB032",
  afternoon: "#FA9025",
  night: "#5A8CD3",
};

/** Hero section backdrop (matches theme toggle). */
export const HERO_SECTION_BG: Record<SiteTimeTheme, string> = {
  morning: "#F8CABA",
  afternoon: "#C4E8EF",
  night: "#C8B2C1",
};

/** Tint inside `public/assets/grain.svg` (replaces `#E17490` at runtime). */
export const HERO_GRAIN_TINT: Record<SiteTimeTheme, string> = {
  morning: "#E17490",
  afternoon: "#55B6E1",
  night: "#6777B5",
};

/** HeroBoard column headers (flower / leaf / moon). */
export const COLUMN_HEADER_COLOR: Record<SiteTimeTheme, string> = {
  morning: "#989713",
  afternoon: "#FA9025",
  night: "#BFD3EB",
};

/** Station26 icon ellipse accent. */
export const STATION_ACCENT_FILL: Record<SiteTimeTheme, string> = {
  morning: "#989713",
  afternoon: "#F27E08",
  night: "#5A8CD3",
};

/** Agenda timeline line + marker colors (two columns). */
export const AGENDA_LINE_COLORS: Record<
  SiteTimeTheme,
  { day1: string; day2: string }
> = {
  morning: { day1: "#ED9699", day2: "#989713" },
  afternoon: { day1: "#AEB032", day2: "#F27E08" },
  night: { day1: "#E8CE8A", day2: "#5A8CD3" },
};

/** CSS custom properties for theme colors (set on `.site-theme-root`). Enables smooth transitions via `site-theme-paint-transition`. */
export function siteThemeCssVariables(theme: SiteTimeTheme): CSSProperties {
  const agenda = AGENDA_LINE_COLORS[theme];
  return {
    "--site-hero-bg": HERO_SECTION_BG[theme],
    "--site-train-stripe": TRAIN_STRIPE_FILL[theme],
    "--site-column-header": COLUMN_HEADER_COLOR[theme],
    "--site-station-accent": STATION_ACCENT_FILL[theme],
    "--site-agenda-day1": agenda.day1,
    "--site-agenda-day2": agenda.day2,
  } as CSSProperties;
}

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
  const themeVars = useMemo(() => siteThemeCssVariables(theme), [theme]);

  return (
    <SiteThemeContext.Provider value={value}>
      <div className="site-theme-root" data-site-theme={theme} style={themeVars}>
        {children}
      </div>
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

/** Opacity crossfade for theme-swapped illustrations (pass to Framer Motion `transition`). */
export function themeIllustrationCrossfadeTransition(
  prefersReducedMotion: boolean | null,
) {
  if (prefersReducedMotion) return { duration: 0 };
  return { duration: 0.38, ease: [0.4, 0, 0.2, 1] as const };
}

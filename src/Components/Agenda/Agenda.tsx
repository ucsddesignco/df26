import { useEffect, useState, type ReactNode } from "react";
import "./Agenda.scss";

/* =========================
   IMPORT YOUR ASSETS
   ========================= */

// Decoration images
import morningImg from "../../assets/agenda-assets/Sunrise-ticket-train.png";
import afternoonImg from "../../assets/agenda-assets/day-image.png";
import nightImg from "../../assets/agenda-assets/sunset-image.png";

/* =========================
   THEME LOGIC
   ========================= */

type Theme = "morning" | "afternoon" | "night";

function getThemeByTime(): Theme {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 18) return "afternoon";
  return "night";
}

type ThemeStyle = {
  day1Color: string;
  day2Color: string;
  image: string;
};

/* Colors pulled directly from Figma Dev Mode */
const themeStyles: Record<Theme, ThemeStyle> = {
  morning: {
    day1Color: "#ED9699", // pink
    day2Color: "#989713", // olive
    image: morningImg,
  },
  afternoon: {
    day1Color: "#AEB032", //light green
    day2Color: "#F27E08", //orange
    image: afternoonImg,
  },
  night: {
    day1Color: "#E8CE8A", //yellow
    day2Color: "#5A8CD3", //blue
    image: nightImg, 
  },
};

function useTimeTheme() {
  const [theme, setTheme] = useState<Theme>(getThemeByTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTheme(getThemeByTime());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return themeStyles[theme];
}

/* =========================
   DATA
   ========================= */

type AgendaItem = {
  time: string;
  title: string;
};

const dayOne: AgendaItem[] = [
  { time: "2:00 PM PT", title: "Kickoff + Lightning Talk" },
  { time: "3:00 PM PT", title: "Prompt Reveal + Work Time" },
  { time: "5:00 PM PT", title: "Day 1 Closing" },
];

const dayTwo: AgendaItem[] = [
  { time: "10:30 AM PT", title: "Check-in + Work Time" },
  { time: "1:00 PM PT", title: "Submissions Due" },
  { time: "2:00 PM PT", title: "Finalists Revealed" },
  { time: "2:30 PM PT", title: "Finalist Presentations" },
  { time: "3:30 PM PT", title: "Closing Ceremony" },
];

/* =========================
   COLUMN COMPONENT
   ========================= */

type AgendaColumnProps = {
  dayLabel: string;
  dateLabel: string;
  items: AgendaItem[];
  lineColor: string;
  children?: ReactNode;
};

function AgendaColumn({
  dayLabel,
  dateLabel,
  items,
  lineColor,
  children,
}: AgendaColumnProps) {
  const last = items.length - 1;

  return (
    <div className="agenda-column">
      <div className="agenda-header">
        <span className="agenda-header__day">{dayLabel}</span>
        <span className="agenda-header__date">{dateLabel}</span>
      </div>

      <div className="agenda-timeline-wrapper">
        {/* Solid colored line behind the markers */}
        <span
          className="agenda-line"
          style={{ background: lineColor }}
          aria-hidden="true"
        />

        <ol className="agenda-timeline">
          {items.map((item, i) => {
            const isTerminal = i === 0 || i === last;
            const borderColor = isTerminal ? "#2B2B23" : lineColor;

            return (
              <li key={i} className="agenda-row">
                <div className="agenda-marker-wrapper">
                  <span
                    className="agenda-marker"
                    style={{ borderColor }}
                  />
                </div>

                <div className="agenda-item">
                  <p className="agenda-time">{item.time}</p>
                  <h3 className="agenda-title">{item.title}</h3>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {children}
    </div>
  );
}

/* =========================
   MAIN COMPONENT
   ========================= */

type MobileTab = "day1" | "day2";

/* =========================
   🧪 DEV MODE THEME SWITCHER
   Set to false to use real time-of-day detection.
   Set to true to show the theme toggle buttons for testing.
   ========================= */
const DEV_THEME_SWITCHER = true;

export default function Agenda() {
  const autoTheme = getThemeByTime();
  const [overrideTheme, setOverrideTheme] = useState<Theme | "auto">("auto");
  const activeTheme: Theme = overrideTheme === "auto" ? autoTheme : overrideTheme;
  const theme = themeStyles[activeTheme];

  const [activeTab, setActiveTab] = useState<MobileTab>("day1");

  return (
    <section className="agenda-section">
      {/* 🧪 DEV MODE: theme switcher — delete this block when you're done testing */}
      {DEV_THEME_SWITCHER && (
        <div
          style={{
            display: "flex",
            gap: "8px",
            marginBottom: "16px",
            padding: "8px 12px",
            background: "#fff3cd",
            border: "1px dashed #856404",
            borderRadius: "4px",
            fontSize: "13px",
            fontFamily: "system-ui, sans-serif",
            alignItems: "center",
          }}
        >
          <strong style={{ marginRight: "8px" }}>🧪 Theme:</strong>
          {(["auto", "morning", "afternoon", "night"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setOverrideTheme(t)}
              style={{
                padding: "4px 10px",
                border: "1px solid #856404",
                background:
                  overrideTheme === t ? "#856404" : "transparent",
                color: overrideTheme === t ? "white" : "#856404",
                borderRadius: "3px",
                cursor: "pointer",
                fontSize: "12px",
                textTransform: "capitalize",
              }}
            >
              {t}
            </button>
          ))}
          <span style={{ marginLeft: "auto", color: "#856404" }}>
            Auto detects: <strong>{autoTheme}</strong> (current hour:{" "}
            {new Date().getHours()})
          </span>
        </div>
      )}

      {/* SVG filter for rough/hand-drawn edges.
          Applied to the line and markers via CSS: filter: url(#agenda-roughen).
          Hidden visually but available to reference. */}
      <svg
        width="0"
        height="0"
        style={{ position: "absolute" }}
        aria-hidden="true"
      >
        <defs>
          <filter id="agenda-roughen">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04"
              numOctaves="2"
              seed="3"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="5"
            />
          </filter>
        </defs>
      </svg>

      <h2 className="agenda-section-title">Agenda</h2>

      {/* Mobile tabs — hidden on desktop via CSS */}
      <div className="agenda-tabs" role="tablist" aria-label="Agenda days">
        <button
          role="tab"
          aria-selected={activeTab === "day1"}
          className={`agenda-tab ${activeTab === "day1" ? "is-active" : ""}`}
          onClick={() => setActiveTab("day1")}
        >
          Day One
        </button>
        <button
          role="tab"
          aria-selected={activeTab === "day2"}
          className={`agenda-tab ${activeTab === "day2" ? "is-active" : ""}`}
          onClick={() => setActiveTab("day2")}
        >
          Day Two
        </button>
      </div>

      <div className="agenda-grid">
        <div
          className={`agenda-panel ${
            activeTab === "day1" ? "is-visible" : ""
          }`}
        >
          <AgendaColumn
            dayLabel="Day One"
            dateLabel="SAT, MAY 9"
            items={dayOne}
            lineColor={theme.day1Color}
          >
            <img className="agenda-decoration" src={theme.image} alt="" />
          </AgendaColumn>
        </div>

        <div
          className={`agenda-panel ${
            activeTab === "day2" ? "is-visible" : ""
          }`}
        >
          <AgendaColumn
            dayLabel="Day Two"
            dateLabel="SUN, MAY 10"
            items={dayTwo}
            lineColor={theme.day2Color}
          />
        </div>
      </div>
    </section>
  );
}
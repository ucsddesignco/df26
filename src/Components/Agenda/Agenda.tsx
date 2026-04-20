import { useEffect, useState, type ReactNode } from "react";
import "./Agenda.scss";


// Decoration images — one per time-of-day theme
import morningImg from "../../assets/agenda-assets/Sunrise-ticket-train.png";
import afternoonImg from "../../assets/agenda-assets/day-image.png";
import nightImg from "../../assets/agenda-assets/sunset-image.png";

// theme change - depending on the time of day
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

//color changes for the lines depending on the time of day
const themeStyles: Record<Theme, ThemeStyle> = {
  morning: {
    day1Color: "#ED9699", // pink
    day2Color: "#989713", // olive
    image: morningImg,
  },
  afternoon: {
    day1Color: "#AEB032", // light green
    day2Color: "#F27E08", // orange
    image: afternoonImg,
  },
  night: {
    day1Color: "#E8CE8A", // yellow
    day2Color: "#5A8CD3", // blue
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

// actual schedule for DF, can be added on to
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

// columns yay
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
        {/* color of the actual lines */}
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

//main component 
type MobileTab = "day1" | "day2";

export default function Agenda() {
  const theme = useTimeTheme();
  const [activeTab, setActiveTab] = useState<MobileTab>("day1");

  return (
    <section className="agenda-section">
      <svg
        width="0"
        height="0"
        style={{ position: "absolute" }}
        aria-hidden="true"
      >
        <defs>
          <filter id="agenda-roughen">
             {/* this is the texture for the lines  */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.15"
              numOctaves="4"
              seed="4"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="2"
            />
          </filter>
          {/* Grainy texture for the header - softer than the lines one*/}
          <filter id="agenda-roughen-soft">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="2"
              seed="7"
              result="noise"
            />
            <feColorMatrix
              in="noise"
              type="matrix"
              values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0.35 0"
              result="noiseAlpha"
            />
            <feComposite
              in="noiseAlpha"
              in2="SourceGraphic"
              operator="in"
              result="grain"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="1.2"
              result="roughEdges"
            />
            <feMerge>
              <feMergeNode in="roughEdges" />
              <feMergeNode in="grain" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      <h2 className="agenda-section-title">Agenda</h2>

      {/* tab logic for the mobile and tablet view*/}
      <div className="agenda-tabs" role="tablist" aria-label="Agenda days">
        <button
          role="tab"
          aria-selected={activeTab === "day1"}
          className={`agenda-tab ${activeTab === "day1" ? "is-active" : ""}`}
          onClick={() => setActiveTab("day1")}
        >
          <span className="agenda-tab__day">Day One</span>
          <span className="agenda-tab__date">SAT, MAY 9</span>
        </button>
        <button
          role="tab"
          aria-selected={activeTab === "day2"}
          className={`agenda-tab ${activeTab === "day2" ? "is-active" : ""}`}
          onClick={() => setActiveTab("day2")}
        >
          <span className="agenda-tab__day">Day Two</span>
          <span className="agenda-tab__date">SUN, MAY 10</span>
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
            {/* image for mobile/tablet view*/}
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
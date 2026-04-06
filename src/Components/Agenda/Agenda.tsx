import type { ReactNode } from "react";
import "./Agenda.scss";

type AgendaItem = {
  time: string;
  title: string;
  dash?: boolean;
};

const dayOne: AgendaItem[] = [
  { time: "2:00 PM PT", title: "Event Kickoff" },
  { time: "4:00 AM PT", title: "Event Kickoff" },
  { time: "6:00 PM PT", title: "Event Kickoff" },
];

const dayTwo: AgendaItem[] = [
  { time: "10:00 AM PT", title: "Check-in" },
  { time: "12:30 PM PT", title: "Sprint Continues", dash: true },
  { time: "1:00 PM PT", title: "Sprint Ends" },
  { time: "2:00 PM PT", title: "Finalists Revealed" },
  { time: "2:00 PM PT", title: "Closing Ceremony" },
];

type AgendaColumnProps = {
  dayLabel: string;
  dateLabel: string;
  items: AgendaItem[];
  variant: "day-one" | "day-two";
  children?: ReactNode;
};

function markerClass(index: number, last: number): string {
  const base = "agenda-marker";
  if (index === 0 || index === last) {
    return `${base} ${base}--terminal`;
  }
  return `${base} ${base}--middle`;
}

function AgendaColumn({
  dayLabel,
  dateLabel,
  items,
  variant,
  children,
}: AgendaColumnProps) {
  const last = items.length - 1;

  return (
    <div className={`agenda-column agenda-column--${variant}`}>
      <div className="agenda-header">
        <span className="agenda-header__day">{dayLabel}</span>
        <span className="agenda-header__date">{dateLabel}</span>
      </div>

      <ol className="agenda-timeline">
        {items.map((item, index) => (
          <li
            key={`${item.time}-${item.title}-${index}`}
            className={
              item.dash
                ? "agenda-timeline__row agenda-timeline__row--dash"
                : "agenda-timeline__row"
            }
          >
            <div className="agenda-timeline__track" aria-hidden>
              <span className={markerClass(index, last)} />
            </div>
            <div className="agenda-item">
              <p className="agenda-time">{item.time}</p>
              <h3 className="agenda-title">{item.title}</h3>
            </div>
          </li>
        ))}
      </ol>

      {children}
    </div>
  );
}

export default function Agenda() {
  return (
    <section className="agenda-section" aria-labelledby="agenda-heading">
      <div className="agenda-section__grain" aria-hidden />

      <div className="agenda-section__inner">
        <p className="agenda-section-eyebrow">Agenda</p>
        <h2 id="agenda-heading" className="agenda-section-title">
          Agenda
        </h2>

        <div className="agenda-grid">
          <AgendaColumn
            dayLabel="Day One"
            dateLabel="SAT, MAY 9"
            items={dayOne}
            variant="day-one"
          >
            <img
              className="agenda-decoration"
              src="/agenda-ticket-train.png"
              alt=""
              width={560}
              height={400}
              decoding="async"
            />
          </AgendaColumn>
          <AgendaColumn
            dayLabel="Day Two"
            dateLabel="SUN, MAY 10"
            items={dayTwo}
            variant="day-two"
          />
        </div>
      </div>
    </section>
  );
}

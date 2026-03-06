import "./Agenda.css";

type AgendaItem = {
  time: string;
  title: string;
};

const dayOne: AgendaItem[] = [
  { time: "10:00 AM PT", title: "Doors Open" },
  { time: "11:30 AM PT", title: "Illumina Talk" },
  { time: "1:00 PM PT", title: "AOPS Talk" },
  { time: "2:00 PM PT", title: "Doors Close" },
];

const dayTwo: AgendaItem[] = [
  { time: "10:00 AM PT", title: "Work Time" },
  { time: "12:30 PM PT", title: "Submissions Due" },
  { time: "1:00 PM PT", title: "Judge Panel" },
  { time: "2:00 PM PT", title: "Closing Ceremony" },
];

type AgendaColumnProps = {
  dayLabel: string;
  dateLabel: string;
  items: AgendaItem[];
};

function AgendaColumn({
  dayLabel,
  dateLabel,
  items,
}: AgendaColumnProps) {
  return (
    <div className="agenda-column">
      <div className="agenda-header">
        <span>{dayLabel}</span>
        <span>{dateLabel}</span>
      </div>

      {items.map((item) => (
        <div key={`${item.time}-${item.title}`} className="agenda-item">
          <p className="agenda-time">{item.time}</p>
          <h3 className="agenda-title">{item.title}</h3>
        </div>
      ))}
    </div>
  );
}

export default function Agenda() {
  return (
    <section className="agenda-section">
      <h2 className="agenda-section-title">Agenda</h2>

      <div className="agenda-grid">
        <AgendaColumn
          dayLabel="Day One"
          dateLabel="SAT, MAY 3"
          items={dayOne}
        />
        <AgendaColumn
          dayLabel="Day Two"
          dateLabel="SUN, MAY 4"
          items={dayTwo}
        />
      </div>
    </section>
  );
}
import { useId, useState } from "react";
import "./FAQ.scss";

const faqData = [
  {
    id: "1",
    question: "Who can participate?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas nec consequat ipsum, non porta velit. In rhoncus odio leo, sed venenatis augue eleifend vel.",
  },
  {
    id: "2",
    question: "What's in it for me?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas nec consequat ipsum, non porta velit. In rhoncus odio leo, sed venenatis augue eleifend vel.",
  },
  {
    id: "3",
    question: "What will the event look like?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas nec consequat ipsum, non porta velit. In rhoncus odio leo, sed venenatis augue eleifend vel.",
  },
  {
    id: "4",
    question: "When is the deadline to register?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas nec consequat ipsum, non porta velit. In rhoncus odio leo, sed venenatis augue eleifend vel.",
  },
];

export default function FAQ() {
  const baseId = useId();
  const [expanded, setExpanded] = useState<string | false>(false);

  return (
    <div className="container">
      <p className="title">FAQ</p>
      <div className="faq">
        {faqData.map((item) => {
          const isOpen = expanded === item.id;
          const panelId = `${baseId}-panel-${item.id}`;

          return (
            <div key={item.id} className="faq__item">
              <button
                type="button"
                className="faq__question"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setExpanded(isOpen ? false : item.id)}
              >
                {item.question}
                <span
                  className={`faq__icon ${isOpen ? "faq__icon--open" : ""}`}
                  aria-hidden
                >
                  <span className="faq__icon-horizontal" />
                  <span className="faq__icon-vertical" />
                </span>
              </button>
              {isOpen ? (
                <div id={panelId} className="faq__answer" role="region">
                  {item.answer}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

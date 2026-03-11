import { useState } from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion, { type AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  type AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
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

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  background: "none",
  "&::before": { display: "none" },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary {...props} />
))(() => ({
  padding: 0,
  background: "none",
  "& .MuiAccordionSummary-content": {
    margin: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(() => ({
  padding: 0,
}));

export default function FAQ() {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <div className="container">
      <p className="title">FAQ</p>
      <div className="faq">
        {faqData.map((item) => (
          <Accordion
            key={item.id}
            expanded={expanded === item.id}
            onChange={handleChange(item.id)}
            className="faq__item"
          >
            <AccordionSummary className="faq__question">
              {item.question}
              <span
                className={`faq__icon ${expanded === item.id ? "faq__icon--open" : ""}`}
              >
                <span className="faq__icon-horizontal" />
                <span className="faq__icon-vertical" />
              </span>
            </AccordionSummary>
            <AccordionDetails className="faq__answer">
              {item.answer}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
}
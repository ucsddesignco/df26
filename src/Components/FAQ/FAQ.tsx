import { useState } from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion, { type AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  type AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Sticker from "../Sticker/Sticker";
import type { ThemeType } from "../../types/theme";
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
  // hard coded theme FOR NOW - will update with shamita's implementation
  const [currentTheme] = useState<ThemeType>("sunrise-sunset");

  return (
    <div className="container">
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
 
      <div className="faq-wrapper">
        <Sticker theme={currentTheme} className="sticker-1" />
        <Sticker theme={currentTheme} className="sticker-2" />
        <Sticker theme={currentTheme} className="sticker-3" />
        <Sticker theme={currentTheme} className="sticker-4" />
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
    </div>
  );
}

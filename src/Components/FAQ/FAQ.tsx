import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { styled } from "@mui/material/styles";
import MuiAccordion, { type AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  type AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import {
  themeIllustrationCrossfadeTransition,
  useSiteTheme,
} from "../../context/SiteThemeContext";
import { faqStickers } from "./assets/FaqStickers";
import "./FAQ.scss";

const faqData = [
  {
    id: "1",
    question: "Who can participate?",
    answer:
      "UCSD students of all levels and backgrounds are encouraged to apply! Teams are not assigned, so we encourage you to form your own groups in advance. Design teams can consist of up to four members.",
  },
  {
    id: "2",
    question: "What's in it for me?",
    answer:
      "Design Frontiers is a fast-paced, immersive design sprint that simulates real-world product design practice. You’ll gain hands-on experience working through the iterative design process, learn how teams move from idea to solution, and build practical skills in collaboration, problem-solving, and rapid prototyping.",
  },
  {
    id: "3",
    question: "What will the event look like?",
    answer:
      "Design Frontiers will be split over the course of two days. The event kicks off Saturday afternoon with lightning talks, prompt reveal, and the start of the design sprint. On Sunday, teams will continue working before presenting to the judges panel. The event will conclude with finalist presentations and a closing ceremony.",
  },
  {
    id: "4",
    question: "When is the deadline to register?",
    answer:
      "April 30th at 11:59 PM. Space is limited to 80 participants, so we recommend signing up early. Waitlisted students are not guaranteed a spot, but we will keep you updated if there are any openings!",
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
  const { theme } = useSiteTheme();
  const reduceMotion = useReducedMotion();
  const stickerCrossfade = themeIllustrationCrossfadeTransition(reduceMotion);
  const [expanded, setExpanded] = useState<string | false>(false);
  const [disableTexture, setDisableTexture] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;
    const isSafari = /Safari/i.test(ua) && !/(Chrome|Chromium|CriOS|Edg|OPR)/i.test(ua);
    setDisableTexture(Boolean(reduceMotion) || isSafari);
  }, [reduceMotion]);

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
  return (
    <div id="faq" className="container">
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
              baseFrequency="0.10"
              numOctaves="3"
              seed="4"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="0.5"
            />
          </filter>
          
        </defs>
      </svg>
 
      <div className="faq-wrapper">
        {faqStickers.map((sticker) => (
          <div
            key={sticker.id}
            className={`${sticker.className} ${sticker.className}--${theme}`}
          >
            <div className="faq-sticker__crossfade">
              <AnimatePresence initial={false} mode="sync">
                <motion.div
                  key={theme}
                  className="faq-sticker__crossfade-inner"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={stickerCrossfade}
                >
                  {sticker.contentByTheme[theme]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        ))}
        <p className="title">FAQ</p>
        <div className={`faq ${disableTexture ? "faq--no-texture" : ""}`}>
          {faqData.map((item) => {
            const isExpanded = expanded === item.id;
            return (
              <Accordion
                key={item.id}
                expanded={isExpanded}
                onChange={handleChange(item.id)}
                className="faq__item"
              >
                <AccordionSummary className="faq__question">
                  {item.question}
                  <motion.span
                    className={`faq__icon ${isExpanded ? "faq__icon--open" : ""}`}
                    initial={false}
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={
                      reduceMotion ? { duration: 0 } : { duration: 0.14, ease: "easeOut" }
                    }
                  >
                    <span className="faq__icon-horizontal" />
                    <motion.span
                      className="faq__icon-vertical"
                      initial={false}
                      animate={{
                        scaleY: isExpanded ? 0 : 1,
                        opacity: isExpanded ? 0 : 1,
                      }}
                      style={{ transformOrigin: "50% 50%" }}
                      transition={
                        reduceMotion ? { duration: 0 } : { duration: 0.12, ease: "easeOut" }
                      }
                    />
                  </motion.span>
                </AccordionSummary>
                <AccordionDetails className="faq__answer">
                  {item.answer}
                </AccordionDetails>
              </Accordion>
            );
          })}
        </div>
      </div>
    </div>
  );
}

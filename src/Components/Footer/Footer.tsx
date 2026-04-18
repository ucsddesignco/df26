import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Footer.scss";
// import Button from "../Button/Button";
// import DCoArrow from "../../SVGS/DCoArrow";
import { RightDoor } from "./assets/RightDoor";
import { LeftDoor } from "./assets/LeftDoor";
import TrainWall from "./assets/TrainWall";
import type { ThemeType } from "../../types/theme";
import Backdrop from "./assets/Backdrop";
import { FooterButton } from "./assets/FooterButton";

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme] = useState<ThemeType>("sunrise-sunset");

  return (
    <footer>
      <div className="banner-wrapper">
        <div className="banner" onClick={() => setIsOpen(!isOpen)}>
          <TrainWall side="left" theme={currentTheme} />
          <TrainWall side="right" theme={currentTheme} />
          <div className="container">
            {/* Left Door Wrapper */}
            <motion.div
              className="door-wrapper left"
              initial={false}
              // Starts at -100% (immediately left of the center line)
              // Slides further left to open
              animate={{ x: isOpen ? "-117%" : "-49%" }}
              transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
            >
              <LeftDoor theme={currentTheme} />
            </motion.div>

            {/* RIGHT DOOR */}
            <motion.div
              className="door-wrapper right"
              initial={false}
              // Starts at 0% (immediately right of the center line)
              // Slides right to open
              animate={{ x: isOpen ? "117%" : "49%" }}
              transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
            >
              <RightDoor theme={currentTheme} />
            </motion.div>

            <AnimatePresence>
              {isOpen && (
                <motion.button
                  className="footerbutton"
                  key="footer-button"
                  initial={{ opacity: 0, x: "-50%", y: "-50%" }} // Start state
                  animate={{ opacity: 1, x: "-50%", y: "-50%" }} // Active state
                  exit={{ opacity: 0 }} // State when isOpen becomes false
                  transition={{ duration: 0.3 }} // Timing
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="footer-button2">
                    <FooterButton />
                  </div>
                </motion.button>
              )}
            </AnimatePresence>
            <div className="backdrop">
              <Backdrop theme={currentTheme} />
            </div>
          </div>
        </div>
      </div>
      <div className="footer-text">
        <p>Made with &lt;3 by Design Co</p>
        <p>Winter 2026</p>
      </div>
    </footer>
  );
}

import { useState } from "react";
import { motion } from "framer-motion";
import "./Footer.scss";
import Button from "../Button/Button";
import DCoArrow from "../../SVGS/DCoArrow";
import { RightDoor } from "./assets/RightDoor";
import { LeftDoor } from "./assets/LeftDoor";
import TrainWall from "./assets/TrainWall";
import type { ThemeType } from "../../types/theme";
import Backdrop from "./assets/Backdrop";

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme] = useState<ThemeType>("night");

  return (
    <footer>
      <div className="banner-wrapper">
        <div className="banner" onClick={() => setIsOpen(!isOpen)}>
          <div className="backdrop">
            <Backdrop theme={currentTheme} />
          </div>
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

            {/* <h1>Secure Your Spot!</h1>
          <Button
            text="Register"
            icon={<DCoArrow />}
            className="register-button"
          ></Button> */}
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

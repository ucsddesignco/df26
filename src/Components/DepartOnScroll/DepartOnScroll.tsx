import './DepartOnScroll.scss'
import { useState, useRef } from "react";
import { motion, useScroll, useMotionValueEvent, useTransform, type Variants } from "framer-motion";

interface DepartOnScrollProps {
  children: React.ReactNode;
}

type TrainState = "offscreen" | "entering" | "parked" | "leaving" | "gone" | "arriving";

export default function DepartOnScroll({ children }: DepartOnScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [trainState, setTrainState] = useState<TrainState>("entering");

  const isBrowser = typeof window !== "undefined";
  const triggerPoint = isBrowser ? window.innerHeight * 0.386 : 400;

  const parallaxAmount = isBrowser ? window.innerWidth * 0.2 : 50;

  const { scrollY } = useScroll(); // Scroll sensor
  const parallaxX = useTransform(scrollY, [0, triggerPoint], [0, parallaxAmount]); // parallax-scroll

  useMotionValueEvent(scrollY, "change", (latestScroll) => {
    const triggerPoint = window.innerHeight * 0.386;

    const previousScroll = scrollY.getPrevious() || 0;
    const isScrollingDown = latestScroll > previousScroll;

    if (isScrollingDown && latestScroll > triggerPoint) {
      if (trainState == "parked") {
        setTrainState("leaving");
      }
    }

    if (latestScroll < triggerPoint) {
      if (trainState == "gone") {
        setTrainState("arriving");
      }
    }
  });

  // Train Keyframes
  const trainVariants : Variants = {
    offscreen: {
      x: '-140%',
    },
    entering: {
      x: '-81.3%',
      transition: { duration: 1.2, delay: 1, ease: "easeInOut" }, 
    },
    parked: {
      x: '-81.3%',
    },
    leaving: {
      x: '120%',
      transition: { duration: 1.5, ease: "easeInOut" },
    },
    gone: {
      x: '-140%',
      transition: { duration: 0 },
    },
    arriving: {
      x: '-81.3%',
      transition: { duration: 1.2, ease: "easeInOut" },
    },
  };

  return (
    <div ref={containerRef} className='motion'>
      <motion.div style={{ x: parallaxX }}>
        <motion.div
          variants={trainVariants}
          initial="offscreen"
          animate={trainState}
          style={{ willChange: "transform" }}
          onAnimationComplete={(completedVariant) => {
            if (completedVariant === "entering") {
              setTrainState("parked");
            }
            if (completedVariant === "leaving") {
              setTrainState("gone");
            }
            if (completedVariant === "arriving") {
              setTrainState("parked");
            }
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
import './DepartOnScroll.scss'
import { useState, useRef } from "react";
import { motion, useScroll, useMotionValueEvent, type Variants } from "framer-motion";

interface DepartOnScrollProps {
  children: React.ReactNode;
}

type TrainState = "parked" | "leaving" | "gone" | "arriving";

export default function DepartOnScroll({ children }: DepartOnScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [trainState, setTrainState] = useState<TrainState>("parked");

  const { scrollY } = useScroll(); // Scroll sensor

  useMotionValueEvent(scrollY, "change", (latestScroll) => {
    const triggerPoint = window.innerHeight * 0.45;

    const previousScroll = scrollY.getPrevious() || 0;
    const isScrollingUp = latestScroll < previousScroll;
    const isScrollingDown = latestScroll > previousScroll;

    if (isScrollingDown && latestScroll > triggerPoint) {
      if (trainState == "parked") {
        setTrainState("leaving");
      }
    }

    if (isScrollingUp && latestScroll < triggerPoint) {
      if (trainState == "gone") {
        setTrainState("arriving");
      }
    }
  });

  // Train Keyframes
  const trainVariants : Variants = {
    parked: {
      x: '-172%',
    },
    leaving: {
      x: '120vw',
      transition: { duration: 1.2, ease: "easeInOut" },
    },
    gone: {
      x: '-200%',
      transition: { duration: 0 },
    },
    arriving: {
      x: '-172%',
      transition: { duration: 1.2, ease: "easeInOut" },
    },
  };

  return (
    <div ref={containerRef} className='motion'>
      <motion.div
        variants={trainVariants}
        initial="parked"
        animate={trainState}
        style={{ willChange: "transform" }}
        onAnimationComplete={(completedVariant) => {
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
    </div>
  );
}
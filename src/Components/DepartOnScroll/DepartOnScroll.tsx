import './DepartOnScroll.scss'
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, useTransform, type Variants } from "framer-motion";

interface DepartOnScrollProps {
  children: React.ReactNode;
}

type TrainState = "offscreen" | "entering" | "parked" | "leaving" | "gone" | "arriving";

/** Helper function that uses Linear Interpolation (lerp) to continuously map
 * the window width to a percentage */
function mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  const clampedValue = Math.min(Math.max(value, inMin), inMax);
  return ((clampedValue - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

export default function DepartOnScroll({ children }: DepartOnScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [trainState, setTrainState] = useState<TrainState>("entering");

  const isBrowser = typeof window !== "undefined";
  const triggerPoint = isBrowser ? window.innerHeight * 0.386 : 400;
  const parallaxAmount = isBrowser ? window.innerWidth * 0.2 : 50;
  const [windowWidth, setWindowWidth] = useState(isBrowser ? window.innerWidth : 1280);

  // Handles updating the window width state when the screen size changes
  useEffect(() => {
    if (!isBrowser) return;
    
    const handleResize = () => setWindowWidth(window.innerWidth); 
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, [isBrowser]);

  const { scrollY } = useScroll(); // Scroll sensor
  const parallaxX = useTransform(scrollY, [0, triggerPoint], [0, parallaxAmount]); // parallax-scroll

  useMotionValueEvent(scrollY, "change", (latestScroll) => {
    const triggerPoint = window.innerHeight * 0.386; // Trigger point

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


  const getResponsivePositions = (width: number) => {
    let parkedPosition = "-98%"; // Default Desktop
    let offscreenPosition = "-160%"; // Default Desktop

    if (width <= 743) {
      // Mobile: As window grows from 390 to 743, smoothly scale x from -35% to -50%
      const fluidPark = mapRange(width, 390, 743, -197, -103);
      const fluidOff = mapRange(width, 390, 743, -270, -155)
      parkedPosition = `${fluidPark}%`;
      offscreenPosition = `${fluidOff}%`;
    } else if (width <= 1279) {
      // Tablet: As window grows from 744 to 1279, smoothly scale x from -50% to -75%
      const fluidPark = mapRange(width, 744, 1279, -142, -83);
      const fluidOff = mapRange(width, 744, 1279, -200, -125);
      parkedPosition = `${fluidPark}%`;
      offscreenPosition = `${fluidOff}%`;
    }

    return { parkedPosition, offscreenPosition };
  }
  // Train Keyframes
  const trainVariants : Variants = {
    offscreen: (width: number) => ({
      x: getResponsivePositions(width).offscreenPosition,
    }),
    entering: (width: number) => ({
      x: getResponsivePositions(width).parkedPosition,
      transition: { duration: 1.2, delay: 1, ease: "easeInOut" },
    }),
    parked: (width: number) => ({
      x: getResponsivePositions(width).parkedPosition,
    }),
    leaving: {
      x: '120%',
      transition: { duration: 1.5, ease: "easeInOut" },
    },
    gone: (width: number) => ({
      x: getResponsivePositions(width).offscreenPosition,
      transition: { duration: 0 },
    }),
    arriving: (width: number) => ({
      x: getResponsivePositions(width).parkedPosition,
      transition: { duration: 1.2, ease: "easeInOut" },
    }),
  };

  return (
    <div ref={containerRef} className='motion'>
      <motion.div style={{ x: parallaxX }}>
        <motion.div
          variants={trainVariants}
          initial="offscreen"
          animate={trainState}
          custom={windowWidth}
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
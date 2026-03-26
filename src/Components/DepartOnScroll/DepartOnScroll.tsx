import './DepartOnScroll.scss'
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useInView, TransformInputRange } from "framer-motion";

interface DepartOnScrollProps {
  children: React.ReactNode;
}

type TrainState = "parked" | "leaving" | "gone" | "arriving";

export default function DepartOnScroll({ children }: DepartOnScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [TrainState, setTrainState] = useState<TrainState>("parked");

  return (
    <div ref={containerRef} className='motion'>
      {children} 
    </div>
  );
}
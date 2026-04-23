
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import "./Caraousel.scss"
import { Judge1 } from "./../../SVGS/Judges/Judge1"
import { Judge2 } from "./../../SVGS/Judges/Judge2"
import { Judge3 } from "./../../SVGS/Judges/Judge3"
import { Judge4 } from "./../../SVGS/Judges/Judge4"
import { Judge5 } from "./../../SVGS/Judges/Judge5"
import { BigFlower } from "./Themes/BigFlower"
import { BigLeaf } from "./Themes/Bigleaf"
import { BigStar } from "./Themes/BigStar"
import { themeIllustrationCrossfadeTransition } from "../../context/SiteThemeContext"



type EmblaCarouselTheme = "day" | "evening" | "night"

type EmblaCarouselProps = {
  theme?: EmblaCarouselTheme
}

function EmblaSlideThemeDecor({
  theme,
  themeClassName,
}: {
  theme: EmblaCarouselTheme
  themeClassName: string
}) {
  const reduceMotion = useReducedMotion()
  const t = themeIllustrationCrossfadeTransition(reduceMotion)
  const decor =
    theme === "day" ? (
      <BigFlower className={themeClassName} />
    ) : theme === "evening" ? (
      <BigLeaf className={themeClassName} />
    ) : (
      <BigStar className={themeClassName} />
    )

  return (
    <div className="embla__slideThemeDecorMount">
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={theme}
          className="embla__slideThemeDecorMotion"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={t}
        >
          {decor}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export const EmblaCarousel = ({ theme = "day" }: EmblaCarouselProps) => {
  const reduceMotion = useReducedMotion()
  const themeClassName =
    theme === "day"
      ? "embla__themeIcon--day"
      : theme === "evening"
        ? "embla__themeIcon--evening"
        : "embla__themeIcon--night"

  const slides = useMemo(
    () => [
      <Judge1 key="j1" href="https://www.linkedin.com/in/jiamingjessyli/" ariaLabel="Jessy Li Profile" />,
      <Judge2 key="j2" href="https://www.linkedin.com/in/wyemunchin/" ariaLabel="Wye Mun Chin Profile" />,
      <Judge3 key="j3" href="https://www.linkedin.com/in/rheaacharyadesign/" ariaLabel="Rhea Acharya Profile" />,
      <Judge4 key="j4" href="https://www.linkedin.com/in/rinatakikawa/" ariaLabel="Rina Takikawa Profile" />,
      <Judge5 key="j5" href="https://www.linkedin.com/in/jarenz/" ariaLabel="Jarenz Castillo Profile" />,
    ],
    [],
  )

  // Auto-scroll + drag (infinite wrap) ---------------------------------------
  const setARef = useRef<HTMLDivElement | null>(null)
  const loopWidthRef = useRef(0)
  const isDraggingRef = useRef(false)
  const x = useMotionValue(0)

  // Tune speed here. (px/sec)
  const AUTO_PX_PER_SEC = reduceMotion ? 0 : 32

  useEffect(() => {
    const measure = () => {
      const w = setARef.current?.offsetWidth ?? 0
      loopWidthRef.current = w
    }

    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  useAnimationFrame((_, deltaMs) => {
    if (isDraggingRef.current) return
    const loopW = loopWidthRef.current
    if (!loopW) return

    const deltaPx = (AUTO_PX_PER_SEC * deltaMs) / 1000
    const next = x.get() - deltaPx

    // Wrap into [-loopW, 0)
    let wrapped = next
    while (wrapped <= -loopW) wrapped += loopW
    while (wrapped > 0) wrapped -= loopW
    x.set(wrapped)
  })

  return (
    <div className="embla" data-theme={theme}>
      <div className="judges-loop">
        <motion.div
          className="judges-loop__track"
          style={{ x }}
          drag="x"
          dragElastic={0.08}
          dragMomentum={true}
          onDragStart={() => {
            isDraggingRef.current = true
          }}
          onDragEnd={() => {
            isDraggingRef.current = false
            // Snap x back into the wrapped range after a momentum fling.
            const loopW = loopWidthRef.current
            if (!loopW) return
            let v = x.get()
            while (v <= -loopW) v += loopW
            while (v > 0) v -= loopW
            x.set(v)
          }}
        >
          {/* Render two identical sets for seamless looping */}
          <div ref={setARef} className="judges-loop__set" aria-hidden="false">
            {slides.map((judge, idx) => (
              <div key={`a-${idx}`} className="embla__slide">
                {judge}
                <EmblaSlideThemeDecor theme={theme} themeClassName={themeClassName} />
              </div>
            ))}
          </div>
          <div className="judges-loop__set" aria-hidden="true">
            {slides.map((judge, idx) => (
              <div key={`b-${idx}`} className="embla__slide">
                {judge}
                <EmblaSlideThemeDecor theme={theme} themeClassName={themeClassName} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

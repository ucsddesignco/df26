
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import useEmblaCarousel from 'embla-carousel-react'
import "./Caraousel.scss"
import {Judge1 }from "./../../SVGS/Judges/Judge1"
import {Judge2 }from "./../../SVGS/Judges/Judge2"
import {Judge3 }from "./../../SVGS/Judges/Judge3"
import {Judge4 }from "./../../SVGS/Judges/Judge4"
import {Judge5 }from "./../../SVGS/Judges/Judge5"
import {BigFlower }from "./Themes/BigFlower"
import {BigLeaf }from "./Themes/Bigleaf"
import {BigStar }from "./Themes/BigStar"
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
  const [emblaRef] = useEmblaCarousel()

  const themeClassName =
    theme === "day"
      ? "embla__themeIcon--day"
      : theme === "evening"
        ? "embla__themeIcon--evening"
        : "embla__themeIcon--night"

  return (
    <div className="embla" data-theme={theme}>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          <div className="embla__slide">
            <Judge1 href="https://www.linkedin.com/in/jiamingjessyli/" ariaLabel="Jessy Li Profile" />
            <EmblaSlideThemeDecor theme={theme} themeClassName={themeClassName} />
          </div>
          <div className="embla__slide">
            <Judge2 href="https://www.linkedin.com/in/wyemunchin/" ariaLabel="Wye Mun Chin Profile" />
            <EmblaSlideThemeDecor theme={theme} themeClassName={themeClassName} />
          </div>
          <div className="embla__slide">
            <Judge3 href="https://www.linkedin.com/in/rheaacharyadesign/" ariaLabel="Rhea Acharya Profile" />
            <EmblaSlideThemeDecor theme={theme} themeClassName={themeClassName} />
          </div>
          <div className="embla__slide">
            <Judge4 href="https://www.linkedin.com/in/rinatakikawa/" ariaLabel="Rina Takikawa Profile" />
            <EmblaSlideThemeDecor theme={theme} themeClassName={themeClassName} />
          </div>
          <div className="embla__slide">
            <Judge5 href="https://www.linkedin.com/in/jarenz/" ariaLabel="Jarenz Castillo Profile" />
            <EmblaSlideThemeDecor theme={theme} themeClassName={themeClassName} />
          </div>
        </div>
      </div>
    </div>
  )
}

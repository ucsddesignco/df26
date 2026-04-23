import { useEffect, useRef, useState, type ComponentType } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  HERO_GRAIN_TINT,
  themeIllustrationCrossfadeTransition,
  type SiteTimeTheme,
  useSiteTheme,
} from "../../context/SiteThemeContext";
import "./Hero.scss";
import HeroBoard from "../HeroBoard/HeroBoard";
import TrainTrack from "../../SVGS/TrainTrack";
import BigTrainSVG from "../../SVGS/Train/BigTrainSVG";
import MedTrainSVG from "../../SVGS/Train/MedTrainSVG";
import SmallTrainSVG from "../../SVGS/Train/SmallTrainSVG";
import DepartOnScroll from "../DepartOnScroll/DepartOnScroll";
import CloudGenerator from "../CloudGenerator/CloudGenerator";
import BigFlower from "../../SVGS/Flower/BigFlower";
import MedFlower from "../../SVGS/Flower/MedFlower";
import SmallFlower from "../../SVGS/Flower/SmallFlower";
import { LargeLeaf } from "../../SVGS/Leaf/LargeLeaf";
import { MediumLeaf } from "../../SVGS/Leaf/MediumLeaf";
import { SmallLeaf } from "../../SVGS/Leaf/SmallLeaf";
import { LargeStar } from "../../SVGS/Star/LargeStar";
import { MediumStar } from "../../SVGS/Star/MediumStar";
import { SmallStar } from "../../SVGS/Star/SmallStar";
import { Moon } from "../../SVGS/Star/Moon/Moon";

type HeroSideDecorSvg = ComponentType<{ className?: string }>;

/** matches toggle: flower → morning, leaf → afternoon, moon → night. */
const HERO_SIDE_DECOR: Record<
  SiteTimeTheme,
  { large: HeroSideDecorSvg; medium: HeroSideDecorSvg; small: HeroSideDecorSvg }
> = {
  morning: { large: BigFlower, medium: MedFlower, small: SmallFlower },
  afternoon: { large: LargeLeaf, medium: MediumLeaf, small: SmallLeaf },
  night: { large: LargeStar, medium: MediumStar, small: SmallStar },
};

export default function Hero() {
  const { theme } = useSiteTheme();
  const reduceMotion = useReducedMotion();
  const decorCrossfade = themeIllustrationCrossfadeTransition(reduceMotion);
  const { large: DecorLarge, medium: DecorMedium, small: DecorSmall } =
    HERO_SIDE_DECOR[theme];
  const [grainBgUrl, setGrainBgUrl] = useState("/assets/grain.svg");
  const [grainOpacity, setGrainOpacity] = useState(1);
  const rawSvgRef = useRef<string | null>(null);
  const grainBlobRef = useRef<string | null>(null);
  /** Avoid dimming grain on initial load; only crossfade when theme changes after first tint. */
  const grainHasTintedOnceRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    if (grainHasTintedOnceRef.current) setGrainOpacity(0);

    const applyTint = (raw: string) => {
      if (cancelled) return;
      const tinted = raw.replace(/#E17490/gi, HERO_GRAIN_TINT[theme]);
      const next = URL.createObjectURL(
        new Blob([tinted], { type: "image/svg+xml;charset=utf-8" }),
      );
      if (grainBlobRef.current) URL.revokeObjectURL(grainBlobRef.current);
      grainBlobRef.current = next;
      setGrainBgUrl(next);
      requestAnimationFrame(() => {
        if (!cancelled) {
          setGrainOpacity(1);
          grainHasTintedOnceRef.current = true;
        }
      });
    };

    if (rawSvgRef.current) {
      applyTint(rawSvgRef.current);
    } else {
      fetch("/assets/grain.svg")
        .then((r) => r.text())
        .then((text) => {
          if (cancelled) return;
          rawSvgRef.current = text;
          applyTint(text);
        });
    }

    return () => {
      cancelled = true;
    };
  }, [theme]);

  useEffect(
    () => () => {
      if (grainBlobRef.current) {
        URL.revokeObjectURL(grainBlobRef.current);
        grainBlobRef.current = null;
      }
    },
    [],
  );

  return (
    <section id="hero">
      <div
        className="hero-section site-theme-paint-transition"
        style={{ backgroundColor: "var(--site-hero-bg)" }}
      >
        <div
          className="hero-section__grain site-theme-paint-transition"
          style={{
            backgroundImage: `url("${grainBgUrl}")`,
            opacity: grainOpacity,
          }}
          aria-hidden
        />
        <AnimatePresence initial={false} mode="sync">
          {theme === "night" ? (
            <motion.div
              key="hero-moon"
              className="hero-section__moon"
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={decorCrossfade}
            >
              <Moon />
            </motion.div>
          ) : null}
        </AnimatePresence>
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={theme}
            className="left-flowers"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={decorCrossfade}
          >
            <DecorLarge className="left1" />
            <DecorMedium className="left2" />
            <DecorSmall className="left3" />
            <DecorSmall className="left4" />
          </motion.div>
        </AnimatePresence>
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={theme}
            className="right-flowers"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={decorCrossfade}
          >
            <DecorLarge className="right1" />
            <DecorMedium className="right2" />
            <DecorSmall className="right3" />
            <DecorSmall className="right4" />
          </motion.div>
        </AnimatePresence>
        <CloudGenerator />
        <div className="hero-board">
          <HeroBoard/>
        </div>
        <DepartOnScroll>
          <div className="train-wrapper big-train">
            <BigTrainSVG />
          </div>
          <div className="train-wrapper med-train">
            <MedTrainSVG />
          </div>
          <div className="train-wrapper small-train">
            <SmallTrainSVG />
          </div>
        </DepartOnScroll>
        <div className="train-track">
          <TrainTrack/>
        </div>
      </div>
    </section>
  );
}

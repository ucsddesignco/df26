import type { ReactNode } from "react";
import type { ThemeType } from "../../../types/theme";
import { FaqBottomLeftSunriseSunset } from "./FaqBottomLeftSunriseSunset";
import { FaqBottomLeftAfternoon } from "./FaqBottomLeftAfternoon";
import { FaqBottomLeftNight } from "./FaqBottomLeftNight";
import { FaqTopRightSunriseSunset } from "./FaqTopRightSunriseSunset";
import { FaqTopRightAfternoon } from "./FaqTopRightAfternoon";
import { FaqTopRightNight } from "./FaqTopRightNight";
import { FaqBottomRightSunriseSunset } from "./FaqBottomRightSunriseSunset";
import { FaqBottomRightAfternoon } from "./FaqBottomRightAfternoon";
import { FaqBottomRightNight } from "./FaqBottomRightNight";

export type FaqStickerSlot =
  | "bottom-left"
  | "top-right"
  | "bottom-right";

export interface FaqStickerConfig {
  id: FaqStickerSlot;
  className: string;
  contentByTheme: Record<ThemeType, ReactNode>;
}

const faqBottomLeftByTheme: Record<ThemeType, ReactNode> = {
  "sunrise-sunset": <FaqBottomLeftSunriseSunset />,
  afternoon: <FaqBottomLeftAfternoon />,
  night: <FaqBottomLeftNight />,
};

const faqTopRightByTheme: Record<ThemeType, ReactNode> = {
  "sunrise-sunset": <FaqTopRightSunriseSunset />,
  afternoon: <FaqTopRightAfternoon />,
  night: <FaqTopRightNight />,
};

const faqBottomRightByTheme: Record<ThemeType, ReactNode> = {
  "sunrise-sunset": <FaqBottomRightSunriseSunset />,
  afternoon: <FaqBottomRightAfternoon />,
  night: <FaqBottomRightNight />,
};

export const faqStickers: FaqStickerConfig[] = [
  {
    id: "bottom-left",
    className: "faq-sticker faq-sticker--bottom-left",
    contentByTheme: faqBottomLeftByTheme,
  },
  {
    id: "top-right",
    className: "faq-sticker faq-sticker--top-right",
    contentByTheme: faqTopRightByTheme,
  },
  {
    id: "bottom-right",
    className: "faq-sticker faq-sticker--bottom-right",
    contentByTheme: faqBottomRightByTheme,
  },
];

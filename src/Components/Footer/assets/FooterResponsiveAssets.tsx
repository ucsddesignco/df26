import { LeftDoor } from "./LeftDoor";
import { RightDoor } from "./RightDoor";
import TrainWall from "./TrainWall";
import Backdrop from "./Backdrop";
import { FooterButton } from "./FooterButton";
import tabletFooterButton from "./tablet-footer-button.svg";
import tabletTrainwallLeft from "./tablet-trainwall-left.svg";
import tabletTrainwallRight from "./tablet-trainwall-right.svg";
import tabletTrainwallLeftAfternoon from "./tablet-trainwall-left-afternoon.svg";
import tabletTrainwallLeftNight from "./tablet-trainwall-left-night.svg";
import tabletTrainwallRightAfternoon from "./tablet-trainwall-right-afternoon.svg";
import tabletTrainwallRightNight from "./tablet-trainwall-right-night.svg";
import tabletBackdropSunriseSunset from "./tablet-backdrop-sunrise-sunset.svg";
import tabletBackdropAfternoon from "./tablet-backdrop-afternoon.svg";
import tabletBackdropNight from "./tablet-backdrop-night.svg";
import mobileTrainwallLeft from "./mobile-trainwall-left.svg";
import mobileTrainwallRight from "./mobile-trainwall-right.svg";
import mobileTrainwallLeftAfternoon from "./mobile-trainwall-left-afternoon.svg";
import mobileTrainwallLeftNight from "./mobile-trainwall-left-night.svg";
import mobileTrainwallRightAfternoon from "./mobile-trainwall-right-afternoon.svg";
import mobileTrainwallRightNight from "./mobile-trainwall-right-night.svg";
import mobileLeftDoor from "./mobile-left-door.svg";
import mobileRightDoor from "./mobile-right-door.svg";
import mobileLeftDoorAfternoon from "./mobile-left-door-afternoon.svg";
import mobileLeftDoorNight from "./mobile-left-door-night.svg";
import mobileRightDoorAfternoon from "./mobile-right-door-afternoon.svg";
import mobileRightDoorNight from "./mobile-right-door-night.svg";
import mobileFooterButton from "./mobile-footer-button.svg";
import mobileBackdropSunriseSunset from "../mobile-backdrop-sunrise-sunset.svg";
import mobileBackdropAfternoon from "../mobile-backdrop-afternoon.svg";
import mobileBackdropNight from "../mobile-backdrop-night.svg";
import type { CSSProperties } from "react";
import type { ThemeType } from "../../../types/theme";

export type FooterBreakpoint = "desktop" | "tablet" | "mobile";

interface ResponsiveAssetProps {
  breakpoint: FooterBreakpoint;
  theme: ThemeType;
}

interface ResponsiveTrainWallProps extends ResponsiveAssetProps {
  side: "left" | "right";
  style?: CSSProperties;
}

interface ResponsiveDoorProps extends ResponsiveAssetProps {
  className?: string;
}

const windowStrokeColors: Record<ThemeType, string> = {
  "sunrise-sunset": "#AEB032",
  afternoon: "#FA9025",
  night: "#5A8CD3",
};

const tabletTrainwallByTheme: Record<ThemeType, Record<"left" | "right", string>> = {
  "sunrise-sunset": { left: tabletTrainwallLeft, right: tabletTrainwallRight },
  afternoon: { left: tabletTrainwallLeftAfternoon, right: tabletTrainwallRightAfternoon },
  night: { left: tabletTrainwallLeftNight, right: tabletTrainwallRightNight },
};

const mobileTrainwallByTheme: Record<ThemeType, Record<"left" | "right", string>> = {
  "sunrise-sunset": { left: mobileTrainwallLeft, right: mobileTrainwallRight },
  afternoon: { left: mobileTrainwallLeftAfternoon, right: mobileTrainwallRightAfternoon },
  night: { left: mobileTrainwallLeftNight, right: mobileTrainwallRightNight },
};

const tabletBackdropByTheme: Record<ThemeType, string> = {
  "sunrise-sunset": tabletBackdropSunriseSunset,
  afternoon: tabletBackdropAfternoon,
  night: tabletBackdropNight,
};

const mobileBackdropByTheme: Record<ThemeType, string> = {
  "sunrise-sunset": mobileBackdropSunriseSunset,
  afternoon: mobileBackdropAfternoon,
  night: mobileBackdropNight,
};

const mobileDoorByTheme: Record<ThemeType, Record<"left" | "right", string>> = {
  "sunrise-sunset": { left: mobileLeftDoor, right: mobileRightDoor },
  afternoon: { left: mobileLeftDoorAfternoon, right: mobileRightDoorAfternoon },
  night: { left: mobileLeftDoorNight, right: mobileRightDoorNight },
};

export function ResponsiveTrainWall({ side, breakpoint, theme, style }: ResponsiveTrainWallProps) {
  if (breakpoint === "desktop") {
    return <TrainWall side={side} theme={theme} />;
  }

  if (breakpoint === "tablet") {
    return (
      <div className={`wall wall--${side} wall--tablet`} style={style}>
        <img src={tabletTrainwallByTheme[theme][side]} alt={`Tablet train wall ${side}`} />
      </div>
    );
  }

  return (
    <div className={`wall wall--${side} wall--mobile`} style={style}>
      <img src={mobileTrainwallByTheme[theme][side]} alt={`Mobile train wall ${side}`} />
    </div>
  );
}

export function ResponsiveLeftDoor({ breakpoint, theme, className }: ResponsiveDoorProps) {
  if (breakpoint === "desktop") {
    return <LeftDoor theme={theme} className={className} />;
  }

  if (breakpoint === "tablet") {
    return (
      <div className={className}>
        <svg width="321" height="715" viewBox="0 0 321 715" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_gn_2343_9434)">
            <path
              d="M19.3174 4.2041H301.227C309.573 4.2041 316.339 10.9709 316.339 19.3174V695.318C316.339 703.665 309.573 710.432 301.227 710.432H19.3174C10.9709 710.432 4.2041 703.665 4.2041 695.318V19.3174C4.2041 10.9709 10.9709 4.2041 19.3174 4.2041ZM163.469 185.992C151.27 185.992 141.381 195.881 141.381 208.08V383.593C141.381 395.791 151.27 405.68 163.469 405.68H258.992C271.191 405.68 281.08 395.791 281.08 383.593V208.08C281.08 195.881 271.191 185.992 258.992 185.992H163.469Z"
              fill="#F3EAE3"
              stroke="#2B2B23"
              strokeWidth="6.97508"
            />
            <rect
              x="134.407"
              y="179.164"
              width="153.452"
              height="233.084"
              rx="29.1064"
              stroke={windowStrokeColors[theme]}
              strokeWidth="8.1376"
            />
            <g clipPath="url(#clip0_2343_9434)">
              <rect x="247.171" y="308.785" width="21.9857" height="86.477" fill="#FFFCF3" />
              <rect x="241.991" y="304.715" width="33.7129" height="18.6002" fill="#FFA141" />
              <path
                d="M256.965 329.441C257.641 328.268 259.334 328.268 260.011 329.441L264.708 337.576C265.384 338.748 264.538 340.214 263.184 340.214H253.791C252.437 340.214 251.591 338.748 252.268 337.576L256.965 329.441Z"
                fill="#FD4C4C"
              />
              <circle
                cx="258.499"
                cy="351.524"
                r="5.12999"
                fill="#FFFCF3"
                stroke="#FD4C4C"
                strokeWidth="2.34514"
              />
              <circle
                cx="258.488"
                cy="368.576"
                r="5.12999"
                fill="#FD4C4C"
                stroke="#FD4C4C"
                strokeWidth="2.34514"
              />
            </g>
          </g>
          <defs>
            <filter
              id="filter0_gn_2343_9434"
              x="-0.000104725"
              y="-0.000104725"
              width="320.545"
              height="714.637"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.41026225686073303 0.41026225686073303"
                numOctaves={3}
                seed={5210}
              />
              <feDisplacementMap
                in="shape"
                scale="1.4338032007217407"
                xChannelSelector="R"
                yChannelSelector="G"
                result="displacedImage"
                width="100%"
                height="100%"
              />
              <feMerge result="effect1_texture_2343_9434">
                <feMergeNode in="displacedImage" />
              </feMerge>
              <feTurbulence
                type="fractalNoise"
                baseFrequency="1.8598555326461792 1.8598555326461792"
                stitchTiles="stitch"
                numOctaves={3}
                result="noise"
                seed={3550}
              />
              <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
              <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                <feFuncA type="discrete" tableValues="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 " />
              </feComponentTransfer>
              <feComposite operator="in" in2="effect1_texture_2343_9434" in="coloredNoise1" result="noise1Clipped" />
              <feFlood floodColor="#F1EBE5" result="color1Flood" />
              <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1" />
              <feMerge result="effect2_noise_2343_9434">
                <feMergeNode in="effect1_texture_2343_9434" />
                <feMergeNode in="color1" />
              </feMerge>
            </filter>
            <clipPath id="clip0_2343_9434">
              <rect x="247.171" y="308.784" width="22.0878" height="76.1446" rx="2.32503" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    );
  }

  return (
    <div className={className}>
      <img src={mobileDoorByTheme[theme].left} alt="Mobile left door" />
    </div>
  );
}

export function ResponsiveRightDoor({ breakpoint, theme, className }: ResponsiveDoorProps) {
  if (breakpoint === "desktop") {
    return <RightDoor theme={theme} className={className} />;
  }

  if (breakpoint === "tablet") {
    return (
      <div className={className}>
        <svg width="321" height="715" viewBox="0 0 321 715" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(321 0) scale(-1 1)">
            <g filter="url(#filter0_gn_2343_9434_right)">
              <path
                d="M19.3174 4.2041H301.227C309.573 4.2041 316.339 10.9709 316.339 19.3174V695.318C316.339 703.665 309.573 710.432 301.227 710.432H19.3174C10.9709 710.432 4.2041 703.665 4.2041 695.318V19.3174C4.2041 10.9709 10.9709 4.2041 19.3174 4.2041ZM163.469 185.992C151.27 185.992 141.381 195.881 141.381 208.08V383.593C141.381 395.791 151.27 405.68 163.469 405.68H258.992C271.191 405.68 281.08 395.791 281.08 383.593V208.08C281.08 195.881 271.191 185.992 258.992 185.992H163.469Z"
                fill="#F3EAE3"
                stroke="#2B2B23"
                strokeWidth="6.97508"
              />
              <rect
                x="134.407"
                y="179.164"
                width="153.452"
                height="233.084"
                rx="29.1064"
                stroke={windowStrokeColors[theme]}
                strokeWidth="8.1376"
              />
              <g clipPath="url(#clip0_2343_9434_right)">
                <rect x="247.171" y="308.785" width="21.9857" height="86.477" fill="#FFFCF3" />
                <rect x="241.991" y="304.715" width="33.7129" height="18.6002" fill="#FFA141" />
                <path
                  d="M256.965 329.441C257.641 328.268 259.334 328.268 260.011 329.441L264.708 337.576C265.384 338.748 264.538 340.214 263.184 340.214H253.791C252.437 340.214 251.591 338.748 252.268 337.576L256.965 329.441Z"
                  fill="#FD4C4C"
                />
                <circle
                  cx="258.499"
                  cy="351.524"
                  r="5.12999"
                  fill="#FFFCF3"
                  stroke="#FD4C4C"
                  strokeWidth="2.34514"
                />
                <circle
                  cx="258.488"
                  cy="368.576"
                  r="5.12999"
                  fill="#FD4C4C"
                  stroke="#FD4C4C"
                  strokeWidth="2.34514"
                />
              </g>
            </g>
          </g>
          <defs>
            <filter
              id="filter0_gn_2343_9434_right"
              x="-0.000104725"
              y="-0.000104725"
              width="320.545"
              height="714.637"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.41026225686073303 0.41026225686073303"
                numOctaves={3}
                seed={5210}
              />
              <feDisplacementMap
                in="shape"
                scale="1.4338032007217407"
                xChannelSelector="R"
                yChannelSelector="G"
                result="displacedImage"
                width="100%"
                height="100%"
              />
              <feMerge result="effect1_texture_2343_9434_right">
                <feMergeNode in="displacedImage" />
              </feMerge>
              <feTurbulence
                type="fractalNoise"
                baseFrequency="1.8598555326461792 1.8598555326461792"
                stitchTiles="stitch"
                numOctaves={3}
                result="noise"
                seed={3550}
              />
              <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
              <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                <feFuncA type="discrete" tableValues="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 " />
              </feComponentTransfer>
              <feComposite operator="in" in2="effect1_texture_2343_9434_right" in="coloredNoise1" result="noise1Clipped" />
              <feFlood floodColor="#F1EBE5" result="color1Flood" />
              <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1" />
              <feMerge result="effect2_noise_2343_9434_right">
                <feMergeNode in="effect1_texture_2343_9434_right" />
                <feMergeNode in="color1" />
              </feMerge>
            </filter>
            <clipPath id="clip0_2343_9434_right">
              <rect x="247.171" y="308.784" width="22.0878" height="76.1446" rx="2.32503" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    );
  }

  return (
    <div className={className}>
      <img src={mobileDoorByTheme[theme].right} alt="Mobile right door" />
    </div>
  );
}

export function ResponsiveBackdrop({ breakpoint, theme }: ResponsiveAssetProps) {
  if (breakpoint === "desktop") {
    return <Backdrop theme={theme} />;
  }

  if (breakpoint === "tablet") {
    return (
      <div className="backdrop-svg-wrapper">
        <img src={tabletBackdropByTheme[theme]} alt="Tablet backdrop" />
      </div>
    );
  }

  return (
    <div className="backdrop-svg-wrapper">
      <img src={mobileBackdropByTheme[theme]} alt="Mobile backdrop" />
    </div>
  );
}

export function ResponsiveFooterButton({ breakpoint }: { breakpoint: FooterBreakpoint }) {
  if (breakpoint === "desktop") {
    return <FooterButton />;
  }

  if (breakpoint === "tablet") {
    return (
      <div className="footer-button-svg-wrapper">
        <img src={tabletFooterButton} alt="Register button" />
      </div>
    );
  }

  return (
    <div className="footer-button-svg-wrapper">
      <img src={mobileFooterButton} alt="Mobile register button" />
    </div>
  );
}

import { type ThemeType } from "../../../types/theme";
import { forwardRef } from "react";

interface DoorProps {
  theme: ThemeType;
  className?: string;
}

export const RightDoor = forwardRef<SVGSVGElement, DoorProps>(
  ({ theme, className }, ref) => {
    const windowStrokeColors: Record<ThemeType, string> = {
      "sunrise-sunset": "#AEB032",
      afternoon: "#FA9025",
      night: "#5A8CD3",
    };

    return (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 552 1230"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        ref={ref}
        preserveAspectRatio="xMinYMax meet"
      >
        <g filter="url(#filter_right_door)">
          {/* Main Door Path - Mirrored coordinates */}
          <path
            d="M518.767 7.2334L33.7666 7.2334C19.4072 7.2334 7.7666 18.874 7.7666 33.2334V1196.23C7.7666 1210.59 19.4072 1222.23 33.7666 1222.23L518.767 1222.23C533.126 1222.23 544.767 1210.59 544.767 1196.23V33.2334C544.767 18.874 533.126 7.2334 518.767 7.2334ZM270.767 319.983C291.753 319.983 308.767 336.997 308.767 357.983V659.937C308.766 680.923 291.753 697.937 270.767 697.937H106.427C85.4404 697.937 68.427 680.923 68.427 659.937V357.983C68.427 336.997 85.4404 319.983 106.427 319.983H270.767Z"
            fill="#F3EAE3"
            stroke="#2B2B23"
            strokeWidth="12"
          />
          {/* Window Frame */}
          <rect
            x="56.767"
            y="308.233"
            width="264"
            height="401"
            rx="50.0749"
            stroke={windowStrokeColors[theme]}
            strokeWidth="14"
          />
          {/* Door Handle / Detail Group */}
          <g clipPath="url(#clip_right_door)">
            {/* <rect
              x="88.767"
              y="531.234"
              width="37.8244"
              height="148.776"
              fill="#FFFCF3"
            />
            <rect
              x="79.855"
              y="524.233"
              width="58"
              height="32"
              fill="#FFA141"
            />
            <path
              d="M105.617 566.772C106.781 564.755 109.693 564.755 110.858 566.772L118.938 580.767C120.102 582.785 118.647 585.306 116.317 585.306H100.157C97.828 585.306 96.372 582.785 97.537 580.767L105.617 566.772Z"
              fill="#FD4C4C"
            />
            <circle
              cx="108.256"
              cy="604.764"
              r="8.82569"
              fill="#FFFCF3"
              stroke="#FD4C4C"
              strokeWidth="4.0346"
            />
            <circle
              cx="108.237"
              cy="634.1"
              r="8.82569"
              fill="#FD4C4C"
              stroke="#FD4C4C"
              strokeWidth="4.0346"
            /> */}
          </g>
        </g>
        <defs>
          <filter
            id="filter_right_door"
            x="0"
            y="0"
            width="552"
            height="1230"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.238467738032341 0.238467738032341"
              numOctaves="3"
              seed="5210"
            />
            <feDisplacementMap
              in="shape"
              scale="2.4667291641235352"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displacedImage"
            />
            <feMerge result="effect1_texture">
              <feMergeNode in="displacedImage" />
            </feMerge>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="1.0810537338256836 1.0810537338256836"
              stitchTiles="stitch"
              numOctaves="3"
              result="noise"
              seed="3550"
            />
            <feColorMatrix
              in="noise"
              type="luminanceToAlpha"
              result="alphaNoise"
            />
            <feComponentTransfer in="alphaNoise" result="coloredNoise1">
              <feFuncA
                type="discrete"
                tableValues="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"
              />
            </feComponentTransfer>
            <feComposite
              operator="in"
              in2="effect1_texture"
              in="coloredNoise1"
              result="noise1Clipped"
            />
            <feFlood floodColor="#F1EBE5" result="color1Flood" />
            <feComposite
              operator="in"
              in2="noise1Clipped"
              in="color1Flood"
              result="color1"
            />
            <feMerge result="effect2_noise">
              <feMergeNode in="effect1_texture" />
              <feMergeNode in="color1" />
            </feMerge>
          </filter>
          <clipPath id="clip_right_door">
            <rect
              x="88.767"
              y="531.233"
              width="38"
              height="131"
              rx="4"
              fill="white"
            />
          </clipPath>
        </defs>
      </svg>
    );
  }
);

RightDoor.displayName = "RightDoor";
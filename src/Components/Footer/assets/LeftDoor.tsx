import { forwardRef } from "react";

interface DoorProps {
  className?: string;
}

export const LeftDoor = forwardRef<SVGSVGElement, DoorProps>(
  ({ className }, ref) => {
    const svgClass = [className, "site-theme-paint-transition"]
      .filter(Boolean)
      .join(" ");

    return (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 552 1230"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={svgClass}
        ref={ref}
        preserveAspectRatio="xMaxYMax meet"
      >
        <g filter="url(#filter_left_door)">
          <path
            d="M33.2334 7.2334H518.233C532.593 7.2334 544.233 18.874 544.233 33.2334V1196.23C544.233 1210.59 532.593 1222.23 518.233 1222.23H33.2334C18.874 1222.23 7.2334 1210.59 7.2334 1196.23V33.2334C7.2334 18.874 18.874 7.2334 33.2334 7.2334ZM281.233 319.983C260.247 319.983 243.233 336.997 243.233 357.983V659.937C243.234 680.923 260.247 697.937 281.233 697.937H445.573C466.56 697.937 483.573 680.923 483.573 659.937V357.983C483.573 336.997 466.56 319.983 445.573 319.983H281.233Z"
            fill="#F3EAE3"
            stroke="#2B2B23"
            strokeWidth="12"
          />
          <rect
            x="231.233"
            y="308.233"
            width="264"
            height="401"
            rx="50.0749"
            stroke="var(--site-train-stripe)"
            strokeWidth="14"
          />
          <g clipPath="url(#clip_left_door)">
            <rect
              x="425.233"
              y="531.234"
              width="37.8244"
              height="148.776"
              fill="#FFFCF3"
            />
            <rect
              x="416.321"
              y="524.233"
              width="58"
              height="32"
              fill="#FFA141"
            />
            <path
              d="M442.083 566.772C443.247 564.755 446.159 564.755 447.324 566.772L455.404 580.767C456.568 582.785 455.113 585.306 452.783 585.306H436.623C434.294 585.306 432.838 582.785 434.003 580.767L442.083 566.772Z"
              fill="#FD4C4C"
            />
            <circle
              cx="444.722"
              cy="604.764"
              r="8.82569"
              fill="#FFFCF3"
              stroke="#FD4C4C"
              strokeWidth="4.0346"
            />
            <circle
              cx="444.703"
              cy="634.1"
              r="8.82569"
              fill="#FD4C4C"
              stroke="#FD4C4C"
              strokeWidth="4.0346"
            />
          </g>
        </g>
        <defs>
          <filter
            id="filter_left_door"
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
              width="100%"
              height="100%"
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
                tableValues="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 "
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
          <clipPath id="clip_left_door">
            <rect
              x="425.233"
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
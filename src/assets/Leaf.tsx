export const Leaf = ({ className }: { className?: string }) => {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_2953_14044)">
          <g filter="url(#filter0_g_2953_14044)">
            <path
              d="M63.0358 26.5516C49.418 15.5847 30.8823 16.0239 21.6351 27.5325C12.3878 39.0412 15.9308 57.2612 29.5486 68.2282C38.7171 75.612 61.0131 78.0093 74.6035 78.7876C80.3321 79.1157 84.5392 73.8797 82.9917 68.3481C79.3204 55.2249 72.2043 33.9354 63.0358 26.5516Z"
              fill="#AEB032"
            />
          </g>
        </g>
        <defs>
          <filter
            id="filter0_g_2953_14044"
            x="14.9846"
            y="17.1055"
            width="69.8303"
            height="63.1973"
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
              baseFrequency="0.125 0.125"
              numOctaves="3"
              seed="2758"
            />
            <feDisplacementMap
              in="shape"
              scale="3"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displacedImage"
              width="100%"
              height="100%"
            />
            <feMerge result="effect1_texture_2953_14044">
              <feMergeNode in="displacedImage" />
            </feMerge>
          </filter>
          <clipPath id="clip0_2953_14044">
            <rect width="100" height="100" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <path d="M50 10..." fill="#FFD700" />
    </svg>
  );
};

export const Star = ({ className }: { className?: string }) => {
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
        <g filter="url(#filter0_gn_2953_14048)">
          <path
            d="M45.6863 14.1727C46.9834 9.91115 53.0166 9.91115 54.3137 14.1727L60.967 36.0322C61.4047 37.47 62.53 38.5953 63.9678 39.033L85.8273 45.6863C90.0888 46.9834 90.0889 53.0166 85.8273 54.3137L63.9678 60.967C62.53 61.4047 61.4047 62.53 60.967 63.9678L54.3137 85.8273C53.0166 90.0888 46.9834 90.0889 45.6863 85.8273L39.033 63.9678C38.5953 62.53 37.47 61.4047 36.0322 60.967L14.1727 54.3137C9.91115 53.0166 9.91115 46.9834 14.1727 45.6863L36.0322 39.033C37.47 38.5953 38.5953 37.47 39.033 36.0322L45.6863 14.1727Z"
            fill="#F1E6C7"
          />
        </g>
        <defs>
          <filter
            id="filter0_gn_2953_14048"
            x="9.58622"
            y="9.58622"
            width="80.8276"
            height="80.8276"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.21154396235942841 0.21154396235942841"
              numOctaves="3"
              seed="5210"
            />
            <feDisplacementMap
              in="shape"
              scale="2.7806766033172607"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displacedImage"
              width="100%"
              height="100%"
            />
            <feMerge result="effect1_texture_2953_14048">
              <feMergeNode in="displacedImage" />
            </feMerge>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.95899921655654907 0.95899921655654907"
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
              in2="effect1_texture_2953_14048"
              in="coloredNoise1"
              result="noise1Clipped"
            />
            <feFlood flood-color="#F1EBE5" result="color1Flood" />
            <feComposite
              operator="in"
              in2="noise1Clipped"
              in="color1Flood"
              result="color1"
            />
            <feMerge result="effect2_noise_2953_14048">
              <feMergeNode in="effect1_texture_2953_14048" />
              <feMergeNode in="color1" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      <path d="M50 10..." fill="#FFD700" />
    </svg>
  );
};

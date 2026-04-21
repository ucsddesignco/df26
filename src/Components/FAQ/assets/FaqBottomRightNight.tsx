export const FaqBottomRightNight = () => {
  return (
    <div>
      <svg
        width="35"
        height="35"
        viewBox="0 0 35 35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_gn_2662_13663)">
          <path
            d="M13.7907 3.69862C14.8368 0.261911 19.7023 0.261907 20.7483 3.69861L22.5385 9.58014C22.8914 10.7397 23.7989 11.6472 24.9584 12.0001L30.84 13.7902C34.2767 14.8363 34.2767 19.7018 30.84 20.7478L24.9584 22.538C23.7989 22.8909 22.8914 23.7984 22.5385 24.9579L20.7483 30.8395C19.7023 34.2762 14.8368 34.2762 13.7907 30.8395L12.0006 24.9579C11.6477 23.7984 10.7402 22.8909 9.58063 22.538L3.69911 20.7478C0.2624 19.7018 0.262396 14.8363 3.6991 13.7902L9.58063 12.0001C10.7402 11.6472 11.6477 10.7397 12.0006 9.58014L13.7907 3.69862Z"
            fill="#E8CE8A"
          />
        </g>
        <defs>
          <filter
            id="filter0_gn_2662_13663"
            x="-0.000146985"
            y="-0.000146985"
            width="34.5394"
            height="34.5384"
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
              baseFrequency="0.26231446862220764 0.26231446862220764"
              numOctaves="3"
              seed="5210"
            />
            <feDisplacementMap
              in="shape"
              scale="2.2424814701080322"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displacedImage"
              width="100%"
              height="100%"
            />
            <feMerge result="effect1_texture_2662_13663">
              <feMergeNode in="displacedImage" />
            </feMerge>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="1.1891589164733887 1.1891589164733887"
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
              in2="effect1_texture_2662_13663"
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
            <feMerge result="effect2_noise_2662_13663">
              <feMergeNode in="effect1_texture_2662_13663" />
              <feMergeNode in="color1" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </div>
  );
};

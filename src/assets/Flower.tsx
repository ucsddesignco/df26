export const Flower = ({ className }: { className?: string }) => {
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
        <g filter="url(#filter0_g_2953_14037)">
          <path
            d="M32.7764 14C40.613 14.0001 47.3266 18.8018 50.1396 25.623C52.9527 18.802 59.6674 14.0011 67.5039 14.001C77.8735 14.001 86.2802 22.4069 86.2803 32.7764C86.2803 40.6117 81.4797 47.3238 74.6602 50.1377C81.4803 52.9513 86.2803 59.6662 86.2803 67.5019C86.28 77.8712 77.8743 86.2772 67.5049 86.2773C59.6678 86.2773 52.9535 81.4751 50.1406 74.6533C47.3277 81.4748 40.6132 86.2763 32.7764 86.2764C22.4068 86.2764 14.0001 77.8704 14 67.501C14 59.6658 18.7998 52.9516 25.6191 50.1377C18.8 47.3237 14 40.6104 14 32.7754C14.0002 22.406 22.4068 14 32.7764 14ZM50.1396 39.9277C48.2364 44.5433 44.5477 48.2334 39.9326 50.1377C44.5477 52.0419 48.2372 55.7322 50.1406 60.3477C52.0441 55.7327 55.7331 52.0428 60.3477 50.1387C55.7322 48.2342 52.0428 44.5438 50.1396 39.9277Z"
            fill="#ED9699"
          />
        </g>
        <defs>
          <filter
            id="filter0_g_2953_14037"
            x="11.7151"
            y="11.7151"
            width="76.85"
            height="76.8471"
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
              baseFrequency="0.12254463881254196 0.12254463881254196"
              numOctaves="3"
              seed="5819"
            />
            <feDisplacementMap
              in="shape"
              scale="4.56976318359375"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displacedImage"
              width="100%"
              height="100%"
            />
            <feMerge result="effect1_texture_2953_14037">
              <feMergeNode in="displacedImage" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      <path d="M50 10..." fill="#FFD700" />
    </svg>
  );
};

export default function BigFlower({ className }: { className?: string }) {
  return (
    <svg className={className} width="87" height="87" viewBox="0 0 87 87" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_g_2450_5136)">
        <path d="M17.452 14.5503C24.7363 12.4191 32.283 15.0568 36.7527 20.6322C37.5125 13.527 42.4479 7.2384 49.7319 5.10717C59.3705 2.28721 69.4699 7.8148 72.2899 17.4532C74.4206 24.7365 71.7843 32.2814 66.2102 36.7513C73.3149 37.5116 79.6031 42.4463 81.7341 49.7298C84.5539 59.3681 79.0263 69.4676 69.388 72.2877C62.1029 74.4191 54.5553 71.7809 50.0858 66.2042C49.3263 73.3099 44.3913 79.599 37.1069 81.7302C27.4686 84.5498 17.3693 79.0231 14.5492 69.3851C12.4185 62.1023 15.0543 54.5564 20.6276 50.0864C13.5239 49.3252 7.23665 44.391 5.10594 37.1083C2.28622 27.47 7.81375 17.3704 17.452 14.5503ZM40.6428 33.9283C40.1289 38.7362 37.7032 43.169 33.9313 46.1941C38.7392 46.709 43.1716 49.1362 46.196 52.909C46.7101 48.1013 49.1365 43.6679 52.9085 40.643C48.1004 40.1281 43.6672 37.7015 40.6428 33.9283Z" fill="#ED9699" />
      </g>
      <defs>
        <filter id="filter0_g_2450_5136" x="2.08482" y="2.08621" width="82.6704" height="82.6655" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feTurbulence type="fractalNoise" baseFrequency="0.12254463881254196 0.12254463881254196" numOctaves="3" seed="5819" />
          <feDisplacementMap in="shape" scale="4.56976318359375" xChannelSelector="R" yChannelSelector="G" result="displacedImage" width="100%" height="100%" />
          <feMerge result="effect1_texture_2450_5136">
            <feMergeNode in="displacedImage" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}
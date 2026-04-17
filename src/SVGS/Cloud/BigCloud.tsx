export default function BigCloud() {
  return (
    <svg width="506" height="165" viewBox="0 0 506 165" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_ng_3346_16027)">
        <path d="M341.126 2.355C354.646 2.35515 365.606 13.3153 365.606 26.8355C365.606 31.3942 364.359 35.6613 362.188 39.3159H478.732C492.253 39.3161 503.213 50.2763 503.213 63.7964C503.213 77.3167 492.253 88.2777 478.732 88.2779H262.856C265.026 91.9323 266.273 96.199 266.273 100.757C266.273 105.316 265.026 109.583 262.855 113.238H383.224C396.744 113.238 407.705 124.198 407.705 137.718C407.705 151.239 396.744 162.2 383.224 162.2H54.4804C40.9602 162.2 30 151.239 30 137.718C30 133.16 31.2471 128.893 33.417 125.239H0.480438C-13.0398 125.239 -24 114.278 -24 100.757C-23.9998 87.2373 -13.0397 76.2771 0.480438 76.2769H77.3418C75.1716 72.6222 73.9238 68.3552 73.9238 63.7964C73.9239 59.238 75.1709 54.9714 77.3408 51.3169H46.4804C32.9602 51.3167 22 40.3558 22 26.8355C22.0002 13.3154 32.9603 2.35523 46.4804 2.355H341.126Z" fill="white" />
      </g>
      <defs>
        <filter id="filter0_ng_3346_16027" x="-26.355" y="-4.76837e-07" width="531.923" height="164.555" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feTurbulence type="fractalNoise" baseFrequency="0.56617039442062378 0.56617039442062378" stitchTiles="stitch" numOctaves="3" result="noise" seed="3550" />
          <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
          <feComponentTransfer in="alphaNoise" result="coloredNoise1">
            <feFuncA type="discrete" tableValues="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 " />
          </feComponentTransfer>
          <feComposite operator="in" in2="shape" in="coloredNoise1" result="noise1Clipped" />
          <feFlood floodColor="#F1EBE5" result="color1Flood" />
          <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1" />
          <feMerge result="effect1_noise_3346_16027">
            <feMergeNode in="shape" />
            <feMergeNode in="color1" />
          </feMerge>
          <feTurbulence type="fractalNoise" baseFrequency="0.1248905137181282 0.1248905137181282" numOctaves="3" seed="5210" />
          <feDisplacementMap in="effect1_noise_3346_16027" scale="4.7100076675415039" xChannelSelector="R" yChannelSelector="G" result="displacedImage" width="100%" height="100%" />
          <feMerge result="effect2_texture_3346_16027">
            <feMergeNode in="displacedImage" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}
export default function SmallCloud() {
  return (
    <svg width="360" height="128" viewBox="0 0 360 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_ng_3346_16023)">
        <path fillRule="evenodd" clipRule="evenodd" d="M319.732 2.355C333.252 2.35507 344.212 13.3153 344.212 26.8355C344.212 31.3943 342.965 35.6612 340.794 39.3159H476.235C489.755 39.3161 500.715 50.2763 500.715 63.7964C500.715 77.3167 489.755 88.2777 476.235 88.2779H412.49C414.66 91.9323 415.907 96.199 415.907 100.757C415.907 114.278 404.946 125.239 391.425 125.239H26.8354C13.3151 125.239 2.35498 114.278 2.35498 100.757C2.35522 87.2372 13.3152 76.277 26.8354 76.2769H90.5815C88.4114 72.6222 87.1636 68.3552 87.1636 63.7964C87.1636 59.238 88.4107 54.9714 90.5806 51.3169H74.0483C60.5281 51.3167 49.5679 40.3557 49.5679 26.8355C49.5681 13.3154 60.5283 2.35522 74.0483 2.355H319.732Z" fill="white" />
      </g>
      <defs>
        <filter id="filter0_ng_3346_16023" x="-2.3365e-05" y="-4.76837e-07" width="503.07" height="127.594" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
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
          <feMerge result="effect1_noise_3346_16023">
            <feMergeNode in="shape" />
            <feMergeNode in="color1" />
          </feMerge>
          <feTurbulence type="fractalNoise" baseFrequency="0.1248905137181282 0.1248905137181282" numOctaves="3" seed="5210" />
          <feDisplacementMap in="effect1_noise_3346_16023" scale="4.7100076675415039" xChannelSelector="R" yChannelSelector="G" result="displacedImage" width="100%" height="100%" />
          <feMerge result="effect2_texture_3346_16023">
            <feMergeNode in="displacedImage" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}
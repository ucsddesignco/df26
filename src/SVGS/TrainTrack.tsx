export default function TrainTrack() {
  return (
    <svg width="100%" height="33" viewBox="0 0 1280 33" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <g filter="url(#filter0_gn_2817_396)">
        <rect width="2042" height="32" transform="translate(0 1.07837)" fill="#2B2B23" />
      </g>
      <defs>
        <filter id="filter0_gn_2817_396" x="-1.07835" y="1.77622e-05" width="2044.16" height="34.1567" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feTurbulence type="fractalNoise" baseFrequency="0.27274748682975769 0.27274748682975769" numOctaves="3" seed="5210" />
          <feDisplacementMap in="shape" scale="2.1567027568817139" xChannelSelector="R" yChannelSelector="G" result="displacedImage" width="100%" height="100%" />
          <feMerge result="effect1_texture_2817_396">
            <feMergeNode in="displacedImage" />
          </feMerge>
          <feTurbulence type="fractalNoise" baseFrequency="1.2364553213119507 1.2364553213119507" stitchTiles="stitch" numOctaves="3" result="noise" seed="3550" />
          <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
          <feComponentTransfer in="alphaNoise" result="coloredNoise1">
            <feFuncA type="discrete" tableValues="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 " />
          </feComponentTransfer>
          <feComposite operator="in" in2="effect1_texture_2817_396" in="coloredNoise1" result="noise1Clipped" />
          <feFlood floodColor="#F1EBE5" result="color1Flood" />
          <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1" />
          <feMerge result="effect2_noise_2817_396">
            <feMergeNode in="effect1_texture_2817_396" />
            <feMergeNode in="color1" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}
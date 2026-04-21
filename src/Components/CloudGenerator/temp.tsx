<svg xmlns="http://www.w3.org/2000/svg" width="504" height="128" fill="none" viewBox="0 0 504 128">
  <g filter="url(#a)">
    <path fill="#fff" d="M320 2a24 24 0 0 1 21 37h135a24 24 0 0 1 0 49h-64q4 6 4 13c0 13-11 24-25 24H27a24 24 0 0 1 0-49h64a24 24 0 0 1 0-25H74a24 24 0 0 1 0-49z"/>
  </g>
  <defs>
    <filter id="a" width="503.1" height="127.6" x="0" y="0" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
      <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feTurbulence baseFrequency="0.56617039442062378 0.56617039442062378" numOctaves="3" result="noise" seed="3550" stitchTiles="stitch" type="fractalNoise"/>
      <feColorMatrix in="noise" result="alphaNoise" type="luminanceToAlpha"/>
      <feComponentTransfer in="alphaNoise" result="coloredNoise1">
        <feFuncA tableValues="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0" type="discrete"/>
      </feComponentTransfer>
      <feComposite in="coloredNoise1" in2="shape" operator="in" result="noise1Clipped"/>
      <feFlood floodColor="#f1ebe5" result="color1Flood"/>
      <feComposite in="color1Flood" in2="noise1Clipped" operator="in" result="color1"/>
      <feMerge result="effect1_noise_3573_15081">
        <feMergeNode in="shape"/>
        <feMergeNode in="color1"/>
      </feMerge>
      <feTurbulence baseFrequency="0.1248905137181282 0.1248905137181282" numOctaves="3" seed="5210" type="fractalNoise"/>
      <feDisplacementMap width="100%" height="100%" in="effect1_noise_3573_15081" result="displacedImage" scale="4.7" xChannelSelector="R" yChannelSelector="G"/>
      <feMerge result="effect2_texture_3573_15081">
        <feMergeNode in="displacedImage"/>
      </feMerge>
    </filter>
  </defs>
</svg>
interface TrainWallProps {
  side: 'left' | 'right';
}

export default function TrainWall({ side }: TrainWallProps) {
  return (
    <div
      style={{
        transform: side === 'left'
          ? 'translateY(-50%) scaleX(-1) translateX(calc(100% - 127px))'
          : 'translateY(-50%) translateX(calc(100% - 127px))',
      }}
      className={`wall wall--${side}`}
    >
      <svg width="1514" height="655" viewBox="0 0 1514 655" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_gn_3012_13971)">
          <rect x="1.2334" y="39.2334" width="1511" height="529" fill="#EBE1DA"/>
          <rect x="7.2334" y="45.2334" width="1499" height="517" stroke="#C7BAB3" strokeWidth="12"/>
        </g>
        <g filter="url(#filter1_gn_3012_13971)">
          <rect x="65.2334" y="1.2334" width="62" height="652" fill="#AEB032"/>
        </g>
        <defs>
          <filter id="filter0_gn_3012_13971" x="3.38554e-05" y="38" width="1513.47" height="531.467" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feTurbulence type="fractalNoise" baseFrequency="0.238467738032341 0.238467738032341" numOctaves={3} seed={5210}/>
            <feDisplacementMap in="shape" scale="2.4667291641235352" xChannelSelector="R" yChannelSelector="G" result="displacedImage" width="100%" height="100%"/>
            <feMerge result="effect1_texture_3012_13971">
              <feMergeNode in="displacedImage"/>
            </feMerge>
            <feTurbulence type="fractalNoise" baseFrequency="1.0810537338256836 1.0810537338256836" stitchTiles="stitch" numOctaves={3} result="noise" seed={3550}/>
            <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise"/>
            <feComponentTransfer in="alphaNoise" result="coloredNoise1">
              <feFuncA type="discrete" tableValues="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"/>
            </feComponentTransfer>
            <feComposite operator="in" in2="effect1_texture_3012_13971" in="coloredNoise1" result="noise1Clipped"/>
            <feFlood floodColor="#F1EBE5" result="color1Flood"/>
            <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1"/>
            <feMerge result="effect2_noise_3012_13971">
              <feMergeNode in="effect1_texture_3012_13971"/>
              <feMergeNode in="color1"/>
            </feMerge>
          </filter>
          <filter id="filter1_gn_3012_13971" x="64" y="3.38554e-05" width="64.4667" height="654.467" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feTurbulence type="fractalNoise" baseFrequency="0.238467738032341 0.238467738032341" numOctaves={3} seed={5210}/>
            <feDisplacementMap in="shape" scale="2.4667291641235352" xChannelSelector="R" yChannelSelector="G" result="displacedImage" width="100%" height="100%"/>
            <feMerge result="effect1_texture_3012_13971">
              <feMergeNode in="displacedImage"/>
            </feMerge>
            <feTurbulence type="fractalNoise" baseFrequency="1.0810537338256836 1.0810537338256836" stitchTiles="stitch" numOctaves={3} result="noise" seed={3550}/>
            <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise"/>
            <feComponentTransfer in="alphaNoise" result="coloredNoise1">
              <feFuncA type="discrete" tableValues="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"/>
            </feComponentTransfer>
            <feComposite operator="in" in2="effect1_texture_3012_13971" in="coloredNoise1" result="noise1Clipped"/>
            <feFlood floodColor="#F1EBE5" result="color1Flood"/>
            <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1"/>
            <feMerge result="effect2_noise_3012_13971">
              <feMergeNode in="effect1_texture_3012_13971"/>
              <feMergeNode in="color1"/>
            </feMerge>
          </filter>
        </defs>
      </svg>
    </div>
  );
}
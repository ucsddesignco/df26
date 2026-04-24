export function SmallStar({ className }: { className?: string }) {
    return (
        <svg className={className} width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_gn_2272_2904)">
                <circle cx="5.2334" cy="5.2334" r="4" fill="#F1E6C7" />
            </g>
            <defs>
                <filter id="filter0_gn_2272_2904" x="3.38554e-05" y="3.38554e-05" width="10.4667" height="10.4667" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feTurbulence type="fractalNoise" baseFrequency="0.238467738032341 0.238467738032341" numOctaves="3" seed="5210" />
                    <feDisplacementMap in="shape" scale="2.4667291641235352" xChannelSelector="R" yChannelSelector="G" result="displacedImage" width="100%" height="100%" />
                    <feMerge result="effect1_texture_2272_2904">
                        <feMergeNode in="displacedImage" />
                    </feMerge>
                    <feTurbulence type="fractalNoise" baseFrequency="0.55555558204650879 0.55555558204650879" stitchTiles="stitch" numOctaves="3" result="noise" seed="3550" />
                    <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
                    <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                        <feFuncA type="discrete" tableValues="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 " />
                    </feComponentTransfer>
                    <feComposite operator="in" in2="effect1_texture_2272_2904" in="coloredNoise1" result="noise1Clipped" />
                    <feFlood floodColor="#F1EBE5" result="color1Flood" />
                    <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1" />
                    <feMerge result="effect2_noise_2272_2904">
                        <feMergeNode in="effect1_texture_2272_2904" />
                        <feMergeNode in="color1" />
                    </feMerge>
                </filter>
            </defs>
        </svg>


    )
}
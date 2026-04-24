export function Moon({ className }: { className?: string }) {
    return (
        <svg className={className} width="175" height="182" viewBox="0 0 175 182" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_gn_2272_4456)">
                <path d="M64.0314 2.55555C65.2003 2.17488 66.3714 1.81919 67.544 1.48817C73.6619 -0.238842 77.7316 7.18567 74.6183 12.7281C64.406 30.9083 61.5381 53.1399 68.504 74.5304C81.7218 115.119 125.34 137.307 165.928 124.089C170.403 122.631 174.993 126.875 172.817 131.049C162.201 151.417 143.909 167.802 120.344 175.477C72.5932 191.027 21.2775 164.923 5.72716 117.172C-9.82315 69.4216 16.2805 18.1059 64.0314 2.55555Z" fill="#F1E6C7" />
            </g>
            <defs>
                <filter id="filter0_gn_2272_4456" x="3.38554e-05" y="3.38554e-05" width="174.608" height="181.204" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feTurbulence type="fractalNoise" baseFrequency="0.238467738032341 0.238467738032341" numOctaves="3" seed="5210" />
                    <feDisplacementMap in="shape" scale="2.4667291641235352" xChannelSelector="R" yChannelSelector="G" result="displacedImage" width="100%" height="100%" />
                    <feMerge result="effect1_texture_2272_4456">
                        <feMergeNode in="displacedImage" />
                    </feMerge>
                    <feTurbulence type="fractalNoise" baseFrequency="0.55555558204650879 0.55555558204650879" stitchTiles="stitch" numOctaves="3" result="noise" seed="3550" />
                    <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
                    <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                        <feFuncA type="discrete" tableValues="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 " />
                    </feComponentTransfer>
                    <feComposite operator="in" in2="effect1_texture_2272_4456" in="coloredNoise1" result="noise1Clipped" />
                    <feFlood floodColor="#F1EBE5" result="color1Flood" />
                    <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1" />
                    <feMerge result="effect2_noise_2272_4456">
                        <feMergeNode in="effect1_texture_2272_4456" />
                        <feMergeNode in="color1" />
                    </feMerge>
                </filter>
            </defs>
        </svg>


    )
}
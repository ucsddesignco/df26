export function LargeStar({ className }: { className?: string }) {
    return (
        <svg className={className} width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_gn_2272_2903)">
                <path d="M17.1001 4.58672C18.3972 0.325207 24.4305 0.325207 25.7275 4.58672L27.9473 11.8798C28.3849 13.3177 29.5102 14.4429 30.9481 14.8806L38.2412 17.1004C42.5027 18.3974 42.5027 24.4307 38.2412 25.7278L30.9481 27.9476C29.5102 28.3852 28.3849 29.5105 27.9473 30.9483L25.7275 38.2414C24.4305 42.5029 18.3972 42.5029 17.1001 38.2414L14.8803 30.9483C14.4427 29.5105 13.3174 28.3852 11.8796 27.9476L4.58648 25.7278C0.324963 24.4307 0.324963 18.3974 4.58648 17.1004L11.8796 14.8806C13.3174 14.4429 14.4427 13.3177 14.8803 11.8798L17.1001 4.58672Z" fill="#F1E6C7" />
            </g>
            <defs>
                <filter id="filter0_gn_2272_2903" x="4.25577e-05" y="0.000286698" width="42.8276" height="42.8276" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feTurbulence type="fractalNoise" baseFrequency="0.21154396235942841 0.21154396235942841" numOctaves="3" seed="5210" />
                    <feDisplacementMap in="shape" scale="2.7806766033172607" xChannelSelector="R" yChannelSelector="G" result="displacedImage" width="100%" height="100%" />
                    <feMerge result="effect1_texture_2272_2903">
                        <feMergeNode in="displacedImage" />
                    </feMerge>
                    <feTurbulence type="fractalNoise" baseFrequency="0.95899921655654907 0.95899921655654907" stitchTiles="stitch" numOctaves="3" result="noise" seed="3550" />
                    <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
                    <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                        <feFuncA type="discrete" tableValues="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 " />
                    </feComponentTransfer>
                    <feComposite operator="in" in2="effect1_texture_2272_2903" in="coloredNoise1" result="noise1Clipped" />
                    <feFlood floodColor="#F1EBE5" result="color1Flood" />
                    <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1" />
                    <feMerge result="effect2_noise_2272_2903">
                        <feMergeNode in="effect1_texture_2272_2903" />
                        <feMergeNode in="color1" />
                    </feMerge>
                </filter>
            </defs>
        </svg>

    )
}
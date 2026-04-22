import type { CSSProperties } from "react";

type BigStarProps = {
    className?: string;
    style?: CSSProperties;
};


export const BigStar = ({ className, style }: BigStarProps) => {
    return (
        <svg className={className} style={style} width="87" height="103" viewBox="0 0 87 103" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_gn_2630_36134)">
                <path d="M27.7183 46.955C29.2343 41.9741 36.2862 41.974 37.8022 46.955L40.3968 55.4794C40.9083 57.16 42.2236 58.4753 43.9042 58.9868L52.4286 61.5814C57.4096 63.0974 57.4096 70.1493 52.4286 71.6653L43.9042 74.2599C42.2236 74.7714 40.9083 76.0867 40.3968 77.7673L37.8022 86.2917C36.2862 91.2727 29.2343 91.2727 27.7183 86.2917L25.1237 77.7673C24.6122 76.0867 23.2969 74.7714 21.6163 74.2599L13.0919 71.6653C8.11096 70.1493 8.11095 63.0974 13.0919 61.5814L21.6163 58.9868C23.2969 58.4753 24.6122 57.16 25.1237 55.4794L27.7183 46.955Z" fill="#F1E6C7" />
            </g>
            <g filter="url(#filter1_gn_2630_36134)">
                <path d="M61.2284 10.153C62.1576 7.10015 66.4798 7.10015 67.4089 10.153L68.9992 15.3776C69.3127 16.4077 70.1188 17.2138 71.1488 17.5273L76.3735 19.1175C79.4263 20.0467 79.4263 24.3689 76.3735 25.298L71.1488 26.8883C70.1188 27.2018 69.3127 28.0079 68.9992 29.0379L67.4089 34.2626C66.4798 37.3154 62.1576 37.3154 61.2284 34.2626L59.6382 29.0379C59.3247 28.0079 58.5186 27.2018 57.4886 26.8883L52.2639 25.298C49.2111 24.3689 49.2111 20.0467 52.2639 19.1175L57.4886 17.5273C58.5186 17.2138 59.3247 16.4077 59.6382 15.3776L61.2284 10.153Z" fill="#F1E6C7" />
            </g>
            <defs>
                <filter id="filter0_gn_2630_36134" x="7.73113" y="41.5942" width="50.0582" height="50.0582" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feTurbulence type="fractalNoise" baseFrequency="0.18098759651184082 0.18098759651184082" numOctaves="3" seed="5210" />
                    <feDisplacementMap in="shape" scale="3.2501416206359863" xChannelSelector="R" yChannelSelector="G" result="displacedImage" width="100%" height="100%" />
                    <feMerge result="effect1_texture_2630_36134">
                        <feMergeNode in="displacedImage" />
                    </feMerge>
                    <feTurbulence type="fractalNoise" baseFrequency="0.82047712802886963 0.82047712802886963" stitchTiles="stitch" numOctaves="3" result="noise" seed="3550" />
                    <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
                    <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                        <feFuncA type="discrete" tableValues="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 " />
                    </feComponentTransfer>
                    <feComposite operator="in" in2="effect1_texture_2630_36134" in="coloredNoise1" result="noise1Clipped" />
                    <feFlood flood-color="#F1EBE5" result="color1Flood" />
                    <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1" />
                    <feMerge result="effect2_noise_2630_36134">
                        <feMergeNode in="effect1_texture_2630_36134" />
                        <feMergeNode in="color1" />
                    </feMerge>
                </filter>
                <filter id="filter1_gn_2630_36134" x="48.9782" y="6.86733" width="30.6809" height="30.6809" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feTurbulence type="fractalNoise" baseFrequency="0.29529556632041931 0.29529556632041931" numOctaves="3" seed="5210" />
                    <feDisplacementMap in="shape" scale="1.9920223951339722" xChannelSelector="R" yChannelSelector="G" result="displacedImage" width="100%" height="100%" />
                    <feMerge result="effect1_texture_2630_36134">
                        <feMergeNode in="displacedImage" />
                    </feMerge>
                    <feTurbulence type="fractalNoise" baseFrequency="1.3386731147766113 1.3386731147766113" stitchTiles="stitch" numOctaves="3" result="noise" seed="3550" />
                    <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
                    <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                        <feFuncA type="discrete" tableValues="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 " />
                    </feComponentTransfer>
                    <feComposite operator="in" in2="effect1_texture_2630_36134" in="coloredNoise1" result="noise1Clipped" />
                    <feFlood flood-color="#F1EBE5" result="color1Flood" />
                    <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1" />
                    <feMerge result="effect2_noise_2630_36134">
                        <feMergeNode in="effect1_texture_2630_36134" />
                        <feMergeNode in="color1" />
                    </feMerge>
                </filter>
            </defs>
        </svg>

    )
}
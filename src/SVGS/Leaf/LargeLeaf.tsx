export function LargeLeaf({ className }: { className?: string }) {
    return (
        <svg className={className} width="61" height="55" viewBox="0 0 61 55" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_g_2272_2887)">
                <path d="M41.5422 8.32738C29.8285 -1.09532 13.8846 -0.718001 5.93036 9.17014C-2.02386 19.0583 1.02375 34.7128 12.7374 44.1355C20.2805 50.2033 38.1535 52.3518 49.9243 53.1126C55.6542 53.4829 59.8679 48.2447 58.2785 42.7272C55.0134 31.3927 49.0853 14.3952 41.5422 8.32738Z" fill="#AEB032" />
            </g>
            <defs>
                <filter id="filter0_g_2272_2887" x="0" y="0" width="60.1169" height="54.6309" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feTurbulence type="fractalNoise" baseFrequency="0.125 0.125" numOctaves="3" seed="2758" />
                    <feDisplacementMap in="shape" scale="3" xChannelSelector="R" yChannelSelector="G" result="displacedImage" width="100%" height="100%" />
                    <feMerge result="effect1_texture_2272_2887">
                        <feMergeNode in="displacedImage" />
                    </feMerge>
                </filter>
            </defs>
        </svg>


    )
}
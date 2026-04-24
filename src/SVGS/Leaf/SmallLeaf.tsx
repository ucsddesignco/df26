export function SmallLeaf({ className }: { className?: string }) {
    return (
        <svg className={className} width="33" height="27" viewBox="0 0 33 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_g_2272_2886)">
                <path d="M19.6108 23.5085C12.7835 26.671 5.08465 24.5626 2.41501 18.7992C-0.254642 13.0359 3.11584 5.80005 9.94319 2.63754C13.3548 1.05725 19.5026 1.37428 24.8003 2.08705C29.8586 2.76762 32.3905 8.23366 29.6385 12.5321C26.7563 17.0338 23.0224 21.9282 19.6108 23.5085Z" fill="#AEB032" />
            </g>
            <defs>
                <filter id="filter0_g_2272_2886" x="0" y="0" width="32.2679" height="26.4785" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feTurbulence type="fractalNoise" baseFrequency="0.125 0.125" numOctaves="3" seed="2758" />
                    <feDisplacementMap in="shape" scale="3" xChannelSelector="R" yChannelSelector="G" result="displacedImage" width="100%" height="100%" />
                    <feMerge result="effect1_texture_2272_2886">
                        <feMergeNode in="displacedImage" />
                    </feMerge>
                </filter>
            </defs>
        </svg>


    )
}
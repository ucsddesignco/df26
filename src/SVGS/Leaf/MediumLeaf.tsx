export function MediumLeaf({ className }: { className?: string }) {
    return (
        <svg className={className} width="45" height="44" viewBox="0 0 45 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_g_2272_2888)">
                <path d="M35.8911 33.5517C44.39 25.8478 46.0077 13.7866 39.5044 6.61219C33.0011 -0.562187 20.8395 -0.132918 12.3406 7.57099C7.38147 12.0663 3.83576 23.3374 1.74246 31.9464C0.385847 37.5257 4.90999 42.5167 10.5953 41.7128C19.3679 40.4723 30.932 38.047 35.8911 33.5517Z" fill="#AEB032" />
            </g>
            <defs>
                <filter id="filter0_g_2272_2888" x="0" y="0" width="44.9938" height="43.2979" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feTurbulence type="fractalNoise" baseFrequency="0.125 0.125" numOctaves="3" seed="2758" />
                    <feDisplacementMap in="shape" scale="3" xChannelSelector="R" yChannelSelector="G" result="displacedImage" width="100%" height="100%" />
                    <feMerge result="effect1_texture_2272_2888">
                        <feMergeNode in="displacedImage" />
                    </feMerge>
                </filter>
            </defs>
        </svg>


    )
}
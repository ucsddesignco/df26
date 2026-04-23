export function MediumStar({ className }: { className?: string }) {
    return (
        <svg className={className} width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_gn_2272_2902)">
                <path d="M9.65322 2.58957C10.3854 0.183872 13.7913 0.18387 14.5235 2.58956L15.7766 6.70663C16.0237 7.51832 16.6589 8.15355 17.4706 8.4006L21.5877 9.65371C23.9934 10.3859 23.9934 13.7918 21.5877 14.524L17.4706 15.7771C16.6589 16.0242 16.0237 16.6594 15.7766 17.4711L14.5235 21.5882C13.7913 23.9939 10.3854 23.9939 9.65322 21.5882L8.40012 17.4711C8.15307 16.6594 7.51783 16.0242 6.70614 15.7771L2.58908 14.524C0.183383 13.7918 0.183382 10.3859 2.58908 9.65371L6.70614 8.4006C7.51783 8.15355 8.15306 7.51832 8.40012 6.70663L9.65322 2.58957Z" fill="#F1E6C7" />
            </g>
            <defs>
                <filter id="filter0_gn_2272_2902" x="4.37498e-05" y="0.00028789" width="24.1767" height="24.1772" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feTurbulence type="fractalNoise" baseFrequency="0.37473499774932861 0.37473499774932861" numOctaves="3" seed="5210" />
                    <feDisplacementMap in="shape" scale="1.5697367191314697" xChannelSelector="R" yChannelSelector="G" result="displacedImage" width="100%" height="100%" />
                    <feMerge result="effect1_texture_2272_2902">
                        <feMergeNode in="displacedImage" />
                    </feMerge>
                    <feTurbulence type="fractalNoise" baseFrequency="1.6987987756729126 1.6987987756729126" stitchTiles="stitch" numOctaves="3" result="noise" seed="3550" />
                    <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
                    <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                        <feFuncA type="discrete" tableValues="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 " />
                    </feComponentTransfer>
                    <feComposite operator="in" in2="effect1_texture_2272_2902" in="coloredNoise1" result="noise1Clipped" />
                    <feFlood flood-color="#F1EBE5" result="color1Flood" />
                    <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1" />
                    <feMerge result="effect2_noise_2272_2902">
                        <feMergeNode in="effect1_texture_2272_2902" />
                        <feMergeNode in="color1" />
                    </feMerge>
                </filter>
            </defs>
        </svg>


    )
}
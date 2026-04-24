import type { CSSProperties } from "react";

type BigLeafProps = {
    className?: string;
    style?: CSSProperties;
};


export const BigLeaf = ({ className, style }: BigLeafProps) => {
    return (
        <svg className={className} style={style} width="90" height="69" viewBox="0 0 90 69" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_g_2612_19945)">
                <path d="M30.1221 54.4833C40.5196 62.3184 54.3101 61.5547 60.9241 52.7776C67.5382 44.0005 64.4711 30.5337 54.0736 22.6986C47.378 17.6532 31.8485 16.2834 21.639 15.9476C16.6691 15.7841 13.1654 20.4337 14.6924 25.166C17.8293 34.8875 23.4265 49.4378 30.1221 54.4833Z" fill="#AEB032" />
            </g>
            <g filter="url(#filter1_g_2612_19945)">
                <path d="M68.084 16.099C66.3829 21.6561 68.8067 27.3251 73.4978 28.7612C78.1888 30.1972 83.3707 26.8564 85.0718 21.2993C86.1672 17.7207 84.3732 10.9968 82.9568 6.66239C82.2674 4.55246 79.7823 3.79174 78.0299 5.15418C74.43 7.95299 69.1795 12.5205 68.084 16.099Z" fill="#AEB032" />
            </g>
            <defs>
                <filter id="filter0_g_2612_19945" x="13.0321" y="14.6443" width="52.68" height="46.5491" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feTurbulence type="fractalNoise" baseFrequency="0.14433829486370087 0.14433829486370087" numOctaves="3" seed="2758" />
                    <feDisplacementMap in="shape" scale="2.5980634689331055" xChannelSelector="R" yChannelSelector="G" result="displacedImage" width="100%" height="100%" />
                    <feMerge result="effect1_texture_2612_19945">
                        <feMergeNode in="displacedImage" />
                    </feMerge>
                </filter>
                <filter id="filter1_g_2612_19945" x="66.9605" y="3.89046" width="19.0296" height="25.7837" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feTurbulence type="fractalNoise" baseFrequency="0.32334306836128235 0.32334306836128235" numOctaves="3" seed="2758" />
                    <feDisplacementMap in="shape" scale="1.1597590446472168" xChannelSelector="R" yChannelSelector="G" result="displacedImage" width="100%" height="100%" />
                    <feMerge result="effect1_texture_2612_19945">
                        <feMergeNode in="displacedImage" />
                    </feMerge>
                </filter>
            </defs>
        </svg>

    )
}
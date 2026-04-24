import type { CSSProperties } from "react";

type BigFlowerProps = {
    className?: string;
    style?: CSSProperties;
};

export const BigFlower = ({ className, style }: BigFlowerProps) => {
    return (
        <svg className={className} style={style} width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_g_2229_2099)">
                <path d="M10.1457 11.6803C14.6759 9.86572 19.6676 11.0889 22.8724 14.3817C22.9177 9.787 25.6866 5.45592 30.2167 3.64122C36.2095 1.24083 43.0141 4.1528 45.4147 10.1456C47.2292 14.6754 46.0064 19.6671 42.7142 22.872C47.3085 22.9177 51.6394 25.6846 53.4539 30.2144C55.8546 36.2073 52.9423 43.0116 46.9496 45.4124C42.4189 47.2274 37.4255 46.0045 34.2206 42.7108C34.1755 47.3056 31.4087 51.6367 26.8786 53.4515C20.8856 55.8522 14.0812 52.9401 11.6806 46.9471C9.86621 42.4177 11.0877 37.4264 14.3792 34.2215C9.78537 34.1753 5.45572 31.4077 3.64131 26.8783C1.24066 20.8854 4.15277 14.081 10.1457 11.6803ZM26.1814 22.642C26.1508 25.7529 24.8723 28.741 22.6432 30.9111C25.754 30.9419 28.7419 32.2211 30.9117 34.4505C30.9424 31.3402 32.2217 28.3523 34.4502 26.1824C31.3394 26.1512 28.351 24.8717 26.1814 22.642Z" fill="#ED9699" />
            </g>
            <defs>
                <filter id="filter0_g_2229_2099" x="-1.21593e-05" y="4.88758e-05" width="57.0953" height="57.0928" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feTurbulence type="fractalNoise" baseFrequency="0.10000000149011612 0.10000000149011612" numOctaves="3" seed="5819" />
                    <feDisplacementMap in="shape" scale="5.5999999046325684" xChannelSelector="R" yChannelSelector="G" result="displacedImage" width="100%" height="100%" />
                    <feMerge result="effect1_texture_2229_2099">
                        <feMergeNode in="displacedImage" />
                    </feMerge>
                </filter>
            </defs>
        </svg>

    )
}
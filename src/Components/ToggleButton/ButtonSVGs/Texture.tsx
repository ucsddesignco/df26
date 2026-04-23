type TextureProps = {
    /** Unique id for the SVG filter (use React useId() from parent). */
    filterId: string;
    /** ViewBox height (width matches pill). Match pill total height in px (closed + open). */
    viewBoxHeight: number;
    className?: string;
};

/** Match `.toggle-pill` width (px) for edge-to-edge texture. */
const VB_W = 68;

/**
 * Rounded pill fill with feTurbulence / displacement + noise (Figma export).
 * Full-width rounded rect with rx/ry capped so the shape is a true vertical capsule
 * (semicircular top/bottom, no straight vertical “side band” from horizontal inset).
 */
export function Texture({ filterId, viewBoxHeight, className }: TextureProps) {
    const e1 = `${filterId}-e1`;
    const e2 = `${filterId}-e2`;
    const rectH = Math.max(0, viewBoxHeight);
    const r = Math.min(VB_W / 2, rectH / 2);
    const filterPad = 6;
    const filterH = viewBoxHeight + filterPad * 2;
    const filterW = VB_W + filterPad * 2;

    return (
        <svg
            className={className}
            width="100%"
            height="100%"
            viewBox={`0 0 ${VB_W} ${viewBoxHeight}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            /* Stretch to the pill — `meet` letterboxes and leaves a hard vertical edge on one side */
            preserveAspectRatio="none"
            aria-hidden
        >
            <g filter={`url(#${filterId})`}>
                <rect
                    x={0}
                    y={0}
                    width={VB_W}
                    height={rectH}
                    rx={r}
                    ry={r}
                    fill="#2B2B23"
                />
            </g>
            <defs>
                <filter
                    id={filterId}
                    x={-filterPad}
                    y={-filterPad}
                    width={filterW}
                    height={filterH}
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.238467738032341 0.238467738032341"
                        numOctaves="3"
                        seed="5210"
                        result="dispMapTurbulence"
                    />
                    <feDisplacementMap
                        in="shape"
                        in2="dispMapTurbulence"
                        scale="2.4667291641235352"
                        xChannelSelector="R"
                        yChannelSelector="G"
                        result="displacedImage"
                        width="100%"
                        height="100%"
                    />
                    <feMerge result={e1}>
                        <feMergeNode in="displacedImage" />
                    </feMerge>
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.55555558204650879 0.55555558204650879"
                        stitchTiles="stitch"
                        numOctaves="3"
                        result="noise"
                        seed="3550"
                    />
                    <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
                    <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                        <feFuncA
                            type="discrete"
                            tableValues="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 "
                        />
                    </feComponentTransfer>
                    <feComposite operator="in" in2={e1} in="coloredNoise1" result="noise1Clipped" />
                    <feFlood floodColor="#F1EBE5" result="color1Flood" />
                    <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1" />
                    <feMerge result={e2}>
                        <feMergeNode in={e1} />
                        <feMergeNode in="color1" />
                    </feMerge>
                </filter>
            </defs>
        </svg>
    );
}

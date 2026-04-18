export default function MedFlower({ className }: { className?: string }) {
  return (
    <svg className={className} width="66" height="66" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_g_2450_5138)">
        <path d="M34.7978 6.23437C39.3058 8.83711 41.5706 13.8294 40.9219 18.6875C44.8049 15.6967 50.262 15.1638 54.77 17.7665C60.7334 21.2097 62.777 28.8355 59.3339 34.7991C56.7315 39.3062 51.7402 41.571 46.8829 40.9234C49.873 44.8063 50.4061 50.2625 47.8036 54.7701C44.3604 60.7338 36.7346 62.7771 30.771 59.334C26.2624 56.7309 23.9973 51.7374 24.6469 46.8787C20.7639 49.87 15.307 50.4048 10.7987 47.8019C4.83524 44.3588 2.79199 36.7329 6.23486 30.7693C8.83696 26.2623 13.8281 23.9952 18.6851 24.6423C15.6964 20.7596 15.1631 15.3051 17.7651 10.7983C21.2083 4.83456 28.8341 2.79125 34.7978 6.23437ZM36.1759 26.908C33.5476 28.9324 30.1999 29.83 26.9115 29.3918C28.9357 32.0208 29.8318 35.3702 29.3925 38.659C32.0209 36.6346 35.3697 35.7365 38.6582 36.1749C36.634 33.5457 35.7364 30.1969 36.1759 26.908Z" fill="#ED9699" />
      </g>
      <defs>
        <filter id="filter0_g_2450_5138" x="2.27757" y="2.27664" width="61.0137" height="61.0151" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feTurbulence type="fractalNoise" baseFrequency="0.12254463881254196 0.12254463881254196" numOctaves="3" seed="5819" />
          <feDisplacementMap in="shape" scale="4.56976318359375" xChannelSelector="R" yChannelSelector="G" result="displacedImage" width="100%" height="100%" />
          <feMerge result="effect1_texture_2450_5138">
            <feMergeNode in="displacedImage" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}
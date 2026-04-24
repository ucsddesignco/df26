export default function SmallFlower({ className }: { className?: string }) {
  return (
    <svg className={className} width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_g_2450_5137)">
        <path d="M12.2448 2.42517C14.7897 2.97085 16.6349 4.99816 17.0728 7.40943C18.4607 5.38989 20.9748 4.29798 23.5196 4.8436C26.8862 5.56545 29.0302 8.87983 28.3084 12.2464C27.7627 14.7908 25.7359 16.6355 23.3253 17.0737C25.3444 18.4617 26.4368 20.9751 25.8913 23.5195C25.1695 26.8862 21.8551 29.0302 18.4885 28.3083C15.9432 27.7626 14.0981 25.7349 13.6607 23.3231C12.2729 25.3433 9.75863 26.4366 7.21348 25.8909C3.84701 25.169 1.703 21.8545 2.42466 18.488C2.97018 15.9438 4.99662 14.0981 7.40701 13.6596C5.38834 12.2715 4.29644 9.75819 4.84193 7.21399C5.56377 3.84737 8.87816 1.70334 12.2448 2.42517ZM16.077 12.0489C15.1375 13.4164 13.6829 14.3585 12.0505 14.6552C13.4178 15.5951 14.3591 17.0509 14.6555 18.6835C15.5949 17.3165 17.05 16.375 18.6818 16.0781C17.3145 15.1379 16.373 13.6817 16.077 12.0489Z" fill="#ED9699" />
      </g>
      <defs>
        <filter id="filter0_g_2450_5137" x="0" y="0.000274658" width="30.7331" height="30.7328" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feTurbulence type="fractalNoise" baseFrequency="0.12254463881254196 0.12254463881254196" numOctaves="3" seed="5819" />
          <feDisplacementMap in="shape" scale="4.56976318359375" xChannelSelector="R" yChannelSelector="G" result="displacedImage" width="100%" height="100%" />
          <feMerge result="effect1_texture_2450_5137">
            <feMergeNode in="displacedImage" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}
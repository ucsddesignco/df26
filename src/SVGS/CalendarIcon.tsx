import React from "react";

interface CalendarIconProps {
  size?: number;
  color?: string;
  className?: string;
}

const CalendarIcon: React.FC<CalendarIconProps> = ({
  size = 20,
  color = "#191919",
  className,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M15.0013 18.3327V11.666M18.3346 14.9993H11.668"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M9.9987 16.6667H3.33203V9.16667M3.33203 9.16667V5H6.66536M3.33203 9.16667H16.6654V5H13.332M6.66536 2.5V5M6.66536 5H13.332M13.332 2.5V5"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default CalendarIcon;
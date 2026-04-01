import './Button.scss'
import type { ReactElement } from 'react';
import { Link } from "react-router-dom";


interface ButtonProps {
  text: string;
  className?: string;
  onClick?: () => void;
  link?: string;
  icon?: ReactElement;
  disabled?: boolean;
}

const Button = ({
  text,
  className,
  onClick,
  link,
  icon,
  disabled,
}: ButtonProps) => {
  const isExternalLink = link?.startsWith("http");
  return (
    <>
      {link ? (
        <Link
          to={link}
          target={isExternalLink ? "_blank" : "_self"}
          className={`button ${className}`}
        >
          {text}
          {icon && icon}
        </Link>
      ) : (
        <button
          onClick={onClick}
          className={`button ${className}`}
          disabled={disabled}
        >
          <span>{text}</span>
          {icon && icon}
        </button>
      )}
    </>
  );
};

export default Button;
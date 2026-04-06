import "./Button.scss";
import type { ReactElement } from "react";

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
  const classNames = ["button", className].filter(Boolean).join(" ");

  return (
    <>
      {link ? (
        <a
          href={link}
          target={isExternalLink ? "_blank" : undefined}
          rel={isExternalLink ? "noopener noreferrer" : undefined}
          className={classNames}
        >
          {text}
          {icon && icon}
        </a>
      ) : (
        <button
          type="button"
          onClick={onClick}
          className={classNames}
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

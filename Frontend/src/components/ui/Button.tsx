import { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: () => void;
}
const defaultStyles = "flex items-center gap-2 outline-none rounded-lg";
const variantStyles = {
  primary:
    "text-white bg-mypurple-600 hover:bg-mypurple-300 hover:text-mypurple-500",
  secondary:
    "text-mypurple-500 bg-mypurple-300 hover:bg-mypurple-600 hover:text-white",
};
const sizeStyles = {
  sm: "px-1 py-2 text-sm md:px-3 md:py-2 md:text-md",
  md: "px-2 py-2 text-md md:px-4 md:py-2 md:text-lg",
  lg: "px-3 py-3 text-lg md:px-5 md:py-3 md:text-xl",
};
const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className={`${defaultStyles} ${variantStyles[props.variant]} ${
        sizeStyles[props.size]
      }`}
    >
      {props.startIcon}
      {props.text}
      {props.endIcon}
    </button>
  );
};

export default Button;

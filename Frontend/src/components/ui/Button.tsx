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
  primary: "text-white bg-purple-600 hover:bg-purple-300 hover:text-purple-500",
  secondary: "text-purple-500 bg-purple-300 hover:bg-purple-600 hover:text-white",
};
const sizeStyles = {
  sm: "px-4 py-2 text-md",
  md: "px-5 py-3 text-lg",
  lg: "px-6 py-4 text-xl",
};
const Button = (props: ButtonProps) => {
  return (
    <button
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

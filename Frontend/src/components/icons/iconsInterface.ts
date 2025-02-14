export interface IconProps{
    size: "sm" | "md" | "lg"
    className?: string
    onClick?: () => void
}
export const sizeStyles = {
    sm: "size-4",
    md: "size-6",
    lg: "size-8",
  };
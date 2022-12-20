import classNames from "classnames";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;

  className?: string;
  color?: "primary" | "positive" | "black";
  disabled?: boolean;
  loading?: boolean;
  size?: "small" | "medium" | "large";
  light?: boolean;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    children,
    className,
    color = "primary",
    disabled = false,
    loading = false,
    size = "medium",
    light = false,
    ...rest
  } = props;

  return (
    <button
      {...rest}
      disabled={disabled || loading}
      className={classNames(
        className,
        disabled && "cursor-default opacity-50",
        !light &&
          color === "black" &&
          "bg-black text-white hover:bg-[#1a1a1a] disabled:bg-black",
        !light &&
          color === "positive" &&
          "bg-[#43D890] text-white hover:bg-[#0ebb75] disabled:bg-[#43D890]",
        light &&
          color === "black" &&
          "bg-white text-black hover:bg-[#f5f5f5] disabled:bg-white",
        size === "small" && "h-10 text-sm",
        size === "medium" && "h-12 text-base",
        size === "large" && "h-14 text-lg",
        "flex items-center justify-center whitespace-nowrap rounded-full px-4 font-semibold transition-all ",
      )}
    >
      {children}
    </button>
  );
};

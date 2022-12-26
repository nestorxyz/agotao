import classNames from "classnames";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;

  className?: string;
  color?: "primary" | "positive" | "black";
  disabled?: boolean;
  loading?: boolean;
  size?: "small" | "medium" | "large";
  filled?: boolean;
  light?: boolean;
  outline?: boolean;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    children,
    className,
    color = "primary",
    disabled = false,
    loading = false,
    size = "medium",
    filled = false,
    light = false,
    outline = false,
    ...rest
  } = props;

  return (
    <button
      {...rest}
      disabled={disabled || loading}
      className={classNames(
        className,
        disabled && "cursor-default opacity-50",
        filled &&
          color === "black" &&
          "bg-black text-white hover:bg-[#1a1a1a] disabled:bg-black",
        filled &&
          color === "positive" &&
          "bg-[#43D890] text-white hover:bg-[#0ebb75] disabled:bg-[#43D890]",
        light &&
          color === "black" &&
          "bg-white text-black hover:bg-[#f5f5f5] disabled:bg-white",
        outline &&
          color === "black" &&
          "border border-black bg-white text-black hover:bg-[#f5f5f5] disabled:bg-white",
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

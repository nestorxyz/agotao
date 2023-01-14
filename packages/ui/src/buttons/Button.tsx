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
  soft?: boolean;
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
    soft = false,
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
        outline &&
          color === "positive" &&
          "border border-[#43D890] bg-white text-[#43D890] hover:bg-[#f5f5f5] disabled:bg-white",
        soft &&
          color === "black" &&
          "bg-[#f5f5f5] text-black hover:bg-[#e5e5e5] disabled:bg-[#f5f5f5]",
        size === "small" && "h-10 text-sm",
        size === "medium" && "h-12 text-base",
        size === "large" && "h-14 text-lg",
        "flex items-center justify-center whitespace-nowrap rounded-full px-4 font-semibold transition-all active:scale-[0.99]",
      )}
    >
      {children}
    </button>
  );
};

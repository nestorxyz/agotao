import classNames from "classnames";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;

  className?: string;
  color?: "primary" | "positive" | "black";
  size?: "small" | "medium" | "large";
  light?: boolean;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    children,
    className,
    color = "primary",
    size = "medium",
    light = false,
    ...rest
  } = props;

  return (
    <button
      {...rest}
      className={classNames(
        className,
        !light && color === "black" && "bg-black hover:bg-[#1a1a1a]",
        !light && color === "positive" && "bg-[#43D890] hover:bg-[#0ebb75]",
        light && color === "black" && "bg-white text-black hover:bg-[#f5f5f5]",
        size === "small" && "h-10 text-sm",
        size === "medium" && "h-12 text-base",
        size === "large" && "h-14 text-lg",
        "flex w-full items-center justify-center whitespace-nowrap rounded-full px-4 font-semibold text-white transition-all ",
      )}
    >
      {children}
    </button>
  );
};

import classNames from "classnames";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;

  className?: string;
  color?: "primary" | "positive";
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { children, className, color = "primary", ...rest } = props;

  return (
    <button
      {...rest}
      className={classNames(
        className,
        color === "positive" && "bg-[#43D890] hover:bg-[#0ebb75]",
        "flex h-14 w-full items-center justify-center rounded-full  px-5 text-lg font-semibold text-white transition-all ",
      )}
    >
      {children}
    </button>
  );
};

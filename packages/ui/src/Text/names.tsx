import classNames from "classnames";
import { TextProps } from "./Text";

export const H1: React.FC<TextProps> = (props) => {
  const { children, className } = props;

  return (
    <h1 className={classNames(className, "text-3xl font-bold")}>{children}</h1>
  );
};

export const H2: React.FC<TextProps> = (props) => {
  const { children, className } = props;

  return (
    <h2 className={classNames(className, "text-2xl font-semibold")}>
      {children}
    </h2>
  );
};

export const Subtitle: React.FC<TextProps> = (props) => {
  const { children, className } = props;

  return (
    <p className={classNames(className, "text-sm text-gray-500")}>{children}</p>
  );
};

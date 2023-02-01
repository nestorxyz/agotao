import { TextProps } from "./Text";
import { cn } from "@agotao/utils";

export const H1: React.FC<TextProps> = (props) => {
  const { children, className } = props;

  return <h1 className={cn(className, "text-3xl font-bold")}>{children}</h1>;
};

export const H2: React.FC<TextProps> = (props) => {
  const { children, className } = props;

  return (
    <h2 className={cn(className, "text-2xl font-semibold")}>{children}</h2>
  );
};

export const H3: React.FC<TextProps> = (props) => {
  const { children, className } = props;

  return <h3 className={cn(className, "text-xl font-medium")}>{children}</h3>;
};

export const Subtitle: React.FC<TextProps> = (props) => {
  const { children, className } = props;

  return <p className={cn(className, "text-sm text-gray-500")}>{children}</p>;
};

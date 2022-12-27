import * as LabelPrimitive from "@radix-ui/react-label";
import classNames from "classnames";

export interface LabelProps {
  children: React.ReactNode;

  className?: string;
  id?: string;
}

export const Label: React.FC<LabelProps> = (props) => {
  const { children, className, id } = props;

  return (
    <LabelPrimitive.Root
      htmlFor={id}
      className={classNames(className, "text-sm font-medium text-gray-600")}
    >
      {children}
    </LabelPrimitive.Root>
  );
};

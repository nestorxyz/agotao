import classNames from "classnames";
import * as Label from "@radix-ui/react-label";

import { ErrorMessage } from "@/shared/components/ErrorMessage";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  inputClassName?: string;
  name?: string;
  register?: any;
}

export const Input: React.FC<InputProps> = (props) => {
  const { label, inputClassName, name, register, className, error, ...rest } =
    props;

  return (
    <div className={classNames(className, "flex flex-col space-y-1")}>
      {label && (
        <Label.Root
          htmlFor={rest.id}
          className="text-sm font-medium text-gray-600"
        >
          {label}
        </Label.Root>
      )}
      <input
        {...register(name)}
        {...rest}
        className={classNames(
          inputClassName,
          "w-full rounded-md border border-gray-300 p-3 shadow-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm",
        )}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

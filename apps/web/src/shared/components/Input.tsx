import classNames from "classnames";
import * as Label from "@radix-ui/react-label";

import { ErrorMessage } from "./ErrorMessage";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  inputClassName?: string;
  name?: string;
  register?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
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
      <div className="relative">
        <input
          id={rest.id}
          {...(register && register(name))}
          {...rest}
          className={classNames(
            inputClassName,
            "w-full rounded-md border border-gray-300 p-3 shadow-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm",
          )}
        />
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

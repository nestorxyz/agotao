import classNames from "classnames";
import * as Label from "@radix-ui/react-label";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  inputClassName?: string;
}

export const Input: React.FC<InputProps> = (props) => {
  const { label,inputClassName, ...rest } = props;

  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <Label.Root
          htmlFor={rest.id}
          className="text-sm font-medium text-gray-600"
        >
          {label}
        </Label.Root>
      )}
      <input
        {...rest}
        className={classNames(inputClassName,"w-full rounded-md border border-gray-300 p-3 shadow-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm")}
      />
    </div>
  );
};

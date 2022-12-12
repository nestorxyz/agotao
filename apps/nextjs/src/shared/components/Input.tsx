import * as Label from "@radix-ui/react-label";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = (props) => {
  const { label, ...rest } = props;

  return (
    <div className="space-x-1">
      {label && <Label.Root htmlFor={rest.id}>{label}</Label.Root>}
      <input {...rest} />
    </div>
  );
};

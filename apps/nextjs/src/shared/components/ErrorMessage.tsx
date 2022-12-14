export interface ErrorMessageProps {
  children: React.ReactNode;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = (props) => {
  const { children } = props;

  return <span className="text-sm text-red-500">{children}</span>;
};

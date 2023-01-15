import classNames from "classnames";

export interface DividerProps {
  children?: React.ReactNode;
  className?: string;
}

export const Divider: React.FC<DividerProps> = (props) => {
  const { children, className } = props;

  return (
    <div className={classNames(className, "flex items-center gap-2")}>
      {children}
      <div className="flex-1 border-t border-gray-200" />
    </div>
  );
};

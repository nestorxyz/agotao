import classNames from "classnames";

export interface DividerProps {
  className?: string;
}

export const Divider: React.FC<DividerProps> = (props) => {
  const { className } = props;

  return <div className={classNames(className, "border-t border-gray-100")} />;
};

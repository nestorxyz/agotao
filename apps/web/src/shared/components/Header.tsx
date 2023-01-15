import classNames from "classnames";
import Image from "next/image";

export interface HeaderProps {
  className?: string;
  children?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = (props) => {
  const { className, children } = props;

  return (
    <header
      className={classNames(
        className,
        "flex h-20 items-center border-b border-gray-100 bg-white px-4",
      )}
    >
      <div className="mx-auto flex w-full max-w-5xl justify-between">
        <Image src="/isotipo.svg" alt="logo" width={100} height={30} />
        {children}
      </div>
    </header>
  );
};

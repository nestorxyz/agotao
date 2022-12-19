import classNames from "classnames";
import Image from "next/image";

import { Button } from "@/shared/components";

export interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = (props) => {
  const { className } = props;

  return (
    <header
      className={classNames(className, "flex items-center bg-white py-5 px-4")}
    >
      <div className="mx-auto flex w-full max-w-5xl justify-between">
        <Image src="/isotipo.svg" alt="logo" width={124} height={30} />
        <div className="flex items-center gap-4">
          <Button color="black" light size="large">
            Wallet
          </Button>
          <Button color="black" light size="large">
            Developers
          </Button>
          <Button color="black" light size="large">
            Precios
          </Button>
        </div>
        <Button color="black" size="large" className="px-8">
          Ingresar
        </Button>
      </div>
    </header>
  );
};

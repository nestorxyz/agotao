import classNames from "classnames";
import Image from "next/image";

import { Button } from "@/shared/components";

// Hooks
import useViewportSize from "@/shared/hooks/use-viewport-size";

export interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = (props) => {
  const { className } = props;
  const { width } = useViewportSize();

  return (
    <header
      className={classNames(className, "flex items-center bg-white py-5 px-4")}
    >
      <div className="mx-auto flex w-full max-w-5xl justify-between">
        <Image src="/isotipo.svg" alt="logo" width={124} height={30} />
        <div className="hidden items-center gap-4 md:flex">
          <Button color="black" light size="large" disabled>
            Wallet
          </Button>
          <Button color="black" light size="large" disabled>
            Developers
          </Button>
          <Button color="black" light size="large" disabled>
            Precios
          </Button>
        </div>
        <Button
          color="black"
          size={width > 768 ? "large" : "medium"}
          className="px-8"
          disabled
        >
          Ingresar
        </Button>
      </div>
    </header>
  );
};

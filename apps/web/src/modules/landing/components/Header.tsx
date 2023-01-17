import classNames from "classnames";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";

import { Button } from "@/shared/components";

// Hooks
import useViewportSize from "@/shared/hooks/use-viewport-size";

export interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = (props) => {
  const { className } = props;

  const [isOpen, setIsOpen] = useState(false);
  const { width } = useViewportSize();
  const router = useRouter();

  return (
    <header
      className={classNames(className, "flex items-center bg-white py-5 px-4")}
    >
      <div className="mx-auto flex w-full max-w-6xl justify-between">
        <Image src="/isotipo.svg" alt="logo" width={124} height={30} />

        <div className="my-auto h-fit md:hidden">
          {isOpen ? (
            <Cross1Icon
              className="h-6 w-6 cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          ) : (
            <HamburgerMenuIcon
              className="h-6 w-6 cursor-pointer"
              onClick={() => setIsOpen(true)}
            />
          )}
        </div>

        <AnimatePresence>
          {isOpen && width < 768 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-20 left-0 z-10 flex h-full w-full flex-col gap-6 bg-white px-4"
            >
              <Button
                color="black"
                light
                size="large"
                onClick={() => window.open("https://demo.agotao.com", "_blank")}
              >
                Demo
              </Button>
              <Button
                color="black"
                light
                size="large"
                onClick={() => window.open("https://docs.agotao.com", "_blank")}
              >
                Documentación
              </Button>
              <Button
                filled
                color="black"
                className="px-8"
                size="large"
                onClick={() => router.push("/login")}
              >
                Ingresar
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="hidden gap-6 md:flex">
          <Button
            color="black"
            light
            size="large"
            onClick={() => window.open("https://demo.agotao.com", "_blank")}
          >
            Demo
          </Button>
          <Button
            color="black"
            light
            size="large"
            onClick={() => window.open("https://docs.agotao.com", "_blank")}
          >
            Documentación
          </Button>
          <Button
            filled
            color="black"
            className="px-8"
            size="large"
            onClick={() => router.push("/login")}
          >
            Ingresar
          </Button>
        </div>
      </div>
    </header>
  );
};

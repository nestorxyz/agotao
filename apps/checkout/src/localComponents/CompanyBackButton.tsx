import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Image from "next/image";

interface CompanyBackButtonProps {
  name: string;
  logo: string;
  onClick?: () => void;
  processing?: boolean;
}

export const CompanyBackButton: React.FC<CompanyBackButtonProps> = (props) => {
  const { name, logo, onClick, processing } = props;

  return (
    <button
      className={classNames(
        "group relative flex h-8 min-w-[100px] items-center",
        processing ? "cursor-default" : "cursor-pointer",
      )}
      onClick={processing ? undefined : onClick}
      title={"Ir a la página de la empresa"}
    >
      <AnimatePresence>
        {!processing && (
          <motion.div
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0, scale: 0, x: 5 }}
            className="pr-2 lg:absolute lg:-left-6 lg:p-0"
          >
            <ArrowLeftIcon className="h-5 w-5 text-gray-400 transition-all group-hover:-translate-x-[2px] group-hover:scale-105 group-hover:text-gray-800" />
          </motion.div>
        )}
      </AnimatePresence>

      <Image
        src={logo}
        alt={name}
        width={100}
        height={100}
        className={classNames(
          "h-7 w-7 rounded-full object-cover",
          !processing && "group-hover:hidden",
        )}
      />

      <h1
        className={classNames(
          "pl-2 text-sm font-semibold",
          !processing && "group-hover:hidden",
        )}
      >
        {name}
      </h1>

      <h1
        className={classNames(
          "hidden text-sm font-semibold",
          !processing && "group-hover:block",
        )}
      >
        Regresar
      </h1>
    </button>
  );
};

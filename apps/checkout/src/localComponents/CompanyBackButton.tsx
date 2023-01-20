import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Image from "next/image";

interface CompanyBackButtonProps {
  name: string;
  logo: string;
  onClick?: () => void;
}

export const CompanyBackButton: React.FC<CompanyBackButtonProps> = (props) => {
  const { name, logo, onClick } = props;

  return (
    <button
      className="group relative flex h-8 min-w-[100px] items-center gap-2"
      onClick={onClick}
      title={"Ir a la página de la empresa"}
    >
      <ArrowLeftIcon className="h-5 w-5 text-gray-400 transition-all group-hover:-translate-x-[2px] group-hover:scale-105 group-hover:text-gray-800 lg:absolute lg:-left-6" />

      <Image
        src={logo}
        alt={name}
        width={100}
        height={100}
        className="h-7 w-7 rounded-full object-cover group-hover:hidden"
      />

      <h1 className="text-sm font-semibold group-hover:hidden">{name}</h1>

      <h1 className="hidden text-sm font-semibold group-hover:block">
        Regresar
      </h1>
    </button>
  );
};

import Image from "next/image";

export const Header: React.FC = () => {
  return (
    <header className="flex h-20 items-center border-b border-gray-100 px-4">
      <div className="w-full max-w-7xl">
        <Image src="/isotipo.svg" alt="logo" width={100} height={30} />
      </div>
    </header>
  );
};

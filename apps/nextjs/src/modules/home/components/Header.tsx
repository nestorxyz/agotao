import classNames from "classnames";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

import { Button, User } from "@/shared/components";

export interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = (props) => {
  const { className } = props;
  const { data } = useSession();

  if (!data) {
    return <></>;
  }

  return (
    <header
      className={classNames(className, "flex items-center bg-white py-5 px-4")}
    >
      <div className="mx-auto flex w-full max-w-6xl justify-between">
        <Image src="/isotipo.svg" alt="logo" width={124} height={30} />
        <User
          image={data.user.image}
          name={data.user.name}
          username={data.user.username}
          className="rounded-full px-5 transition-all"
        />
        <Button
          onClick={() =>
            signOut({
              callbackUrl: "/",
            })
          }
          color="black"
          light
        >
          Cerrar sesión
        </Button>
      </div>
    </header>
  );
};

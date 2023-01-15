import classNames from "classnames";
import Image from "next/image";
import { useRouter } from "next/router";
import { signOut } from "@/shared/utils/firebaseAuth";
import { useAuth } from "@/shared/hooks/useAuth";

import { Button, User } from "@/shared/components";

export interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = (props) => {
  const { className } = props;

  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    return <></>;
  }

  return (
    <header
      className={classNames(className, "flex items-center bg-white py-5 px-4")}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col justify-between sm:flex-row">
        <Image src="/isotipo.svg" alt="logo" width={124} height={30} />
        <User
          image={user.image ?? ""}
          name={user.name}
          username={user.email}
          className="rounded-full transition-all"
        />
        <Button
          onClick={async () => {
            await signOut();
            router.push("/login");
          }}
          color="black"
          light
        >
          Cerrar sesión
        </Button>
      </div>
    </header>
  );
};

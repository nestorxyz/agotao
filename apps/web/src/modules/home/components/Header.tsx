import classNames from "classnames";
import Image from "next/image";
import { useRouter } from "next/router";
import { signOut } from "@/shared/utils/firebaseAuth";
import { useAuth } from "@/shared/hooks/useAuth";

import { Button, User } from "@/shared/components";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/DropdownMenu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/Avatar";

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
      <div className="mx-auto flex w-full max-w-6xl justify-between">
        <Image src="/isotipo.svg" alt="logo" width={124} height={30} />
        <DropdownMenu>
          <DropdownMenuTrigger className="items-center gap-2 sm:flex">
            <Avatar>
              <AvatarImage src={user.image ?? undefined} />
              <AvatarFallback>
                {user.name[0] ? user.name[0].toUpperCase() : "Hi"}
              </AvatarFallback>
            </Avatar>
            <p className="hidden font-semibold text-gray-700 sm:block">
              {user.email}
            </p>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-4 sm:m-0 sm:min-w-[192px]">
            <DropdownMenuItem
              onClick={async () => {
                await signOut();
                router.push("/login");
              }}
            >
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";

import { AuthContent } from "@/modules/auth/components";
import { DefaultHead } from "@/shared/components";

const JoinPage: NextPage = () => {
  return (
    <>
      <DefaultHead siteName="Ingresar" />
      <div className="flex h-full w-full flex-col">
        <header className="flex items-center bg-white py-5 px-4">
          <div className="mx-auto flex w-full max-w-6xl justify-between">
            <Link href="/">
              <Image src="/isotipo.svg" alt="logo" width={124} height={30} />
            </Link>
          </div>
        </header>
        <AuthContent className="mx-auto mb-4" />
      </div>
    </>
  );
};

export default JoinPage;

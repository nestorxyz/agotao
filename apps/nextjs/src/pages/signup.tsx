import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";

import { AuthContent } from "@/modules/auth";
import { DefaultHead } from "@/shared/components";

const SignupPage: NextPage = () => {
  const handleSuccess = () => {
    console.log("success");
  };

  return (
    <>
      <DefaultHead title="Crear cuenta" />
      <div className="flex h-full w-full flex-col">
        <header className="flex items-center bg-white py-5 px-4">
          <div className="mx-auto flex w-full max-w-6xl justify-between">
            <Link href="/">
              <Image src="/isotipo.svg" alt="logo" width={124} height={30} />
            </Link>
          </div>
        </header>
        <AuthContent
          className="mx-auto mb-4"
          usingFor="page"
          initTab="register"
          onSuccess={handleSuccess}
          callbackUrl="/home"
        />
      </div>
    </>
  );
};

export default SignupPage;

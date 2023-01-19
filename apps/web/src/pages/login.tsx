import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { AuthContent } from "@/modules/auth";
import { DefaultHead, Dots } from "@/shared/components";

// Hooks
import { useAuth } from "@/shared/hooks/useAuth";
import mixpanel from "@/shared/lib/mixpanel";

const LoginPage: NextPage = () => {
  const { user, loading } = useAuth();

  const router = useRouter();

  if (loading) {
    return (
      <>
        <DefaultHead title="Validando sesión" />
        <div className="flex h-screen w-full items-center justify-center">
          <Dots />
        </div>
      </>
    );
  }

  if (user) {
    mixpanel.identify(user.uid);
    mixpanel.people.set_once({
      $email: user.email,
      $name: user.name,
    });
    mixpanel.track("Login", {
      $email: user.email,
      $name: user.name,
    });
    router.push("/home");

    return <></>;
  }

  return (
    <>
      <DefaultHead title="Iniciar sesión" />
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
          initTab="login"
          callbackUrl="/home"
        />
      </div>
    </>
  );
};

export default LoginPage;

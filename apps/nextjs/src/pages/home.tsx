import { NextPage } from "next";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

// Components
import { Button, DefaultHead, Dots } from "@/shared/components";
import { CreateCompanyButton } from "@/modules/home/components";

const HomePage: NextPage = () => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <>
        <DefaultHead title="Loading Home" />
        <div className="flex h-screen w-full items-center justify-center">
          <Dots />
        </div>
      </>
    );
  }

  if (status === "unauthenticated") {
    router.push("/login");

    return <></>;
  }

  return (
    <>
      <DefaultHead title="Home" />
      <div className="relative min-h-screen">
        <CreateCompanyButton />
        <Button
          onClick={() =>
            signOut({
              callbackUrl: "/",
            })
          }
        >
          Cerrar sesión
        </Button>
      </div>
    </>
  );
};

export default HomePage;

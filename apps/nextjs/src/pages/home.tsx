import { NextPage } from "next";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

// Components
import { Button, DefaultHead, Dots } from "@/shared/components";

const HomePage: NextPage = () => {
  const { data: session, status } = useSession();
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
      <div>
        <Button>Crear Negocio</Button>
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

import { NextPage } from "next";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

// Components
import { Button, DefaultHead, Dots, User } from "@/shared/components";
import { CreateCompanyButton } from "@/modules/home/components";

const HomePage: NextPage = () => {
  const { data, status } = useSession();
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

  if (status === "authenticated" && data) {
    return (
      <>
        <DefaultHead title="Home" />
        <div className="relative min-h-screen w-full">
          <User
            image={data.user.image}
            name={data.user.name}
            username={data.user.username}
          />

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
  }

  return <></>;
};

export default HomePage;

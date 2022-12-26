import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

// Components
import { DefaultHead, Dots } from "@/shared/components";
import { Header, MyCompanies } from "@/modules/home/components";

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
        <Header />
        <main className="mx-auto mb-10 flex w-full max-w-3xl flex-col items-center justify-center px-4 xl:px-0">
          <MyCompanies />
        </main>
      </>
    );
  }

  return <></>;
};

export default HomePage;

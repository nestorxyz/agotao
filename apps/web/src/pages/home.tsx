import { NextPage } from "next";
import { useRouter } from "next/router";
import { useAuth } from "@/shared/hooks/useAuth";

// Components
import { DefaultHead, Dots } from "@/shared/components";
import { Header, MyCompanies, MySales } from "@/modules/home/components";

const HomePage: NextPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <>
        <DefaultHead title="Loading Home" />
        <div className="flex h-screen w-full items-center justify-center">
          <Dots />
        </div>
      </>
    );
  }

  if (!user) {
    router.push("/login");

    return <></>;
  }

  if (user) {
    return (
      <>
        <DefaultHead title="Home" />
        <Header />
        <main className="mx-auto mb-10 flex w-full max-w-3xl flex-col items-center justify-center gap-4 px-4 xl:px-0">
          <MyCompanies />
          <MySales />
        </main>
      </>
    );
  }

  return <></>;
};

export default HomePage;

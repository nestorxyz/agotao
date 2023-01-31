import { NextPage } from "next";
import { useRouter } from "next/router";
import { useAuth } from "@/shared/hooks/useAuth";

// Components
import { DefaultHead, Dots } from "@/shared/components";
import { Header } from "@/modules/home/components";

import HomeScreen from "@/modules/home";

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
        <Header />
        <HomeScreen />
      </>
    );
  }

  return <></>;
};

export default HomePage;

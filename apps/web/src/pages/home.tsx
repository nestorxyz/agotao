import { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/shared/hooks/useAuth";

// Components
import { DefaultHead, Dots } from "@/shared/components";
import {
  Header,
  MyCompanies,
  MySales,
  Layout,
} from "@/modules/home/components";

import { HomeScreen } from "@/modules/home/types";

const HomePage: NextPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [screen, setScreen] = useState<HomeScreen>(HomeScreen.project);

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
        <Layout setScreen={setScreen}>
          <MyCompanies />
          <MySales />
        </Layout>
      </>
    );
  }

  return <></>;
};

export default HomePage;

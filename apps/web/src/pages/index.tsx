import { useEffect } from "react";

// Components
import { DefaultHead } from "@/shared/components";
import {
  Header,
  Title,
  Preview,
  Features,
  Footer,
  Developers,
} from "@/modules/landing/components";

// Types
import type { NextPage } from "next";
import mixpanel from "@/shared/lib/mixpanel";

const Home: NextPage = () => {
  useEffect(() => {
    mixpanel.track("Landing Hit");
  }, []);

  return (
    <>
      <DefaultHead />

      <Header />

      <main className="mx-auto mb-10 flex w-full max-w-6xl flex-col items-center justify-center px-4 xl:px-0">
        <Title />

        <Preview />

        <Features />

        <Developers />
      </main>

      <Footer />
    </>
  );
};

export default Home;

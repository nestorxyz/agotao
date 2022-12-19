// Components
import { DefaultHead } from "@/shared/components";
import { Header, Title } from "@/modules/landing/components";

// Types
import type { NextPage, GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const subdomain = context.req.headers.host?.split(".")[0];

  console.log(subdomain);

  return {
    props: {},
  };
};

const Home: NextPage = () => {
  return (
    <>
      <DefaultHead />

      <Header />

      <main className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center">
        <Title />
      </main>
    </>
  );
};

export default Home;

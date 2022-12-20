// Components
import { DefaultHead } from "@/shared/components";
import { Header, Title, Cards, Preview } from "@/modules/landing/components";

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

      <main className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center px-4 xl:px-0">
        <Title />

        <div className="mt-16 flex w-full flex-col-reverse justify-between gap-8 md:mt-24 lg:flex-row lg:items-center">
          <Cards />
          <Preview />
        </div>
      </main>
    </>
  );
};

export default Home;

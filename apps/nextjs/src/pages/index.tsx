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

      <main className="mx-auto mb-10 flex w-full max-w-6xl flex-col items-center justify-center px-4 xl:px-0">
        <Title />

        <div className="mt-16 flex w-full flex-col-reverse justify-between gap-8 md:mt-24 lg:flex-row lg:items-center">
          <Cards />
          <div className="flex w-full flex-col gap-4">
            <Preview />

            <p>
              ¿Necesitas una nueva solución?{" "}
              <a
                href="https://twitter.com/nestoredduardo"
                target="_blank"
                rel="noreferrer"
                className="font-bold text-primary"
              >
                Escríbenos
              </a>
              , la implementamos y te llevas 3 meses libres de comisiones.
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

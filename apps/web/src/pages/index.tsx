// Components
import { DefaultHead } from "@/shared/components";
import { Header, Title, Cards, Preview } from "@/modules/landing/components";

// Types
import type { NextPage } from "next";

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

            <p className="text-sm text-gray-600 md:text-base">
              ¿Necesitas una nueva solución?{" "}
              <a
                href="https://twitter.com/nestoredduardo"
                target="_blank"
                rel="noreferrer"
                className="font-bold text-primary"
              >
                Escríbenos 🪄
              </a>
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

import Image from "next/image";
import Head from "next/head";

const Home = () => {
  return (
    <div className="flex min-h-screen justify-center bg-black text-white">
      <Head>
        <title>Agotao API - Ready</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="mt-20 p-4 text-center">
        <h1 className="mb-6 text-4xl font-medium">Agotao API</h1>
        <h3 className="text-lg">Hi, what are you going to ship today?</h3>
        <p className="text-base">
          Show your thing on Twitter and{" "}
          <a
            className="link font-medium text-pink-500 underline"
            href="https://twitter.com/nestoredduardo"
          >
            tag us @nestoredduardo
          </a>
          🪄
        </p>

        <Image
          src="/deku-izuku-midoriya.gif"
          alt="Deku"
          width={600}
          height={600}
          className="mx-auto mt-6 w-full max-w-sm"
        />

        <p className="text-base">
          Want to see the api docs?{" "}
          <a
            className="underline"
            href="https://docs.agotao.com"
            target="_blank"
            rel="noreferrer"
          >
            Click here (docs.agotao.com)
          </a>
        </p>
      </div>
    </div>
  );
};

export default Home;

import Head from "next/head";

export const DefaultHead: React.FC = () => {
  return (
    <Head>
      <title>Agotao</title>
      <meta
        name="description"
        content="Procesamiento de pagos sin complicaciones"
      />
      <link rel="icon" href="/favicon.svg" />
    </Head>
  );
};

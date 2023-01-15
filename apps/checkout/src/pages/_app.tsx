import { Toaster } from "react-hot-toast";

// Styles
import "@/styles/globals.css";

// Utils
import { trpc } from "@/lib/trpc";

// Types
import type { AppType } from "next/app";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
        }}
      />
      <Component {...pageProps} />
    </>
  );
};

export default trpc.withTRPC(MyApp);

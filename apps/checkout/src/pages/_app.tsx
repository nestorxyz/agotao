import { AuthProvider } from "@/context/auth";

// Styles
import "@/styles/globals.css";

// Utils
import { trpc } from "../lib/trpc";

// Types
import type { AppType } from "next/app";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default trpc.withTRPC(MyApp);
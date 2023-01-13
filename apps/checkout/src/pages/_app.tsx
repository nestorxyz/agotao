import { AuthProvider } from "@/shared/context/auth";

// Styles
import "@/shared/styles/globals.css";

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

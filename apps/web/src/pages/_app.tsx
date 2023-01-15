import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/shared/context/auth";

// Styles
import "@/shared/styles/globals.css";
import "@tremor/react/dist/esm/tremor.css";

// Utils
import { trpc } from "../utils/trpc";

// Types
import type { AppType } from "next/app";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <AuthProvider>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
        }}
      />
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default trpc.withTRPC(MyApp);

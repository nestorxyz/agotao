import { useEffect } from "react";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/shared/context/auth";
import NextNProgress from "nextjs-progressbar";

// Styles
import "@/shared/styles/globals.css";
import "@tremor/react/dist/esm/tremor.css";

// Utils
import { trpc } from "../utils/trpc";
import mixpanel from "@/shared/lib/mixpanel";

// Types
import type { AppType } from "next/app";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      mixpanel.track("Page View", {
        url,
      });
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <AuthProvider>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
        }}
      />
      <NextNProgress color="#694fff" />
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default trpc.withTRPC(MyApp);

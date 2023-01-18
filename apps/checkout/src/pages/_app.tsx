import { useEffect } from "react";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";

// Styles
import "@/styles/globals.css";

// Utils
import { trpc } from "@/lib/trpc";
import mixpanel from "@/lib/mixpanel";

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

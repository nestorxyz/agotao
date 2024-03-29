import { useEffect } from "react";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import NextNProgress from "nextjs-progressbar";
import { Analytics } from "@vercel/analytics/react";

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
      <NextNProgress color="#694fff" />

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
        }}
      />
      <Component {...pageProps} />
      <Analytics />
    </>
  );
};

export default trpc.withTRPC(MyApp);

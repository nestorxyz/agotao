// Types
import type { GetServerSideProps, GetServerSidePropsContext } from "next";

// Utils
import { getServerSession } from "@acme/auth";

export const requireAuth = (getServerSideProps: GetServerSideProps) => {
  return async (ctx: GetServerSidePropsContext) => {
    const session = await getServerSession(ctx);

    if (!session) {
      return {
        redirect: {
          destination: "/signup",
          permanent: false,
        },
      };
    }

    return getServerSideProps(ctx);
  };
};

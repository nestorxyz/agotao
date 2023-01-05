import { NextPage } from "next";
import { useRouter } from "next/router";

// Components
import { DefaultHead, Dots } from "@/shared/components";
import { Payouts } from "@/modules/n/components";

// Hooks
import { useAuth } from "@/shared/hooks/useAuth";

const NPage: NextPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <>
        <DefaultHead title="Validando sesión" />
        <div className="flex h-screen w-full items-center justify-center">
          <Dots />
        </div>
      </>
    );
  }

  if (!user) {
    router.push("/login");
    return <></>;
  }

  if (user?.role !== "ADMIN") {
    router.push("/home");
    return <></>;
  }

  return (
    <div>
      N Page
      <Payouts />
    </div>
  );
};

export default NPage;

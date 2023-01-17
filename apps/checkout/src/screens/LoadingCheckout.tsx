import { DefaultHead, Dots } from "@/components";

export const LoadingCheckout: React.FC = () => {
  return (
    <>
      <DefaultHead title="Loading Checkout" />
      <div className="flex h-screen w-full items-center justify-center">
        <Dots />
      </div>
    </>
  );
};

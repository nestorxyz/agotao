import { NextPage } from "next";

// Components
import { DefaultHead } from "@/shared/components";
import Checkout from "@/modules/checkout";

const Demo: NextPage = () => {
  return (
    <>
      <DefaultHead />
      <Checkout />
    </>
  );
};

export default Demo;

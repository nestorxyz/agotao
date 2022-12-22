import { NextPage, GetServerSideProps } from "next";

import { requireAuth } from "@/shared/utils/requireAuth";

export const getServerSideProps: GetServerSideProps = requireAuth(async () => {
  return {
    props: {},
  };
});

const HomePage: NextPage = () => {
  return <div></div>;
};

export default HomePage;

import { DefaultHead } from "@/shared/components";
import { trpc } from "@/utils/trpc";

const Home: React.FC = () => {
  const { data, error } = trpc.web.dashboard.getCompanies.useQuery();

  return (
    <>
      <DefaultHead title="Home" />
    </>
  );
};

export default Home;

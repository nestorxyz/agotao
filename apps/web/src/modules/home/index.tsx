import { trpc } from "@/utils/trpc";

import Loading from "./components/Loading";
import CreateCompany from "./components/CreateCompany";
import CompanyScreen from "./screens";

const Home: React.FC = () => {
  const { data, error, refetch } = trpc.web.dashboard.getCompanies.useQuery();

  if (!data && !error) {
    <Loading />;
  }

  if (error || !data) {
    return <div>Something went wrong</div>;
  }

  if (data?.result.length === 0) {
    return (
      <div className="flex w-full sm:justify-center sm:py-10">
        <CreateCompany onCreated={() => refetch()} />
      </div>
    );
  }

  if (data?.result.length > 0) {
    return <CompanyScreen companies={data.result} />;
  }

  return <></>;
};

export default Home;

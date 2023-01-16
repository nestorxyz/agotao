// Services
import { trpc } from "@/utils/trpc";

// Components
import { CreateCompanyButton } from "@/modules/home/components";
import { CompanyInfo } from "./CompanyInfo";

export const MyCompanies: React.FC = () => {
  const { data, refetch, isLoading } = trpc.company.getCompany.useQuery();

  return (
    <div className="w-full">
      {isLoading && <p>Cargando...</p>}

      {data?.result === null && (
        <CreateCompanyButton onCreated={() => refetch()} />
      )}

      {data?.result && <CompanyInfo company={data.result} refetch={refetch} />}
    </div>
  );
};

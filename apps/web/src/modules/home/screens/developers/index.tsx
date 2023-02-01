import { trpc } from "@/utils/trpc";

import { Text } from "@/shared/components";
import Overview from "./Overview";

interface DevelopersProps {
  company_id: string;
}

const Developers: React.FC<DevelopersProps> = (props) => {
  const { company_id } = props;

  const {
    data: company,
    isInitialLoading,
    refetch,
  } = trpc.web.dashboard.developers.getPageData.useQuery({
    company_id,
  });

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:gap-20">
      <Text.H3 className="text-base">Desarrolladores</Text.H3>
      <div>
        <Text.H2 className="mb-1">Tu integración</Text.H2>
        <Text.Subtitle className="mb-8">
          Conoce cómo integrar tu sistema con nuestra API, visitando nuestra{" "}
          <a
            className="font-medium text-primary"
            href="https://docs.agotao.com/"
            target="_blank"
            rel="noreferrer"
          >
            documentación
          </a>
        </Text.Subtitle>

        {isInitialLoading && <div>Cargando...</div>}

        {company && (
          <Overview
            refetch={refetch}
            company_id={company_id}
            company_sk_live={company.sk_live}
            company_webhook_url={company.webhook_url}
          />
        )}
      </div>
    </div>
  );
};

export default Developers;

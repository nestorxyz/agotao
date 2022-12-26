import Image from "next/image";

// Services
import { trpc } from "@/utils/trpc";

// Components
import { Text } from "@/shared/components";
import {
  CreateCompanyButton,
  CreateProductButton,
} from "@/modules/home/components";

export const MyCompanies: React.FC = () => {
  const { data, refetch, isLoading } = trpc.company.getAll.useQuery();

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <Text.H1>Mis negocios</Text.H1>
        <CreateCompanyButton onCreated={() => refetch()} />
      </div>

      {isLoading && <p>Cargando...</p>}

      <section>
        {data?.result.map((company) => (
          <article key={company.id} className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <Image
                src={company.image}
                alt={company.name}
                width={100}
                height={100}
                className="h-16 w-16 overflow-hidden rounded-full object-cover"
              />
              <div>
                <p className="truncate font-semibold">{company.name}</p>
                <p className="text-gray-500">@{company.username}</p>
              </div>
            </div>
            <CreateProductButton companyId={company.id} />
          </article>
        ))}
      </section>
    </div>
  );
};

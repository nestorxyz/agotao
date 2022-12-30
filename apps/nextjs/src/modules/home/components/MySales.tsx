// Services
import { trpc } from "@/utils/trpc";

// Components
import { Text } from "@/shared/components";

export const MySales: React.FC = () => {
  const { data, isLoading } = trpc.purchase.getUserSales.useQuery();

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <Text.H1>Mis ventas</Text.H1>
      </div>

      {isLoading && <p>Cargando...</p>}

      <section>
        {data?.result.map((sale) => (
          <article key={sale.id}></article>
        ))}
      </section>
    </div>
  );
};

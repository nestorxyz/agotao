import Image from "next/image";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

// Services
import { trpc } from "@/utils/trpc";

// Components
import { Text, Button } from "@/shared/components";
import {
  CreateCompanyButton,
  CreateProductButton,
} from "@/modules/home/components";

// Utils
import { copyToClipboard } from "@/shared/utils/copyToClipboard";
import { env } from "@/env/client.mjs";

export const MyCompanies: React.FC = () => {
  const { data, refetch, isLoading } = trpc.company.getAll.useQuery();

  const router = useRouter();

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <Text.H1>Mis negocios</Text.H1>
        <CreateCompanyButton onCreated={() => refetch()} />
      </div>

      {isLoading && <p>Cargando...</p>}

      <section>
        {data?.result.map((company) => (
          <article key={company.id}>
            <div className="flex items-center gap-5">
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
              <CreateProductButton
                companyId={company.id}
                onCreated={() => refetch()}
              />
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {company.products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-2 rounded-lg border border-[#ffedfa] p-4 shadow-[rgba(255,79,203,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={100}
                    height={100}
                    className="h-16 w-16 overflow-hidden rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <p className="truncate text-lg font-semibold">
                      {product.name}
                    </p>
                    <div className="flex w-full items-center justify-between">
                      <p className="whitespace-nowrap text-gray-500">
                        S/. {product.price}
                      </p>
                      <Button
                        soft
                        color="black"
                        size="small"
                        onClick={() => {
                          copyToClipboard({
                            text: `${env.NEXT_PUBLIC_APP_URL}/${company.username}/${product.id}`,
                            onSuccess: () => {
                              toast.success("Copiado al portapapeles");
                            },
                          });
                        }}
                      >
                        Copiar link
                      </Button>
                      <Button
                        soft
                        color="black"
                        size="small"
                        onClick={() => {
                          router.push(`/${company.username}/${product.id}`);
                        }}
                      >
                        Ver
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div></div>
          </article>
        ))}
      </section>
    </div>
  );
};

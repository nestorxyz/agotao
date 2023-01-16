import Image from "next/image";
import { toast } from "react-hot-toast";
import { IoCopy } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateWebhookURL, updateWebhookURLSchema } from "@acme/validations";

// Services
import { trpc } from "@/utils/trpc";

// Components
import { Text, Button, Input } from "@/shared/components";
import {
  CreateCompanyButton,
  CreateProductButton,
  PayoutButton,
} from "@/modules/home/components";

// Utils
import { copyToClipboard } from "@/shared/utils/copyToClipboard";

export const MyCompanies: React.FC = () => {
  const { data, refetch, isLoading } = trpc.company.getCompany.useQuery();

  const createSecretKeyMutation = trpc.company.createSecretKey.useMutation({
    onSuccess: (data) => {
      refetch();
      toast.success(data.message + " y copiado al portapapeles");
      navigator.clipboard.writeText(data.result.sk_live as string);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateWebhookURL>({
    resolver: zodResolver(updateWebhookURLSchema),
    defaultValues: {
      company_id: data?.result?.id,
      webhook_url: data?.result?.webhook_url || "",
    },
  });

  const updateWebhookUrlMutation = trpc.web.updateWebhookURL.useMutation({
    onSuccess: () => {
      refetch();
      toast.success("Webhook URL actualizado");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <div className="w-full">
      {isLoading && <p>Cargando...</p>}

      {data?.result === null && (
        <CreateCompanyButton onCreated={() => refetch()} />
      )}

      {data?.result && (
        <section>
          <article className="space-y-8">
            <div className="flex flex-col gap-5 sm:flex-row">
              <div className="flex items-center gap-2">
                <Image
                  src={data.result.image}
                  alt={data.result.name}
                  width={100}
                  height={100}
                  className="h-12 w-12 overflow-hidden rounded-full object-cover sm:h-16 sm:w-16"
                />
                <div>
                  <p className="truncate font-semibold">{data.result.name}</p>
                  <p className="text-gray-500">@{data.result.username}</p>
                </div>
              </div>
              <div className="flex w-full max-w-xs justify-between rounded-lg bg-gray-50 p-4">
                <div>
                  <h2 className="text-gray-600">Balance disponible</h2>
                  <p className="text-2xl font-bold">
                    S/. {data.result.balance}
                  </p>
                </div>
                <PayoutButton
                  company_id={data.result.id}
                  balance={data.result.balance}
                />
              </div>
            </div>

            <div>
              <Text.H2>Desarrolladores</Text.H2>
              <Text.Subtitle className="mb-2">
                Utiliza la Secret Key solo en el backend de tu aplicación
              </Text.Subtitle>
              <div className="flex flex-col justify-center gap-2 sm:flex-row sm:items-center">
                Secret API Key:
                {data.result.sk_live ? (
                  <Button
                    color="black"
                    soft
                    onClick={() => {
                      data.result?.sk_live &&
                        copyToClipboard({
                          text: data.result.sk_live,
                          onSuccess: () => toast.success("API KEY copiado"),
                        });
                    }}
                    className="truncate"
                  >
                    <IoCopy className="mr-2" />

                    {data.result.sk_live}
                  </Button>
                ) : (
                  <Button
                    onClick={() =>
                      createSecretKeyMutation.mutate({
                        company_id: data.result?.id as string,
                      })
                    }
                    loading={createSecretKeyMutation.isLoading}
                  >
                    Generar API KEY
                  </Button>
                )}
              </div>
              <div className="flex items-end gap-2">
                <Input
                  label="Webhook URL"
                  name="webhook_url"
                  register={register}
                  error={errors.webhook_url?.message}
                  className="w-full"
                />
                <Button
                  color="black"
                  outline
                  onClick={handleSubmit((data) =>
                    updateWebhookUrlMutation.mutate(data),
                  )}
                  loading={updateWebhookUrlMutation.isLoading}
                >
                  Guardar
                </Button>
              </div>
            </div>

            <div>
              <div className="flex gap-2">
                <Text.H2>Productos</Text.H2>
                <CreateProductButton
                  companyId={data.result.id}
                  onCreated={() => refetch()}
                />
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {data.result.products.map((product) => (
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
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </section>
      )}
    </div>
  );
};
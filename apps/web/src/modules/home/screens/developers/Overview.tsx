import { trpc } from "@/utils/trpc";
import { toast } from "react-hot-toast";
import { IoCopy } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateWebhookURL, updateWebhookURLSchema } from "@acme/validations";

import { copyToClipboard } from "@/shared/utils/copyToClipboard";

import { Button, Input } from "@/shared/components";

interface DevelopersOverviewProps {
  refetch: () => void;
  company_id: string;
  company_sk_live: string | null;
  company_webhook_url: string | null;
}

const Overview: React.FC<DevelopersOverviewProps> = (props) => {
  const { refetch, company_id, company_sk_live, company_webhook_url } = props;

  const createSecretKeyMutation = trpc.company.createSecretKey.useMutation({
    onSuccess: (data) => {
      refetch();
      toast.success(data.message + " y copiado al portapapeles");
      navigator.clipboard.writeText(company_sk_live as string);
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
      company_id: company_id,
      webhook_url: company_webhook_url || "",
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
    <div className="space-y-4">
      <div className="flex flex-col justify-center gap-2 sm:flex-row sm:items-center">
        Secret API Key:
        {company_sk_live ? (
          <Button
            color="black"
            soft
            onClick={() => {
              if (company_sk_live) {
                copyToClipboard({
                  text: company_sk_live,
                  onSuccess: () => toast.success("API KEY copiado"),
                });
              }
            }}
            className="truncate"
          >
            <IoCopy className="mr-2" />

            {company_sk_live}
          </Button>
        ) : (
          <Button
            onClick={() =>
              createSecretKeyMutation.mutate({
                company_id,
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
  );
};

export default Overview;

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCompanySchema, ICreateCompany } from "@acme/validations";
import toast from "react-hot-toast";

// Services
import { trpc } from "@/utils/trpc";
import { uploadFile } from "@/shared/utils/uploadFile";

// Components
import {
  Modal,
  Text,
  Button,
  Input,
  SquareFileInput,
  ErrorMessage,
  Spinner,
} from "@/shared/components";

export interface CreateCompanyButtonProps {
  onCreated?: () => void;
  className?: string;
}

export const CreateCompanyButton: React.FC<CreateCompanyButtonProps> = (
  props,
) => {
  const { onCreated } = props;

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Pick<ICreateCompany, "name">>({
    resolver: zodResolver(createCompanySchema.pick({ name: true })),
  });

  const createCompanyMutation = trpc.company.create.useMutation({
    onSuccess(data) {
      onCreated?.();
      setLoading(false);
      toast.success(data.message);
      setOpen(false);
    },
    onError(error) {
      setLoading(false);
      toast.error(error.message);
    },
  });

  const handleCreateCompany = async (data: Pick<ICreateCompany, "name">) => {
    setLoading(true);
    const { name } = data;

    if (!file) {
      setLoading(false);

      return setFileError("Debes subir un logo para tu negocio");
    }

    const image = await uploadFile({ file, directory: "companies" });

    createCompanyMutation.mutate({ name, image });
  };

  return (
    <>
      <Modal showModal={open} setShowModal={setOpen}>
        <div className="inline-block w-full transform overflow-hidden bg-white px-4 py-6 align-middle transition-all sm:max-w-md sm:rounded-2xl sm:border sm:border-gray-200 sm:py-10 sm:px-6">
          <Text.H1 className="mb-12">Crear negocio</Text.H1>

          <div className="space-y-4">
            <div className="space-y-1">
              <SquareFileInput
                label="Logo"
                file={file}
                setFile={setFile}
                setErrorMessage={setFileError}
              />
              {fileError && <ErrorMessage>{fileError}</ErrorMessage>}
            </div>
            <Input
              id="company-name"
              label="Nombre"
              placeholder="ej. Facebook"
              name="name"
              register={register}
              error={errors.name?.message}
            />
            <Button
              size="large"
              color="black"
              className="w-full"
              loading={loading}
              onClick={handleSubmit(handleCreateCompany)}
              filled
            >
              {loading ? (
                <>
                  <Spinner className="mr-2" />
                  Creando negocio
                </>
              ) : (
                <>Crear negocio</>
              )}
            </Button>
          </div>
        </div>
      </Modal>
      <Button filled onClick={() => setOpen(true)} color="black">
        Crear Negocio
      </Button>
    </>
  );
};
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "@radix-ui/react-icons";
import toast from "react-hot-toast";

// Services
import { trpc } from "@/utils/trpc";
import { createProductDTO, CreateProductDTO } from "@acme/validations";
import { uploadFile } from "@/shared/utils/uploadFile";

// Components
import {
  Button,
  Modal,
  Text,
  SquareFileInput,
  ErrorMessage,
  Input,
  Spinner,
} from "@/shared/components";
import mixpanel from "@/shared/lib/mixpanel";

interface CreateProductButtonProps {
  onCreated?: () => void;

  companyId: string;
}

const CreateProductButton: React.FC<CreateProductButtonProps> = (props) => {
  const { companyId, onCreated } = props;

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Pick<CreateProductDTO, "name" | "price">>({
    resolver: zodResolver(createProductDTO.pick({ name: true, price: true })),
  });

  const createProductMutation = trpc.product.create.useMutation({
    onSuccess(data) {
      mixpanel.track("Product Created", {
        product: data.result.id,
        name: data.result.name,
        price: data.result.price,
      });
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

  const handleCreateProduct = async (
    data: Pick<CreateProductDTO, "name" | "price">,
  ) => {
    setLoading(true);
    const { name, price } = data;

    if (!file) {
      setLoading(false);
      return setFileError("La imagen del producto es requerida");
    }

    const fileUrl = await uploadFile({ file, directory: "products" });

    createProductMutation.mutate({
      name,
      price,
      image: fileUrl,
      company_id: companyId,
    });
  };

  return (
    <>
      <Modal showModal={open} setShowModal={setOpen} disableClose={loading}>
        <div className="inline-block w-full transform overflow-hidden bg-white px-4 py-6 align-middle transition-all sm:max-w-md sm:rounded-2xl sm:border sm:border-gray-200 sm:py-10 sm:px-6">
          <Text.H1 className="mb-12">Crear producto</Text.H1>

          <form
            onSubmit={handleSubmit(handleCreateProduct)}
            className="space-y-4"
          >
            <div onSubmit={handleSubmit(handleCreateProduct)}>
              <SquareFileInput
                label="Imagen"
                file={file}
                setFile={setFile}
                setErrorMessage={setFileError}
              />
              {fileError && <ErrorMessage>{fileError}</ErrorMessage>}
            </div>

            <Input
              id="name"
              label="Nombre del producto"
              placeholder="Ej. Camisa"
              name="name"
              register={register}
              error={errors.name?.message}
            />

            <Input
              id="price"
              label="Precio en soles (S/.)"
              placeholder="Ej. 99.99"
              name="price"
              type="number"
              step={0.01}
              register={register}
              error={errors.price?.message}
            />

            <Button
              size="large"
              color="black"
              className="w-full"
              loading={loading}
              type="submit"
              filled
            >
              {loading ? (
                <>
                  <Spinner className="mr-2" />
                  Creando producto
                </>
              ) : (
                <>Crear producto</>
              )}
            </Button>
          </form>
        </div>
      </Modal>
      <Button color="primary" size="small" filled onClick={() => setOpen(true)}>
        <PlusIcon className="mr-2" />
        Crear producto
      </Button>
    </>
  );
};

export default CreateProductButton;

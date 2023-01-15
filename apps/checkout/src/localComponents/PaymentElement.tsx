import { useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoCopy } from "react-icons/io5";
import { toast } from "react-hot-toast";
import z from "zod";
import { copyToClipboard, Dayjs } from "@agotao/utils";

// Components
import { Input, ErrorMessage, Button, Spinner, Label } from "@/components";

// Types
import { PaymentMethod } from "@acme/db";

// Services
import { trpc } from "@/lib/trpc";
import { CheckoutPurchaseDTO, checkoutPurchaseDTO } from "@acme/validations";

export interface PaymentElementProps {
  amount: number;
  checkout_id: string;
  className?: string;
}

export const PaymentElement: React.FC<PaymentElementProps> = (props) => {
  const { amount, checkout_id } = props;

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<Pick<
    PaymentMethod,
    "id" | "name" | "type" | "keyInfo"
  > | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm<CheckoutPurchaseDTO & { accept_payment: boolean }>({
    resolver: zodResolver(
      checkoutPurchaseDTO.extend({
        accept_payment: z
          .boolean({
            required_error: "Debes de confirmar que has realizado el pago",
          })
          .refine((value) => value === true, {
            message: "Debes de confirmar que has realizado el pago",
          }),
      }),
    ),
    defaultValues: {
      checkout_id,
    },
  });

  const { data: paymentMethods, isLoading } =
    trpc.checkout.getPaymentMethods.useQuery(undefined, {
      refetchOnWindowFocus: false,
    });

  const checkoutPurchaseMutation = trpc.checkout.purchase.useMutation({
    onSuccess() {
      toast.success(
        "Compra realizada con éxito, recibirás un correo con los detalles",
        {
          duration: 10000,
        },
      );
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-sm flex-col gap-4 lg:m-0 lg:ml-20 lg:mt-8">
      <div className="space-y-4">
        <Input
          id="name"
          label="Nombres y apellidos"
          name="name"
          register={register}
          error={errors.name?.message as string}
        />
        <Input
          id="email"
          label="Correo electrónico"
          type="email"
          name="email"
          register={register}
          error={errors.email?.message}
        />
        <div className="space-y-1">
          <Label>Elige un método de pago</Label>
          <div className="flex flex-wrap justify-center gap-3">
            {paymentMethods?.map((paymentMethod) => (
              <Button
                key={paymentMethod.type}
                {...(selectedPaymentMethod?.type === paymentMethod.type
                  ? { outline: true }
                  : { light: true })}
                color="positive"
                style={{
                  height: "75px",
                  minWidth: "75px",
                  width: "75px",
                  padding: "0",
                  borderRadius: "8px",
                }}
                className={classNames(
                  selectedPaymentMethod?.type === paymentMethod.type
                    ? "scale-105 border-2"
                    : "opacity-50",
                  "transition-all hover:scale-105",
                )}
                onClick={() => {
                  setSelectedPaymentMethod(paymentMethod);
                  setValue("payment_method_id", paymentMethod.id);
                  clearErrors("payment_method_id");
                }}
              >
                <Image
                  src={`/images/payment/${paymentMethod.type.toLowerCase()}.png`}
                  alt={paymentMethod.name}
                  width={200}
                  height={200}
                  className="h-16 w-16 rounded-lg object-cover"
                />
              </Button>
            ))}
          </div>
          {errors.payment_method_id?.message && (
            <ErrorMessage>{errors.payment_method_id?.message}</ErrorMessage>
          )}
        </div>
      </div>

      {selectedPaymentMethod ? (
        <div>
          <div className="flex items-center gap-4">
            <div className="flex w-full flex-col items-center justify-center">
              <p className="mb-2 text-center text-lg">
                {selectedPaymentMethod.type === "YAPE" ||
                selectedPaymentMethod.type === "PLIN"
                  ? `Envía el total de tu compra a este número con ${selectedPaymentMethod.name}`
                  : `Realiza una transferencia a la siguiente cuenta ${selectedPaymentMethod.type}`}
              </p>

              <button
                className="flex items-center gap-2 transition-all active:scale-95"
                onClick={() =>
                  copyToClipboard({
                    text: selectedPaymentMethod.keyInfo,
                    onSuccess: () => {
                      toast.success(
                        `${selectedPaymentMethod.name} copiado al portapapeles`,
                      );
                    },
                  })
                }
              >
                <p className="text-xl font-semibold text-primary">
                  {selectedPaymentMethod.keyInfo}
                </p>
                <IoCopy className="h-6 w-6 text-primary" />
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="accept_payment"
            className="h-4 w-4"
            {...register("accept_payment")}
          />
          <p>
            He realizado el pago de {Dayjs.formatMoney(amount)} mediante{" "}
            {selectedPaymentMethod?.name}
          </p>
        </div>
        {errors.accept_payment?.message && (
          <ErrorMessage>{errors.accept_payment?.message}</ErrorMessage>
        )}
      </div>

      <Button
        key="confirm"
        color="black"
        size="large"
        filled
        onClick={handleSubmit((data) => {
          checkoutPurchaseMutation.mutate(data);
        })}
        disabled={checkoutPurchaseMutation.isLoading}
        className="mt-4 mb-10"
      >
        {checkoutPurchaseMutation.isLoading ? (
          <>
            <Spinner className="mr-2" />
            Procesando compra
          </>
        ) : (
          <>Comprar</>
        )}
      </Button>
    </div>
  );
};

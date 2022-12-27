import { useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoCopy } from "react-icons/io5";
import { toast } from "react-hot-toast";
import z from "zod";

// Components
import {
  Input,
  ErrorMessage,
  Portal,
  Button,
  Spinner,
  Label,
} from "@/shared/components";

// Hooks
import useViewportSize from "@/shared/hooks/use-viewport-size";

// Types
import { PaymentMethod } from "@acme/db";

// Services
import { trpc } from "@/utils/trpc";
import { guestPurchaseDTO, GuestPurchaseDTO } from "@acme/validations";

export interface PaymentElementProps {
  amount: number;
  product_id: string;
  paymentMethods: Array<
    Pick<PaymentMethod, "id" | "name" | "type" | "keyInfo">
  >;

  className?: string;
}

export const PaymentElement: React.FC<PaymentElementProps> = (props) => {
  const { amount, product_id, paymentMethods } = props;

  const { width } = useViewportSize();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<Pick<
    PaymentMethod,
    "id" | "name" | "type" | "keyInfo"
  > | null>(null);

  const handleCopy = (
    paymentMethod: Pick<PaymentMethod, "id" | "name" | "type" | "keyInfo">,
  ) => {
    navigator.clipboard.writeText(paymentMethod.keyInfo);
    toast.success(`Copiado ${paymentMethod.name}`);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm<GuestPurchaseDTO & { accept_payment: boolean }>({
    resolver: zodResolver(
      guestPurchaseDTO.extend({
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
      product_id: product_id,
    },
  });

  const guestPurchaseMutation = trpc.purchase.guest.useMutation({
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

  return (
    <div className="flex flex-col space-y-4">
      <p className="mb-2 text-xl font-medium text-gray-800">
        Información de compra
      </p>
      <div className="space-y-4">
        <Input
          id="name"
          label="Nombres y apellidos"
          name="name"
          register={register}
          error={errors.name?.message}
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
            {paymentMethods.map((paymentMethod) => (
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
                onClick={() => handleCopy(selectedPaymentMethod)}
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

      <Portal
        wrapperId={width > 768 ? "purchase-container" : "checkout-container"}
      >
        <div className="sticky bottom-0 z-10 space-y-2 rounded-t-2xl bg-white p-4 shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] md:z-0 md:p-0 md:shadow-none">
          <div className="flex items-center space-x-8">
            <div>
              <p className="text-sm text-gray-500">Total</p>
              <h3 className="truncate text-2xl font-semibold">S/ {amount}</h3>
            </div>
            <Button
              key="confirm"
              color="positive"
              size="large"
              className="flex-1"
              filled
              onClick={handleSubmit((data) => {
                guestPurchaseMutation.mutate(data);
              })}
              disabled={guestPurchaseMutation.isLoading}
            >
              {guestPurchaseMutation.isLoading ? (
                <>
                  <Spinner className="mr-2" />
                  Procesando compra
                </>
              ) : (
                <>Confirmar compra</>
              )}
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="accept_payment"
              className="h-4 w-4"
              {...register("accept_payment")}
            />
            <p>He realizado el pago mediante {selectedPaymentMethod?.name}</p>
          </div>
          {errors.accept_payment?.message && (
            <ErrorMessage>{errors.accept_payment?.message}</ErrorMessage>
          )}
        </div>
      </Portal>
    </div>
  );
};

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import z from "zod";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { InfoCircledIcon, LockClosedIcon } from "@radix-ui/react-icons";

// Components
import { Input, ErrorMessage, Button, Spinner, Label } from "@/components";

// Types
import { PaymentMethod } from "@acme/db";

// Services
import { trpc } from "@/lib/trpc";
import mixpanel from "@/lib/mixpanel";
import { CheckoutPurchaseDTO, checkoutPurchaseDTO } from "@acme/validations";

export interface PaymentElementProps {
  checkout_id: string;
  setProcessing: (processing: boolean) => void;
}

export const PaymentElement: React.FC<PaymentElementProps> = (props) => {
  const { checkout_id, setProcessing } = props;

  const router = useRouter();
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
  } = useForm<CheckoutPurchaseDTO>({
    resolver: zodResolver(checkoutPurchaseDTO),
    defaultValues: {
      checkout_id,
    },
  });

  const { data: paymentMethods, isLoading } =
    trpc.checkout.getPaymentMethods.useQuery(undefined, {
      refetchOnWindowFocus: false,
    });

  const checkoutPurchaseMutation = trpc.checkout.purchase.useMutation({
    onSuccess(data) {
      toast.success(
        "Compra realizada con éxito, recibirás un correo con los detalles",
        {
          duration: 10000,
        },
      );
      mixpanel.track("Checkout Purchase", {
        purchase_id: data.result.id,
        amount: data.result.amount,
        commission: data.result.commission,
        company: data.result.checkoutSession.company.name,
        payment_method: data.result.payment_method.name,
      });
      router.push(`/compra/${data.result.id}`);
    },
    onError(error) {
      setProcessing(false);
      mixpanel.track("Checkout Purchase Error", {
        error: error.message,
      });

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
    <div className="mx-auto flex max-w-sm flex-col gap-8 lg:m-0 lg:ml-20 lg:mt-8">
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
        <div className="space-y-2">
          <Label>Selecciona un método de pago</Label>
          <RadioGroup.Root
            aria-label="Selecciona método de pago"
            className="grid grid-cols-2 gap-3"
          >
            {paymentMethods?.map((paymentMethod) => (
              <RadioGroup.Item
                key={paymentMethod.type}
                value={paymentMethod.id}
                className="flex items-center gap-2"
                onClick={() => {
                  setSelectedPaymentMethod(paymentMethod);
                  setValue("payment_method_id", paymentMethod.id);
                  clearErrors("payment_method_id");
                }}
              >
                <div className="relative max-h-[20px] min-h-[20px] min-w-[20px] max-w-[20px] rounded-full border-2 border-gray-300">
                  <RadioGroup.Indicator>
                    <AnimatePresence>
                      <motion.div
                        className="absolute left-1 top-1 bottom-1 right-1 h-[9px] w-[9px] rounded-full bg-primary"
                        initial={{ scale: 2 }}
                        animate={{ scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      ></motion.div>
                    </AnimatePresence>
                  </RadioGroup.Indicator>
                </div>
                <Image
                  src={`/images/payment/${paymentMethod.type.toLowerCase()}.png`}
                  alt={paymentMethod.name}
                  width={200}
                  height={200}
                  className="h-10 w-10 rounded-lg object-cover"
                />
                <p className="font-medium">{paymentMethod.name}</p>
              </RadioGroup.Item>
            ))}
          </RadioGroup.Root>

          {errors.payment_method_id?.message && (
            <ErrorMessage>{errors.payment_method_id?.message}</ErrorMessage>
          )}
        </div>
      </div>

      {selectedPaymentMethod && (
        <div className="flex flex-col items-center rounded-lg bg-primary-50 p-4">
          <InfoCircledIcon className="h-6 w-6 text-primary" />
          <p className="text-center text-sm text-primary">
            Recuerda que deberás realizar la transferencia mediante el método de
            pago seleccionado en un plazo máximo de 15 minutos para completar la
            compra.
          </p>
        </div>
      )}

      <Button
        key="confirm"
        color="black"
        size="large"
        filled
        onClick={handleSubmit((data) => {
          setProcessing(true);
        })}
        disabled={checkoutPurchaseMutation.isLoading}
        className="mb-10"
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

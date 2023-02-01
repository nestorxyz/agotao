import Image from "next/image";
import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { ArrowRight } from "lucide-react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { motion, AnimatePresence } from "framer-motion";

import { trpc } from "@/utils/trpc";
import { Dayjs } from "@agotao/utils";

import {
  Modal,
  Text,
  Button,
  Input,
  Label,
  ErrorMessage,
} from "@/shared/components";

import { PaymentMethod } from "@acme/db";

interface AddBalanceModalProps {
  currentBalance: number;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const AddBalanceModal: React.FC<AddBalanceModalProps> = (props) => {
  const { currentBalance, isOpen, setIsOpen } = props;

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<Pick<
    PaymentMethod,
    "id" | "name" | "type" | "keyInfo"
  > | null>(null);

  const { data: paymentMethods, isInitialLoading } =
    trpc.checkout.getPaymentMethods.useQuery(undefined, {
      refetchOnWindowFocus: false,
    });

  return (
    <Modal showModal={isOpen} setShowModal={setIsOpen}>
      <div className="inline-block w-full transform space-y-4 overflow-hidden bg-white px-4 py-6 align-middle transition-all sm:max-w-md sm:rounded-2xl sm:border sm:border-gray-200 sm:py-10 sm:px-6">
        <Text.H3 className="font-bold">
          Agrega fondos a tu balance de Agotao
        </Text.H3>

        <div>
          <p className="mb-1 text-sm font-semibold text-gray-800">Monto</p>
          <div className="flex items-center justify-between">
            <Input type="number" placeholder="0.00" step="0.01" />
            <ArrowRight size={24} className="text-gray-600" />
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Agotao Logo"
                width={50}
                height={50}
                className="h-8 w-8"
              />
              <div>
                <p className="font-medium text-gray-600">Cuenta Agotao</p>
                <p className="text-sm text-gray-600">
                  {Dayjs.formatMoney(currentBalance)}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Método</Label>
            {isInitialLoading && <p>Cargando...</p>}
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

        <div className="mt-4 flex flex-col-reverse justify-center gap-2 sm:flex-row sm:justify-end">
          <Button
            soft
            color="black"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Cancelar
          </Button>
          <Button filled color="primary">
            Agregar saldo
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddBalanceModal;

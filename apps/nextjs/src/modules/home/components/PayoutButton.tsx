import { useState } from "react";
import { Button, Modal, Text } from "@/shared/components";

interface PayoutButtonProps {
  balance: number;
}

export const PayoutButton: React.FC<PayoutButtonProps> = (props) => {
  const { balance } = props;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button color="positive" outline onClick={() => setIsOpen(true)}>
        Retirar
      </Button>

      <Modal showModal={isOpen} setShowModal={setIsOpen}>
        <div className="inline-block w-full transform overflow-hidden bg-white px-4 py-6 align-middle transition-all sm:max-w-md sm:rounded-2xl sm:border sm:border-gray-200 sm:py-10 sm:px-6">
          <Text.H1>Vas a retirar S./ {balance}</Text.H1>
          <Text.Subtitle>Confirma tu retiro</Text.Subtitle>

          <div className="mt-4 flex gap-4">
            <Button
              color="black"
              light
              className="w-full"
              onClick={() => setIsOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              className="w-full"
              color="positive"
              filled
              onClick={() => setIsOpen(false)}
            >
              Confirmar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

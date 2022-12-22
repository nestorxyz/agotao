import { useState } from "react";

import { Modal, Text, Button, Input } from "@/shared/components";

export interface CreateCompanyButtonProps {}

export const CreateCompanyButton: React.FC<CreateCompanyButtonProps> = (
  props,
) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Modal showModal={open} setShowModal={setOpen}>
        <div className="inline-block w-full transform overflow-hidden bg-white px-4 py-6 align-middle transition-all sm:max-w-md sm:rounded-2xl sm:border sm:border-gray-200 sm:py-10 sm:px-6">
          <Text.H1 className="mb-12">Crear negocio</Text.H1>

          <div className="space-y-4">
            <Input label="Nombre" placeholder="ej. Facebook" />
            <Button size="large" color="black" className="w-full">
              Crear negocio
            </Button>
          </div>
        </div>
      </Modal>
      <Button onClick={() => setOpen(true)}>Crear Negocio</Button>
    </>
  );
};

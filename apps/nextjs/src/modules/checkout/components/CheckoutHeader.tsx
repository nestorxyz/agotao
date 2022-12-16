import { useState } from "react";

import { Header, Button, Modal } from "@/shared/components";
import { AuthContent } from "@/modules/auth/components";

export const CheckoutHeader: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <Header>
      <div className="flex gap-2">
        <Button color="black" size="small" onClick={() => setOpen(true)}>
          Iniciar sesión
        </Button>
        <Button color="black" size="small" light onClick={() => setOpen(true)}>
          Crear cuenta
        </Button>
        <Modal showModal={open} setShowModal={setOpen}>
          <AuthContent />
        </Modal>
      </div>
    </Header>
  );
};

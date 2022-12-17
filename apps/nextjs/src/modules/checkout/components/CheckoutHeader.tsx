import { useState } from "react";

// Components
import { Header, Button, Modal } from "@/shared/components";
import { AuthContent } from "@/modules/auth/components";

export const CheckoutHeader: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  const handleClick = (tab: "login" | "register") => {
    setOpen(true);
    setActiveTab(tab);
  };

  return (
    <>
      <Modal showModal={open} setShowModal={setOpen}>
        <AuthContent initTab={activeTab} />
      </Modal>
      <Header>
        <div className="flex gap-2">
          <Button
            color="black"
            size="small"
            onClick={() => handleClick("login")}
            light
          >
            Iniciar sesión
          </Button>
          <Button
            color="black"
            size="small"
            onClick={() => handleClick("register")}
          >
            Crear cuenta
          </Button>
        </div>
      </Header>
    </>
  );
};

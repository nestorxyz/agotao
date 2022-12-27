import { useState } from "react";
import { useSession } from "next-auth/react";

// Components
import { Header, Button, Modal } from "@/shared/components";
import { AuthContent } from "@/modules/auth";

export interface CheckoutHeaderProps {
  callbackUrl?: string;
}

export const CheckoutHeader: React.FC<CheckoutHeaderProps> = (props) => {
  const { callbackUrl } = props;

  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  const handleClick = (tab: "login" | "register") => {
    setOpen(true);
    setActiveTab(tab);
  };

  return (
    <>
      <Modal showModal={open} setShowModal={setOpen}>
        <AuthContent initTab={activeTab} callbackUrl={callbackUrl} />
      </Modal>
      <Header>
        {/* <div className="flex gap-2">
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
            filled
          >
            Crear cuenta
          </Button>
        </div> */}
      </Header>
    </>
  );
};

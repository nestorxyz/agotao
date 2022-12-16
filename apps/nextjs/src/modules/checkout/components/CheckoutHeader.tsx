import * as Dialog from "@radix-ui/react-dialog";

import { Header, Button } from "@/shared/components";
import { AuthContent } from "@/modules/auth/components";

export const CheckoutHeader: React.FC = () => {
  return (
    <Header>
      <div className="flex gap-2">
        <Dialog.Root>
          <Dialog.Trigger>
            <Button color="black" size="small">
              Iniciar sesión
            </Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Content>
              <AuthContent />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
        <Dialog.Root>
          <Dialog.Trigger>
            <Button color="black" size="small" light>
              Crear cuenta
            </Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Content>
              <AuthContent />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </Header>
  );
};

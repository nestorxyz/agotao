import toast from "react-hot-toast";
import { copyToClipboard } from "@agotao/utils";
import { IoCopy } from "react-icons/io5";

interface VerifiyingPaymentProps {
  company_name: string;
  payment_method: string;
  payment_method_info: string;
  total: string;
  expires_at: string;
  status: "VALIDATING" | "PAID" | "UNPAID";
}

export const VerifiyingPayment: React.FC<VerifiyingPaymentProps> = (props) => {
  const {
    company_name,
    payment_method,
    payment_method_info,
    total,
    expires_at,
    status,
  } = props;

  return (
    <div>
      <p>
        {status === "VALIDATING" ? (
          <>
            Realiza la transferencia {payment_method} para completar la compra.
            Puedes ignorar este mensaje si ya realizaste el pago.
          </>
        ) : status === "PAID" ? (
          <>
            Tu pago ha sido validado. {company_name} se encargará de procesar tu
            pedido.
          </>
        ) : (
          <>
            No se recibió el pago, por lo que tu pedido ha sido cancelado. Si
            crees que esto es un error, por favor ponte en contacto con{" "}
            <a
              href="mailto:
                pagos@agotao.com"
              className="font-semibold"
            >
              pagos@agotao.com
            </a>
          </>
        )}
      </p>

      <div className="my-4 space-y-2 rounded-md py-4 px-6 shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]">
        <div>
          <p className="text-sm font-medium">Importe a pagar</p>
          <p className="font-semibold text-primary">{total}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Fecha y hora de vencimiento</p>
          <p className="font-semibold text-primary">{expires_at}</p>
        </div>

        <div>
          <p className="text-sm font-medium">Cuenta {payment_method}</p>
          <button
            className="flex items-center gap-2 transition-all active:scale-95"
            onClick={() => {
              copyToClipboard({
                text: payment_method_info,
                onSuccess: () => {
                  toast.success("Información copiada al portapapeles");
                },
              });
            }}
          >
            <p className="font-semibold text-primary"> {payment_method_info}</p>
            <IoCopy className="h-4 w-4 text-primary" />
          </button>
        </div>

        <div>
          <p className="text-sm font-medium">Titular de la cuenta</p>
          <p className="font-semibold text-primary">Nestor Eduardo Mamani P.</p>
        </div>
      </div>

      {status === "VALIDATING" && (
        <p>
          Una vez validado tu pago, {company_name} se encargará de procesar tu
          pedido.
        </p>
      )}
    </div>
  );
};

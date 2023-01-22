import { MjmlSection, MjmlColumn, MjmlImage } from "mjml-react";

import { colors, fontWeight } from "./theme";
import BaseLayout from "./components/BaseLayout";
import Text from "./components/Text";
import Divider from "./components/Divider";
import H3 from "./components/H3";
import Button from "./components/Button";

interface PaymentIntentMailProps {
  company_image: string;
  company_name: string;
  payment_method: string;
  payment_method_info: string;
  products: {
    name: string;
    total: string;
    quantity: number;
  }[];
  total: string;
  expires_at: string;
  button_url: string;
}

const PaymentIntentMail: React.FC<PaymentIntentMailProps> = (props) => {
  const {
    company_image,
    company_name,
    payment_method,
    payment_method_info,
    products,
    total,
    expires_at,
    button_url,
  } = props;

  return (
    <BaseLayout company_name={company_name}>
      <MjmlSection backgroundColor={"white"} padding="0px 16px">
        <MjmlColumn>
          <MjmlImage
            src={company_image}
            width={80}
            borderRadius="1000px"
            padding="16px 0px"
          />
          <Text paddingBottom="8px">
            Gracias por tu compra en <b>{company_name}</b>
          </Text>
          <Text>
            Realiza la transferencia mediante {payment_method} para completar la
            compra. Puedes ignorar este mensaje si ya realizaste el pago.
          </Text>

          <Divider padding={"24px 0px"} />
        </MjmlColumn>
      </MjmlSection>

      <MjmlSection backgroundColor={"white"} padding="0px 16px">
        <MjmlColumn paddingBottom="10px">
          <H3>RESUMEN</H3>
        </MjmlColumn>
      </MjmlSection>

      {products.map((product) => (
        <MjmlSection
          key={product.name}
          backgroundColor={"white"}
          padding="0px 24px"
        >
          <MjmlColumn>
            <Text>
              {product.name} x {product.quantity}
            </Text>
          </MjmlColumn>
          <MjmlColumn>
            <Text align="right">{product.total}</Text>
          </MjmlColumn>
        </MjmlSection>
      ))}
      <MjmlSection backgroundColor={"white"} padding="8px 24px">
        <MjmlColumn>
          <Text fontWeight={fontWeight.bold}>Total</Text>
        </MjmlColumn>
        <MjmlColumn>
          <Text align="right" fontWeight={fontWeight.bold}>
            {total}
          </Text>
        </MjmlColumn>
      </MjmlSection>

      <MjmlSection backgroundColor={"white"} padding="0px 16px">
        <MjmlColumn>
          <Divider padding={"24px 0px"} />
          <Text>
            <b>{payment_method.toUpperCase()}</b>
          </Text>
        </MjmlColumn>
      </MjmlSection>

      <MjmlSection backgroundColor={"white"} padding="2px 24px">
        <MjmlColumn>
          <Text fontSize={14} color={colors.black[500]}>
            Cantidad a transferir
          </Text>
          <Text color={colors.primary.DEFAULT}>
            <b color={colors.primary.DEFAULT}>{total}</b>
          </Text>
        </MjmlColumn>
        <MjmlColumn>
          <Text fontSize={14} color={colors.black[500]}>
            Fecha y hora de vencimiento
          </Text>
          <Text color={colors.primary.DEFAULT}>
            <b>{expires_at}</b>
          </Text>
        </MjmlColumn>
      </MjmlSection>
      <MjmlSection backgroundColor={"white"} padding="2px 24px">
        <MjmlColumn>
          <Text fontSize={14} color={colors.black[500]}>
            Cuenta {payment_method}
          </Text>
          <Text color={colors.primary.DEFAULT}>
            <b>{payment_method_info}</b>
          </Text>
        </MjmlColumn>
        <MjmlColumn>
          <Text fontSize={14} color={colors.black[500]}>
            Titular de la cuenta
          </Text>
          <Text color={colors.primary.DEFAULT}>
            <b>Nestor Eduardo Mamani P.</b>
          </Text>
        </MjmlColumn>
      </MjmlSection>
      <MjmlSection backgroundColor={"white"} padding="4px 24px 0px">
        <MjmlColumn>
          <Text>
            Una vez validado tu pago, {company_name} se encargará de procesar tu
            pedido.
          </Text>
        </MjmlColumn>
      </MjmlSection>
      <MjmlSection backgroundColor={"white"} padding="4px 24px 0px">
        <MjmlColumn>
          <Button align="center" href={button_url}>
            Ver detalles de la compra
          </Button>
        </MjmlColumn>
      </MjmlSection>

      <MjmlSection
        backgroundColor={"white"}
        padding="0px 16px 24px"
        borderRadius="0px 0px 8px 8px"
      >
        <MjmlColumn>
          <Divider padding={"24px 0px"} />
          <Text paddingBottom="16px">
            Si tienes alguna duda sobre tu compra, escríbenos a pagos@agotao.com
          </Text>
          <Text paddingBottom="16px">Gracias,</Text>
          <Text>Agotao</Text>
        </MjmlColumn>
      </MjmlSection>
    </BaseLayout>
  );
};

export default PaymentIntentMail;

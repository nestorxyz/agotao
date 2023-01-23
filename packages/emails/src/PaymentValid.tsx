import { MjmlSection, MjmlColumn, MjmlImage } from "mjml-react";

import { colors, fontWeight } from "./theme";
import BaseLayout from "./components/BaseLayout";
import Text from "./components/Text";
import Divider from "./components/Divider";
import H3 from "./components/H3";
import Button from "./components/Button";

interface PaymentValidMailProps {
  company_image: string;
  company_name: string;
  payment_intent_id: string;
  payment_method: string;
  products: {
    name: string;
    total: string;
    quantity: number;
  }[];
  total: string;
  date: string;
  button_url: string;
}

const PaymentValidMail: React.FC<PaymentValidMailProps> = (props) => {
  const {
    company_image,
    company_name,
    payment_intent_id,
    payment_method,
    products,
    total,
    date,
    button_url,
  } = props;

  return (
    <BaseLayout company_name={company_name}>
      <MjmlSection backgroundColor={"white"} padding="0px 16px 16px">
        <MjmlColumn>
          <MjmlImage
            src={company_image}
            width={80}
            borderRadius="1000px"
            padding="16px 0px"
          />
          <Text fontSize={20} fontWeight={fontWeight.medium} align="center">
            Recibo de {company_name}
          </Text>
          <Text align="center" fontSize={14}>
            ID: {payment_intent_id}
          </Text>
        </MjmlColumn>
      </MjmlSection>

      <MjmlSection backgroundColor={"white"} padding="0px 16px 16px">
        <MjmlColumn>
          <Text
            fontSize={14}
            fontWeight={fontWeight.medium}
            color={colors.black[500]}
          >
            Importe pagado
          </Text>
          <Text color={colors.primary.DEFAULT}>{total}</Text>
        </MjmlColumn>
        <MjmlColumn>
          <Text
            fontSize={14}
            fontWeight={fontWeight.medium}
            color={colors.black[500]}
          >
            Fecha de compra
          </Text>
          <Text color={colors.primary.DEFAULT}>{date}</Text>
        </MjmlColumn>
        <MjmlColumn>
          <Text
            fontSize={14}
            fontWeight={fontWeight.medium}
            color={colors.black[500]}
          >
            Método de pago
          </Text>
          <Text color={colors.primary.DEFAULT}>{payment_method}</Text>
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

export default PaymentValidMail;

import { MjmlSection, MjmlWrapper, MjmlColumn, MjmlImage } from "mjml-react";

import { colors } from "./theme";
import BaseLayout from "./components/BaseLayout";
import Text from "./components/Text";
import Divider from "./components/Divider";
import H3 from "./components/H3";

interface PaymentIntentMailProps {
  company_image: string;
  company_name: string;
  payment_method: string;
  products: {
    name: string;
    total: string;
    quantity: number;
  }[];
  total: string;
}

const PaymentIntentMail: React.FC<PaymentIntentMailProps> = (props) => {
  const { company_image, company_name, payment_method, products, total } =
    props;

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

      {products.map((product) => (
        <MjmlSection key={product.name}>
          <MjmlColumn>
            <Text>
              {product.name} x {product.quantity}
            </Text>
          </MjmlColumn>
          <MjmlColumn>
            <Text>{product.total}</Text>
          </MjmlColumn>
        </MjmlSection>
      ))}
    </BaseLayout>
  );
};

export default PaymentIntentMail;

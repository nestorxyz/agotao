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
  const { company_image, company_name, payment_method } = props;

  return (
    <BaseLayout width={600}>
      <MjmlWrapper
        fullWidth={true}
        padding="24px 16px"
        backgroundColor={"white"}
      >
        <MjmlSection>
          <MjmlColumn>
            <MjmlImage
              height={10}
              src="https://firebasestorage.googleapis.com/v0/b/civil-glyph-372313.appspot.com/o/assets%2Fcover.png?alt=media&token=c0d0c0ae-2601-44ba-8ca1-9e1c7902bde1"
            />
            <MjmlImage
              src={company_image}
              width={80}
              borderRadius="1000px"
              padding="16px 0px"
            />
            <Text>
              Gracias por tu compra en <b>{company_name}</b>
            </Text>
            <Text>
              Realiza la transferencia mediante {payment_method} para completar
              la compra. Puedes ignorar este mensaje si ya realizaste el pago{" "}
            </Text>
          </MjmlColumn>
        </MjmlSection>

        <Divider padding={"24px 0px"} />

        <MjmlSection backgroundColor={colors.black[100]} padding="16px 8px">
          <MjmlColumn></MjmlColumn>
        </MjmlSection>
      </MjmlWrapper>
    </BaseLayout>
  );
};

export default PaymentIntentMail;

import { MjmlSection, MjmlColumn, MjmlImage } from "mjml-react";

import { colors, fontWeight } from "./theme";
import BaseLayout from "./components/BaseLayout";
import Text from "./components/Text";
import Divider from "./components/Divider";
import H3 from "./components/H3";
import Button from "./components/Button";

interface PaymentInvalidMailProps {
  name: string;
  company_name: string;
  date: string;
  total: string;
  payment_method: string;
  payment_method_info: string;
}

const PaymentInvalidMail: React.FC<PaymentInvalidMailProps> = (props) => {
  const {
    name,
    company_name,
    date,
    payment_method,
    payment_method_info,
    total,
  } = props;

  return (
    <BaseLayout company_name={company_name}>
      <MjmlSection backgroundColor={"white"} padding="0px 16px">
        <MjmlColumn>
          <Text paddingBottom="8px">
            Hola <b>{name}</b>
          </Text>
          <Text>
            Te informamos que tu compra en {company_name} ha sido cancelada.
          </Text>
          <Text>
            Ya que siendo la fecha y hora {date} no se recibió la transferencia
            de {total} a la cuenta {payment_method} {payment_method_info}.
          </Text>
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
            Si crees que se trata de un error, escríbenos a pagos@agotao.com
          </Text>
          <Text paddingBottom="16px">Gracias,</Text>
          <Text>Agotao</Text>
        </MjmlColumn>
      </MjmlSection>
    </BaseLayout>
  );
};

export default PaymentInvalidMail;

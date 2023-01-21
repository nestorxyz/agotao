import { MjmlSection, MjmlColumn } from "mjml-react";
import { Template } from "mailing-core";
import BaseLayout from "./components/BaseLayout";
import Text from "./components/Text";
import { spacing } from "./theme";

export interface BasicProps {
  name: string;
  email: string;
  product_name: string;
  price: string | number;
  payment_method: string;
}

const Basic: Template<BasicProps> = (props) => {
  const { name, email, product_name, price, payment_method } = props;

  return (
    <BaseLayout width={600}>
      <MjmlSection>
        <MjmlColumn>
          <Text paddingTop={spacing.s7} paddingBottom={spacing.s7}>
            Compra realizada por {name}
          </Text>
          <Text paddingTop={spacing.s7} paddingBottom={spacing.s7}>
            Correo: {email}
          </Text>
          <Text paddingTop={spacing.s7} paddingBottom={spacing.s7}>
            Producto: {product_name}
          </Text>
          <Text paddingTop={spacing.s7} paddingBottom={spacing.s7}>
            Precio: {price}
          </Text>
          <Text paddingTop={spacing.s7} paddingBottom={spacing.s7}>
            Método de pago: {payment_method}
          </Text>
        </MjmlColumn>
      </MjmlSection>
    </BaseLayout>
  );
};

export default Basic;

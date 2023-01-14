import { Checkout } from "@acme/db";
import { CheckoutHeader } from "@agotao/ui";

interface PrettyCheckoutProps {
  checkout: Checkout;
}

export const PrettyCheckout: React.FC<PrettyCheckoutProps> = (props) => {
  const { checkout } = props;

  return (
    <div>
      <CheckoutHeader />
      <h1>Pretty Checkout</h1>
    </div>
  );
};

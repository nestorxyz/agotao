import * as Label from "@radix-ui/react-label";
import { useForm } from "react-hook-form";

export const PaymentElement: React.FC = () => {
  const { register, handleSubmit } = useForm();

  return (
    <div>
      <Label.Root htmlFor="cardNumber">
        <Label.Label>Card number</Label.Label>
      </Label.Root>
    </div>
  );
};

import * as Label from "@radix-ui/react-label";
import Cards from "react-credit-cards";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Components
import { Input } from "@/shared/components";

const paymentSchema = z.object({
  number: z.string().min(16).max(16),
  name: z.string().min(3).max(50),
  expiry: z.string().min(4).max(4),
  cvc: z.string().min(3).max(3),
});

export const PaymentElement: React.FC = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      number: "",
      name: "",
      expiry: "",
      cvc: "",
    },
  });

  return (
    <form>
      <Cards
        cvc={getValues("cvc")}
        expiry={getValues("expiry")}
        name={getValues("name")}
        number={getValues("number")}
      />

      <Input
        id="cardNumber"
        label="Card number"
        error={errors.number?.message}
        pattern="[\d| ]{16,22}"
        {...register("number")}
      />
    </form>
  );
};

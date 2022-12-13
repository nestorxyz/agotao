import Cards from "react-credit-cards";
import Tilt from "react-parallax-tilt";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Components
import { Input } from "@/shared/components";

// Utils
import {
  formatCVC,
  formatCreditCardNumber,
  formatExpirationDate,
} from "@/modules/checkout/utils";

// Types
import type { Focused } from "react-credit-cards";
import { paymentSchema } from "@/modules/checkout/types";

export const PaymentElement: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cvc: "",
      expiry: "",
      focus: "",
      number: "",
      name: "",
    },
  });

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setValue("focus", name);
  };

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
    >
      <Tilt
        glareEnable={true}
        glareMaxOpacity={0.3}
        glareColor="#ffffff"
        glarePosition="all"
        glareBorderRadius="8px"
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
      >
        <Cards
          cvc={watch("cvc")}
          expiry={watch("expiry")}
          focused={watch("focus") as Focused}
          name={watch("name")}
          number={watch("number")}
        />
      </Tilt>

      <Input
        id="name"
        label="Nombre en la tarjeta"
        error={errors.name?.message}
        placeholder="Nombre"
        onFocus={handleInputFocus}
        {...register("name", {
          onChange: (e) => {
            setValue("name", e.target.value);
          },
        })}
      />

      <Input
        id="number"
        label="Número de tarjeta"
        error={errors.number?.message}
        pattern="[\d| ]{16,22}"
        placeholder="0000 0000 0000 0000"
        onFocus={handleInputFocus}
        {...register("number", {
          onChange: (e) => {
            e.target.value = formatCreditCardNumber(e.target.value);
            setValue("number", e.target.value);
          },
        })}
      />

      <div className="flex">
        <Input
          id="expiry"
          error={errors.expiry?.message}
          pattern="\d\d/\d\d"
          placeholder="MM/AA"
          onFocus={handleInputFocus}
          {...register("expiry", {
            onChange: (e) => {
              e.target.value = formatExpirationDate(e.target.value);
              setValue("expiry", e.target.value);
            },
          })}
          className="rounded-t-none"
        />

        <Input
          id="cvc"
          error={errors.cvc?.message}
          pattern="\d{3,4}"
          placeholder="CVC"
          onFocus={handleInputFocus}
          {...register("cvc", {
            onChange: (e) => {
              e.target.value = formatCVC(e.target.value);
              setValue("cvc", e.target.value);
            },
          })}
        />
      </div>

      <button type="submit">Comprar</button>
    </form>
  );
};

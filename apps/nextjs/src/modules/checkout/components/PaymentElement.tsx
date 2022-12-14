import Cards from "react-credit-cards";
import Tilt from "react-parallax-tilt";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Components
import { Input, ErrorMessage } from "@/shared/components";

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
      className="flex flex-col space-y-4"
    >
      <div>
        <Tilt
          glareEnable={true}
          glareMaxOpacity={0.3}
          glareColor="#ffffff"
          glarePosition="all"
          glareBorderRadius="8px"
          tiltMaxAngleX={10}
          tiltMaxAngleY={10}
          tiltReverse={true}
          className="p-6"
        >
          <Cards
            cvc={watch("cvc") ?? ""}
            expiry={watch("expiry") ?? ""}
            focused={watch("focus") as Focused}
            name={watch("name") ?? ""}
            number={watch("number") ?? ""}
          />
        </Tilt>

        <Input
          id="name"
          type="text"
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
      </div>

      <div className="flex flex-col">
        <Input
          id="number"
          label="Datos de la tarjeta"
          pattern="[\d| ]{16,22}"
          placeholder="0000 0000 0000 0000"
          onFocus={handleInputFocus}
          {...register("number", {
            onChange: (e) => {
              e.target.value = formatCreditCardNumber(e.target.value);
              setValue("number", e.target.value);
            },
          })}
          className={classNames(watch("focus") === "number" && "z-10")}
          inputClassName="rounded-b-none"
        />

        <div className="flex w-full">
          <Input
            id="expiry"
            type="tel"
            pattern="\d\d/\d\d"
            placeholder="MM/AA"
            onFocus={handleInputFocus}
            {...register("expiry", {
              onChange: (e) => {
                e.target.value = formatExpirationDate(e.target.value);
                setValue("expiry", e.target.value);
              },
            })}
            className={classNames(
              watch("focus") === "expiry" && "z-10",
              "flex-1",
            )}
            inputClassName="rounded-t-none rounded-br-none"
          />

          <Input
            id="cvc"
            type="tel"
            pattern="\d{3,4}"
            placeholder="CVC"
            onFocus={handleInputFocus}
            {...register("cvc", {
              onChange: (e) => {
                e.target.value = formatCVC(e.target.value);
                setValue("cvc", e.target.value);
              },
            })}
            className={classNames(
              watch("focus") === "cvc" && "z-10",
              "w-full max-w-[100px]",
            )}
            inputClassName="rounded-t-none rounded-bl-none"
          />
        </div>
        {/* Show one error message at a time for each card field */}
        <ErrorMessage>
          {errors.number?.message ||
            errors.expiry?.message ||
            errors.cvc?.message}
        </ErrorMessage>
      </div>

      <button type="submit">Comprar</button>
    </form>
  );
};

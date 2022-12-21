import { useState } from "react";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, ILogin } from "@acme/validations";

import { Input, Button, Spinner } from "@/shared/components";

export interface LoginProps {
  onChangeTab?: () => void;
  onSuccess?: () => void;
}

export const Login: React.FC<LoginProps> = (props) => {
  const { onChangeTab, onSuccess } = props;
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ILogin>({
    resolver: zodResolver(loginSchema),
  });

  const loginSubmit = async (data: ILogin) => {
    try {
      setLoading(true);
      const response = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (response && response.ok) {
        onSuccess?.();
      } else if (response && !response.ok) {
        setError("email", {
          message: "Email o contraseña incorrectos",
        });
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("password", {
        message: "Error ingresando a la cuenta",
      });
    }
  };

  return (
    <div className="space-y-4">
      <Input
        label="Email"
        type="email"
        name="email"
        register={register}
        error={errors.email?.message}
      />
      <Input
        label="Contraseña"
        type="password"
        name="password"
        register={register}
        error={errors.password?.message}
      />

      <Button
        color="black"
        className="w-full"
        onClick={handleSubmit(loginSubmit)}
        loading={isSubmitting}
      >
        {isSubmitting ? <Spinner className="mr-2" /> : null}
        Iniciar sesión
      </Button>
      <p className="text-sm">
        ¿Nuevo en Agotao?{" "}
        <button className="text-primary" onClick={onChangeTab}>
          Crea una cuenta gratis aquí
        </button>
      </p>
    </div>
  );
};

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, ISignup } from "@acme/validations";

// Services
import { trpc } from "@/utils/trpc";

// Components
import { Input, Button, Spinner } from "@/shared/components";

export interface SignupProps {
  onChangeTab?: () => void;
  onSuccess?: () => void;
}

export const Signup: React.FC<SignupProps> = (props) => {
  const { onChangeTab, onSuccess } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ISignup>({
    resolver: zodResolver(signupSchema),
  });

  const signupMutation = trpc.auth.signup.useMutation({
    onSuccess() {
      onSuccess?.();
    },
    onError(error) {
      console.log(error);
      setError("email", {
        type: "manual",
        message: error.message,
      });
    },
  });

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
        onClick={handleSubmit((data) => signupMutation.mutate(data))}
        loading={signupMutation.isLoading}
      >
        {signupMutation.isLoading ? <Spinner className="mr-2" /> : null}
        Regístrate
      </Button>

      <p className="text-sm">
        ¿Ya tienes una cuenta de Agotao?{" "}
        <button className="text-primary" onClick={onChangeTab}>
          Inicia sesión aquí
        </button>
      </p>
    </div>
  );
};

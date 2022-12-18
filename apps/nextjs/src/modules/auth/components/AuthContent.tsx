// Libraries
import classNames from "classnames";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signupSchema, ISignup } from "@acme/validations";

// Services
import { trpc } from "@/utils/trpc";

// Components
import { SocialButton } from "@/modules/auth/components";
import { Input, Button, Divider } from "@/shared/components";

export interface AuthContentProps {
  className?: string;
  initTab?: "login" | "register";
}

export const AuthContent: React.FC<AuthContentProps> = (props) => {
  const { initTab = "login", className } = props;

  const [activeTab, setActiveTab] = useState<"login" | "register">(initTab);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ISignup>({
    resolver: zodResolver(signupSchema),
  });

  const signupMutation = trpc.auth.signup.useMutation({
    onSuccess(data, variables, context) {
      console.log(data, variables, context);
    },
    onError(error, variables, context) {},
  });

  return (
    <div
      className={classNames(
        className,
        "inline-block w-full transform overflow-hidden bg-white px-4 py-6 align-middle shadow-xl transition-all sm:max-w-md sm:rounded-2xl sm:border sm:border-gray-200 sm:py-10 sm:px-6",
      )}
    >
      <div className="mb-16 space-y-2">
        <h1 className="text-3xl font-bold">
          {activeTab === "login" ? "Iniciar sesión" : "Crear cuenta"}
        </h1>
      </div>

      <AnimatePresence initial={false} mode="wait">
        {activeTab === "login" ? (
          <motion.div
            key="login"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
          >
            <div className="space-y-4">
              <Input label="Email" {...register("email")} />
              <Input
                label="Contraseña"
                type="password"
                {...register("password")}
              />
              <Button color="black">Iniciar sesión</Button>

              <p className="text-sm">
                ¿Nuevo en Agotao?{" "}
                <button
                  className="text-primary"
                  onClick={() => setActiveTab("register")}
                >
                  Crea una cuenta gratis aquí
                </button>
              </p>
            </div>{" "}
          </motion.div>
        ) : (
          <motion.div
            key="register"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
          >
            <div className="space-y-4">
              <Input label="Email" {...register("email")} />
              <Input
                label="Contraseña"
                type="password"
                {...register("password")}
              />
              <Button color="black">Regístrate</Button>
              <p className="text-sm">
                ¿Ya tienes una cuenta de Agotao?{" "}
                <button
                  className="text-primary"
                  onClick={() => setActiveTab("login")}
                >
                  Inicia sesión aquí
                </button>
              </p>
            </div>{" "}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-24">
        <Divider className="mb-4">
          <p className="text-sm font-semibold">O Ingresa con</p>
        </Divider>
        <div className="grid grid-cols-2 gap-2">
          <SocialButton social="facebook" />
          <SocialButton social="google" />
        </div>
      </div>
    </div>
  );
};

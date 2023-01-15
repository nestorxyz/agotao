// Libraries
import classNames from "classnames";
import { useState } from "react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { signInWithGoogle } from "@/shared/utils/firebaseAuth";

// Components
import { Button } from "@/shared/components";

export interface AuthContentProps {
  className?: string;
  initTab?: "login" | "register";
  callbackUrl?: string;
  usingFor?: "modal" | "page";
}

export const AuthContent: React.FC<AuthContentProps> = (props) => {
  const { initTab = "login", className, usingFor = "modal" } = props;

  const [activeTab, setActiveTab] = useState<"login" | "register">(initTab);
  const router = useRouter();

  const onChangeTab = () => {
    if (usingFor === "page") {
      router.push(activeTab === "login" ? "/signup" : "/login");
    } else {
      setActiveTab((prev) => (prev === "login" ? "register" : "login"));
    }
  };

  return (
    <div
      className={classNames(
        className,
        usingFor === "modal" && "shadow-xl",
        "inline-block w-full transform overflow-hidden bg-white px-4 py-6 align-middle transition-all sm:max-w-md sm:rounded-2xl sm:border sm:border-gray-200 sm:py-10 sm:px-6",
      )}
    >
      <div className="mb-16 space-y-2">
        <h1 className="text-3xl font-bold">
          {activeTab === "login" ? "Iniciar sesión" : "Crear cuenta"}
        </h1>
        <p className="text-sm text-gray-500">
          {activeTab === "login"
            ? "Ingresa con tu cuenta de Google"
            : "Crea una cuenta con tu cuenta de Google"}
        </p>
      </div>

      <Button
        filled
        className="mb-4 w-full"
        size="large"
        color="black"
        onClick={signInWithGoogle}
      >
        <FcGoogle className="mr-2 h-6 w-6" />
        Google
      </Button>

      {activeTab === "register" ? (
        <p className="text-sm">
          ¿Ya tienes una cuenta de Agotao?{" "}
          <button className="font-medium text-primary" onClick={onChangeTab}>
            Inicia sesión aquí
          </button>
        </p>
      ) : (
        <p className="text-sm">
          ¿Nuevo en Agotao?{" "}
          <button className="font-medium text-primary" onClick={onChangeTab}>
            Crea una cuenta gratis aquí
          </button>
        </p>
      )}
    </div>
  );
};

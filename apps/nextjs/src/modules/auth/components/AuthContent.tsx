import { useState } from "react";

import { Input, Button } from "@/shared/components";

export interface AuthContentProps {
  className?: string;
  initTab?: "login" | "register";
}

export const AuthContent: React.FC<AuthContentProps> = (props) => {
  const { initTab = "login", className } = props;

  const [activeTab, setActiveTab] = useState<"login" | "register">(initTab);

  return (
    <div className="inline-block w-full transform overflow-hidden bg-white align-middle shadow-xl transition-all sm:max-w-md sm:rounded-2xl sm:border sm:border-gray-200">
      <div className="space-y-2">
        <h1 className="text-3xl">
          {activeTab === "login" ? "Iniciar sesión" : "Crear cuenta"}
        </h1>
        {activeTab === "register" && (
          <p>Hacemos las compras digitales y físicas fáciles para todos</p>
        )}
      </div>

      <Input label="Crea una cuenta con tu email" />
      <Button>Crear cuenta</Button>

      <p>
        ¿Ya tienes una cuenta de Agotao? <button>Iniciar sesión aquí</button>
      </p>

      <p>O Ingresa con</p>
    </div>
  );
};

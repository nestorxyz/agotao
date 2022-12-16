import { useState } from "react";

export interface AuthContentProps {
  className?: string;
  initTab?: "login" | "register";
}

export const AuthContent: React.FC<AuthContentProps> = (props) => {
  const { initTab = "login", className } = props;

  const [activeTab, setActiveTab] = useState<"login" | "register">(initTab);

  return (
    <div>
      <h1 className="text-3xl">
        {activeTab === "login" ? "Iniciar sesión" : "Crear cuenta"}
      </h1>
      <p>
        {activeTab === "register" &&
          "Hacemos las compras digitales y físicas fáciles para todos"}
      </p>
    </div>
  );
};

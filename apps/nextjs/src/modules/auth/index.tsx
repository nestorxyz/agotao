// Libraries
import classNames from "classnames";
import { useState } from "react";
import { useRouter } from "next/router";

// Components
import { SocialButton, Signup, Login } from "@/modules/auth/components";
import { Divider } from "@/shared/components";

export interface AuthContentProps {
  className?: string;
  initTab?: "login" | "register";
  onSuccess?: () => void;
  usingFor?: "modal" | "page";
}

export const AuthContent: React.FC<AuthContentProps> = (props) => {
  const { initTab = "login", className, onSuccess, usingFor = "modal" } = props;

  const [activeTab, setActiveTab] = useState<"login" | "register">(initTab);
  const router = useRouter();

  const onChangeTab = () => {
    if (usingFor === "page") {
      router.push(activeTab === "login" ? "/auth/signup" : "/auth/login");
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
      </div>

      {activeTab === "register" ? (
        <Signup onSuccess={onSuccess} onChangeTab={onChangeTab} />
      ) : (
        <Login onSuccess={onSuccess} onChangeTab={onChangeTab} />
      )}

      {/* <div className="mt-24">
        <Divider className="mb-4">
          <p className="text-sm font-semibold">O Ingresa con</p>
        </Divider>
        <div className="grid grid-cols-2 gap-2">
          <SocialButton social="facebook" />
          <SocialButton social="google" />
        </div>
      </div> */}
    </div>
  );
};

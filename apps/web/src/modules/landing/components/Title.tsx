import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { Button } from "@/shared/components";

export const Title: React.FC = () => {
  const router = useRouter();

  return (
    <div className="relative mb-12 mt-36 max-w-[800px] space-y-5 md:mt-[200px]">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center text-[40px] font-extrabold leading-[45px] text-black sm:text-5xl md:text-7xl"
      >
        Acepta pagos en Perú desde tu sitio web
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center text-lg text-gray-500"
      >
        Con las APIs y pasarela de pagos de Agotao puedes integrar pagos en tu
        sitio web en minutos.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <Button
          filled
          color="primary"
          size="large"
          className="mx-auto w-fit px-6"
          onClick={() => router.push("/signup")}
        >
          Crea tu cuenta
        </Button>
      </motion.div>
    </div>
  );
};

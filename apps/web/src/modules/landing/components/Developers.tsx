// h-[500px] w-[1040px]
// Aspect ratio: 1040 / 500  = 2.08

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { BsCheckCircleFill } from "react-icons/bs";

import { Button } from "@/shared/components";

export const Developers: React.FC = () => {
  return (
    <section className="relative flex h-min w-full flex-col gap-8 py-[50px] md:py-[100px] lg:flex-row lg:items-center lg:gap-16">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-[50px] space-y-[10px] text-left md:mb-6"
        >
          <h3 className="font-bold uppercase text-primary">
            Soluciones completas
          </h3>
          <h2 className="text-4xl font-bold md:text-5xl">
            Centrado en desarrolladores
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <p className="text-lg text-gray-500">
            Construye rápidamente integraciones listas para producción con
            nuestras APIs y webhooks. Usando nuestras herramientas de
            desarrollo, puedes centrarte en tus usuarios y experiencias de tu
            aplicación.
          </p>

          <div className="space-y-1">
            <div className="flex items-center gap-2 font-semibold text-primary">
              <BsCheckCircleFill className="text-primary" />
              <a
                href="https://docs.agotao.com/checkout"
                className="hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                Códigos de ejemplo
              </a>
            </div>
            <div className="flex items-center gap-2 font-semibold text-primary">
              <BsCheckCircleFill className="text-primary" />
              <a
                href="https://docs.agotao.com/webhook"
                className="hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                Webhooks
              </a>
            </div>
            <div className="flex items-center gap-2 font-semibold text-primary">
              <BsCheckCircleFill className="text-primary" />
              <a
                href="https://docs.agotao.com/checkout"
                className="hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                Envía metadata en el checkout
              </a>
            </div>
          </div>

          <Button
            filled
            onClick={() => window.open("https://docs.agotao.com/checkout")}
            color="primary"
            className="group"
          >
            Explora la documentación
            <ChevronRightIcon className="ml-1 h-5 w-5 transition-all group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>

      <motion.div
        animate={{
          y: [0, 15, 0],
          transition: {
            duration: 2.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          },
        }}
        className="relative aspect-[2.08] w-full shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]"
      >
        <Image src="/images/code.png" width={1040} height={777} alt="Code" />
      </motion.div>
    </section>
  );
};

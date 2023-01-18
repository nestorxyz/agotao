import { motion } from "framer-motion";
import {
  CardStackPlusIcon,
  ClockIcon,
  RocketIcon,
} from "@radix-ui/react-icons";

export const Features: React.FC = () => {
  return (
    <section className="h-min max-w-7xl py-[50px] md:py-[100px]">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.8 }}
        className="mx-auto mb-[50px] max-w-[600px] space-y-[10px] text-center md:mb-[80px]"
      >
        <h3 className="font-bold uppercase text-primary">
          Para todos los negocios
        </h3>
        <h2 className="text-4xl font-bold md:text-5xl">
          Rápida integración y precios simples
        </h2>
      </motion.div>
      <div className="grid gap-5 lg:grid-cols-3">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1 }}
          className="rounded-[20px] border border-gray-100 p-10 shadow-sm"
        >
          <div className="mb-[30px] w-fit rounded-md bg-primary-50 p-3">
            <CardStackPlusIcon className="h-8 w-8 text-primary" />
          </div>
          <h4 className="mb-[10px] text-2xl font-extrabold">
            Acepta pagos en línea
          </h4>
          <p className="text-lg text-gray-500">
            Simplifica el proceso de pago de tus clientes con una pasarela de
            pagos segura y configurable.
          </p>
          <p className="text-lg text-gray-500">
            Aceptamos transferencias BBVA, BCP, Interbank, Yape y Plin.
          </p>
        </motion.article>
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.2 }}
          className="rounded-[20px] border border-gray-100 p-10 shadow-sm"
        >
          <div className="mb-[30px] w-fit rounded-md bg-primary-50 p-3">
            <ClockIcon className="h-8 w-8 text-primary" />
          </div>
          <h4 className="mb-[10px] text-2xl font-extrabold">
            Inicia en minutos
          </h4>
          <p className="text-lg text-gray-500"></p>
          <p className="text-lg text-gray-500">
            Crea tu cuenta, integra las APIs y comienza a aceptar pagos en
            línea.
          </p>
        </motion.article>
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.4 }}
          className="rounded-[20px] border border-gray-100 p-10 shadow-sm"
        >
          <div className="mb-[30px] w-fit rounded-md bg-primary-50 p-3">
            <RocketIcon className="h-8 w-8 text-primary" />
          </div>
          <h4 className="mb-[10px] text-2xl font-extrabold">
            Precio simple a tu ritmo
          </h4>
          <p className="text-lg text-gray-500">
            2.9% + S/1.00 por venta exitosa. Sin costos de instalación o
            comisiones mensuales.
          </p>
          <p className="text-lg text-gray-500">
            Ventas menores a S/50.00, tienen comisión de solo el 2.9%.{" "}
          </p>
        </motion.article>
      </div>
    </section>
  );
};

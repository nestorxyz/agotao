import { motion, Variants } from "framer-motion";

const variants: Variants = {
  enter: () => {
    return {
      y: 200,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    y: 0,
    opacity: 1,
  },
};

export const Cards: React.FC = () => {
  return (
    <section className="grid gap-4 md:grid-cols-3 lg:max-w-sm lg:grid-cols-1">
      <motion.article
        variants={variants}
        initial="enter"
        animate="center"
        transition={{
          y: { type: "spring", stiffness: 400, damping: 70 },
          opacity: { duration: 0.5 },
        }}
        className="rounded-xl bg-white px-6 py-4 shadow-[rgba(105,_79,_255,_0.1)_0px_9px_30px]"
      >
        <h3 className="text-lg font-semibold">Acepta pagos en línea</h3>
        <p className="text-gray-500">
          Desde links de pago de tus productos hasta integraciones para la web.
          Aceptamos transferencias BBVA, BCP, Interbank, Yape y Plin.
        </p>
      </motion.article>
      <motion.article
        variants={variants}
        initial="enter"
        animate="center"
        transition={{
          y: { type: "spring", stiffness: 400, damping: 70 },
          delay: 0.1,
          opacity: { duration: 0.5 },
        }}
        className="rounded-xl bg-white px-6 py-4 shadow-[rgba(105,_79,_255,_0.1)_0px_9px_30px]"
      >
        <h3 className="text-lg font-semibold">Envía payouts</h3>
        <p className="text-gray-500">
          Envía dinero a tus usuarios a demanda o utiliza las APIs de Agotao.
          Ideal para marketplaces.
        </p>
      </motion.article>
      <motion.article
        variants={variants}
        initial="enter"
        animate="center"
        transition={{
          y: { type: "spring", stiffness: 400, damping: 70 },
          delay: 0.2,
          opacity: { duration: 0.5 },
        }}
        className="rounded-xl bg-white px-6 py-4 shadow-[rgba(105,_79,_255,_0.1)_0px_9px_30px]"
      >
        <h3 className="text-lg font-semibold">Precio simple a tu ritmo</h3>
        <p className="text-gray-500">
          2.9% + S/1.00 por venta exitosa. Sin costos de instalación, comisiones
          mensuales o costos extra.
        </p>
      </motion.article>
    </section>
  );
};

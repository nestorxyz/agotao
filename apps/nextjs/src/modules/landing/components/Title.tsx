import { useState, useEffect } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";

const customers = ["proyecto", "startup", "empresa"];
const variants: Variants = {
  enter: () => {
    return {
      y: -20,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    y: 0,
    opacity: 1,
  },
  exit: () => {
    return {
      zIndex: 0,
      opacity: 0,
    };
  },
};

export const Title: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      let next = index + 1;
      if (next === customers.length) {
        next = 0;
      }
      setIndex(next);
    }, 3 * 1200);
  }, [index, setIndex]);

  return (
    <div className="relative my-4 max-w-[800px] text-center text-4xl font-extrabold md:text-6xl">
      Acepta pagos en tu
      <AnimatePresence>
        <motion.h1
          key={customers[index]}
          className="absolute left-0 right-0 bg-gradient-to-r from-[#FF00B4] to-primary bg-clip-text py-2 text-transparent md:mt-2"
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            y: { type: "spring", stiffness: 300, damping: 200 },
            opacity: { duration: 0.5 },
          }}
        >
          {customers[index]}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
};

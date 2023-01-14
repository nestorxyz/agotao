import { motion, Transition, Variants } from "framer-motion";
import React from "react";

const ContainerVariants = {
  initial: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const DotVariants: Variants = {
  initial: {
    y: "0%",
  },
  animate: {
    y: "100%",
  },
};

const DotTransition: Transition = {
  duration: 0.5,
  repeatType: "reverse",
  repeat: Infinity,
  ease: "easeInOut",
};

export const Dots = () => {
  return (
    <div className="flex w-full items-center justify-center pt-5">
      <motion.div
        className="flex h-fit w-fit gap-2"
        variants={ContainerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.span
          className="block h-5 w-5 rounded-full bg-black"
          variants={DotVariants}
          transition={DotTransition}
        />
        <motion.span
          className="block h-5 w-5 rounded-full bg-black"
          variants={DotVariants}
          transition={DotTransition}
        />
        <motion.span
          className="block h-5 w-5 rounded-full bg-black"
          variants={DotVariants}
          transition={DotTransition}
        />
      </motion.div>
    </div>
  );
};

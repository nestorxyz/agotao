import { motion } from "framer-motion";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const itemIds = [0, 1, 2, 3, 4];

export const Navigation: React.FC = () => {
  return (
    <motion.ul variants={variants}>
      {itemIds.map((i) => (
        <div className="h-100 w-500 bg-gray-300" key={i} />
      ))}
    </motion.ul>
  );
};

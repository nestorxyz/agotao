import { useRef } from "react";
import { Variants, motion, useCycle } from "framer-motion";

// Hooks
import useViewportSize from "@/shared/hooks/use-viewport-size";

// Components
import { MenuToggle } from "./MenuToggle";
import { Navigation } from "./Navigation";

const variants: Variants = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

export const Sidebar: React.FC = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useViewportSize();

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
      className="md:hidden"
    >
      <motion.div
        className="absolute top-0 h-full w-full bg-white"
        variants={variants}
      />
      <Navigation />
      <MenuToggle toggle={() => toggleOpen()} />
    </motion.nav>
  );
};

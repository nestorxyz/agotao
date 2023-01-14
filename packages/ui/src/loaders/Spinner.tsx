import classNames from "classnames";
import { motion, Transition } from "framer-motion";

export interface SpinnerProps {
  className?: string;
}

const spinTransition: Transition = {
  ease: "linear",
  duration: 1,
  repeat: Infinity,
  repeatDelay: 0,
};

export const Spinner: React.FC<SpinnerProps> = (props) => {
  const { className } = props;

  return (
    <div className={classNames(className, "relative h-6 w-6")}>
      <motion.span
        className="absolute h-6 w-6 rounded-full"
        style={{
          border: "3.5px solid rgba(255, 255, 255, 0.5)",
          borderTop: "3.5px solid #ffffff",
          top: 0,
          left: 0,
        }}
        animate={{ rotate: 360 }}
        transition={spinTransition}
      />
    </div>
  );
};

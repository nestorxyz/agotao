import Image from "next/image";
import { motion } from "framer-motion";
// h-[288px] w-[600px]
// Aspect ratio: 600 / 288 = 2.083

export const Preview: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.5 }}
      className="max-w-[800px] flex-1 overflow-hidden rounded-lg shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] md:rounded-xl"
    >
      <div className="flex h-4 w-full items-center gap-1 bg-black px-2 md:h-6">
        <div className="h-2 w-2 rounded-full bg-[#f35162]"></div>
        <div className="h-2 w-2 rounded-full bg-[#f5d737]"></div>
        <div className="h-2 w-2 rounded-full bg-[#15bc59]"></div>
      </div>
      <Image src="/images/demo.png" alt="Demo" width={1200} height={288} />
    </motion.div>
  );
};

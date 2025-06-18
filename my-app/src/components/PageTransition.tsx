import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const variants = {
  initial: { x: '100%', opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: '-100%', opacity: 0 },
};

const PageTransition = ({ children }: Props) => (
  <motion.div
    variants={variants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ type: 'tween', duration: 0.3 }}
    style={{ width: '100%' }}
  >
    {children}
  </motion.div>
);

export default PageTransition;

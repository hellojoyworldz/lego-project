import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  /**
   * 애니메이션 종류
   * - 'menu': 메뉴에서 페이지 진입
   * - 'sub':  페이지에서 세부 페이지 진입
   * - 'back': 뒤로가기
   */
  animation?: 'menu' | 'sub' | 'back';
}

const variants = {
  menu: {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
  },
  sub: {
    initial: { y: '100%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: '-100%', opacity: 0 },
  },
  back: {
    initial: { x: '-100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '100%', opacity: 0 },
  },
} as const;

const PageTransition = ({ children, animation = 'menu' }: Props) => (
  <motion.div
    variants={variants[animation]}
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

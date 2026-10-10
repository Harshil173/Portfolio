import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Section({ id, children, className = '', noPadding = false }: SectionProps) {
  return (
    <motion.section
      id={id}
      className={`${noPadding ? '' : 'section'} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionVariants}
    >
      <div className="section-inner">{children}</div>
    </motion.section>
  );
}

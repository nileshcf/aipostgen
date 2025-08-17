'use client';
import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`glass p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}

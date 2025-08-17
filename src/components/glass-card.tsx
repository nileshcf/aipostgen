'use client';
import { motion } from 'framer-motion';

type GlassCardProps = {
  children?: React.ReactNode;   // <-- allow children
  className?: string;
  title?: string;               // <-- new
  description?: string;         // <-- new
};

export default function GlassCard({ children, className = '', title, description }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`glass p-6 ${className}`}
    >
      {/* If title/desc passed, show them in Apple-style */}
      {title && (
        <h2 className="grad-title text-lg font-semibold mb-1">{title}</h2>
      )}
      {description && (
        <p className="text-sm text-neutral-600 mb-4">{description}</p>
      )}
      {children}
    </motion.div>
  );
}

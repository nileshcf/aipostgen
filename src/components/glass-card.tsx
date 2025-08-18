'use client';
import { motion } from 'framer-motion';

type GlassCardProps = {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  gradient?: string; // <-- new for gradient titles
};

export default function GlassCard({
  children,
  className = '',
  title,
  description,
  gradient = 'from-pink-500 via-purple-500 to-indigo-500',
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`rounded-2xl p-6 shadow-lg border border-gray-200/50 bg-white/70 backdrop-blur-xl ${className}`}
    >
      {/* Gradient Title */}
      {title && (
        <h2
          className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent text-xl font-bold mb-2`}
        >
          {title}
        </h2>
      )}

      {/* Subtext */}
      {description && (
        <p className="text-sm text-gray-600 mb-4">{description}</p>
      )}

      {children}
    </motion.div>
  );
}

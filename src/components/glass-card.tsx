'use client';
import { motion } from 'framer-motion';

interface GlassCardProps {
  title: string;
  description: string;
  className?: string;
}

export default function GlassCard({ title, description, className = '' }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`glass p-6 rounded-2xl shadow-md ${className}`}
    >
      <h3 className="text-xl font-semibold grad-title">{title}</h3>
      <p className="mt-3 text-gray-600">{description}</p>
    </motion.div>
  );
}

'use client';

import { motion } from 'framer-motion';
import { STATE_TRANSITIONS } from '@/data/constants';

type Props = {
  transitionKey: string;
  onContinue: () => void;
};

export function StateTransition({ transitionKey, onContinue }: Props) {
  const data = STATE_TRANSITIONS[transitionKey];
  if (!data) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-lg mx-auto"
    >
      <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#7C6FAF]/10 flex items-center justify-center">
          <svg className="w-8 h-8 text-[#7C6FAF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-[#3D3552] mb-3">{data.title}</h2>
        <p className="text-[#8E8AA0] leading-relaxed mb-6">{data.description}</p>
        <button
          onClick={onContinue}
          className="bg-[#7C6FAF] text-white px-8 py-3 rounded-2xl font-bold hover:bg-[#6B5E9E] transition-colors cursor-pointer"
        >
          次へ進む
        </button>
      </div>
    </motion.div>
  );
}

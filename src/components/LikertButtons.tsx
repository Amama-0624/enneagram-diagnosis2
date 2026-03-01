'use client';

import { motion } from 'framer-motion';
import { LikertValue } from '@/data/types';

type Props = {
  onAnswer: (value: LikertValue) => void;
  currentAnswer?: LikertValue;
};

const options: { value: LikertValue; label: string; shortLabel: string }[] = [
  { value: 1, label: 'まったく当てはまらない', shortLabel: 'まったく' },
  { value: 2, label: 'あまり当てはまらない', shortLabel: 'あまり' },
  { value: 3, label: 'やや当てはまる', shortLabel: 'やや' },
  { value: 4, label: 'よく当てはまる', shortLabel: 'よく' },
];

const colorsByValue: Record<LikertValue, { bg: string; hover: string; active: string }> = {
  1: { bg: 'bg-[#E8E4F0]', hover: 'hover:bg-[#D8D2E6]', active: 'bg-[#7C6FAF] text-white' },
  2: { bg: 'bg-[#EDE8F2]', hover: 'hover:bg-[#DDD6EA]', active: 'bg-[#9B8DC5] text-white' },
  3: { bg: 'bg-[#F5EDF0]', hover: 'hover:bg-[#EEDDE3]', active: 'bg-[#E8899A] text-white' },
  4: { bg: 'bg-[#F8EEF0]', hover: 'hover:bg-[#F2DDE2]', active: 'bg-[#F2A7B3] text-white' },
};

export function LikertButtons({ onAnswer, currentAnswer }: Props) {
  return (
    <div className="w-full max-w-lg mx-auto mt-8">
      {/* Desktop: 横並び */}
      <div className="hidden sm:grid grid-cols-4 gap-3">
        {options.map(opt => {
          const isActive = currentAnswer === opt.value;
          const colors = colorsByValue[opt.value];
          return (
            <motion.button
              key={opt.value}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onAnswer(opt.value)}
              className={`py-4 px-2 rounded-2xl font-medium text-sm transition-colors cursor-pointer ${
                isActive ? colors.active : `${colors.bg} ${colors.hover} text-[#3D3552]`
              }`}
            >
              {opt.label}
            </motion.button>
          );
        })}
      </div>

      {/* Mobile: 縦並び */}
      <div className="sm:hidden space-y-2">
        {options.map(opt => {
          const isActive = currentAnswer === opt.value;
          const colors = colorsByValue[opt.value];
          return (
            <motion.button
              key={opt.value}
              whileTap={{ scale: 0.97 }}
              onClick={() => onAnswer(opt.value)}
              className={`w-full py-3 px-4 rounded-2xl font-medium text-base transition-colors cursor-pointer ${
                isActive ? colors.active : `${colors.bg} ${colors.hover} text-[#3D3552]`
              }`}
            >
              {opt.label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

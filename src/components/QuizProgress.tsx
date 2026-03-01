'use client';

import { motion } from 'framer-motion';
import { STATE_LABELS } from '@/data/constants';
import { State } from '@/data/types';

type Props = {
  current: number;
  total: number;
  progress: number;
  currentState: State | null;
};

export function QuizProgress({ current, total, progress, currentState }: Props) {
  return (
    <div className="w-full max-w-lg mx-auto mb-6">
      {/* 状態ラベルと進捗数 */}
      <div className="flex justify-between items-center mb-2">
        {currentState && (
          <span className="text-sm font-medium text-[#7C6FAF] bg-[#7C6FAF]/10 px-3 py-1 rounded-full">
            {STATE_LABELS[currentState]}
          </span>
        )}
        <span className="text-sm text-[#8E8AA0]">
          {Math.min(current + 1, total)} / {total}
        </span>
      </div>

      {/* プログレスバー */}
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[#7C6FAF] to-[#F2A7B3]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

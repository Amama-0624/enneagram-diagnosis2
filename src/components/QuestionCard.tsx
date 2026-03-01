'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Question, AnswerMode } from '@/data/types';

type Props = {
  question: Question;
  mode: AnswerMode;
  direction: 1 | -1;
};

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
  }),
};

export function QuestionCard({ question, mode, direction }: Props) {
  const text = mode === 'parent' ? question.text.parent : question.text.self;

  return (
    <div className="w-full max-w-lg mx-auto min-h-[120px] flex items-center justify-center">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={question.id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="w-full bg-white rounded-3xl shadow-lg p-8 text-center"
        >
          <p className="text-xl md:text-[22px] font-medium text-[#3D3552] leading-relaxed">
            {text}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

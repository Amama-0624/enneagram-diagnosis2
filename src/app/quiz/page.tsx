'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useDiagnosis } from '@/hooks/useDiagnosis';
import { QuizProgress } from '@/components/QuizProgress';
import { QuestionCard } from '@/components/QuestionCard';
import { LikertButtons } from '@/components/LikertButtons';
import { StateTransition } from '@/components/StateTransition';

export default function QuizPage() {
  const router = useRouter();
  const {
    mode,
    setMode,
    answers,
    currentIndex,
    currentQuestion,
    currentState,
    totalQuestions,
    progress,
    direction,
    showTransition,
    pendingTransitionKey,
    answer,
    dismissTransition,
    goBack,
    isComplete,
  } = useDiagnosis();

  // モード読み込み
  useEffect(() => {
    const stored = localStorage.getItem('enneagram-mode');
    if (stored === 'parent' || stored === 'self') {
      setMode(stored);
    } else {
      router.push('/');
    }
  }, [setMode, router]);

  // 完了時に結果ページへ
  useEffect(() => {
    if (isComplete) {
      // 回答データをlocalStorageに保存して結果ページへ
      localStorage.setItem('enneagram-answers', JSON.stringify(answers));
      router.push('/result');
    }
  }, [isComplete, answers, router]);

  if (!currentQuestion && !showTransition) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#8E8AA0]">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* プログレスバー */}
        <QuizProgress
          current={currentIndex}
          total={totalQuestions}
          progress={progress}
          currentState={currentState}
        />

        {/* 状態遷移カード or 質問カード */}
        {showTransition && pendingTransitionKey ? (
          <StateTransition
            transitionKey={pendingTransitionKey}
            onContinue={dismissTransition}
          />
        ) : currentQuestion ? (
          <>
            <QuestionCard
              question={currentQuestion}
              mode={mode}
              direction={direction}
            />

            <LikertButtons
              onAnswer={answer}
              currentAnswer={answers[currentQuestion.id]}
            />

            {/* 戻るボタン */}
            <div className="mt-6 text-center">
              {currentIndex > 0 && (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={goBack}
                  className="text-[#8E8AA0] text-sm hover:text-[#7C6FAF] transition-colors cursor-pointer"
                >
                  ← 前の質問に戻る
                </motion.button>
              )}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

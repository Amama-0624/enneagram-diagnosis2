'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { questions } from '@/data/questions';
import { AnswerMode, Answers, LikertValue, DiagnosisResult, State } from '@/data/types';
import { shuffleQuestions } from '@/lib/shuffle';
import { calculateResult } from '@/lib/scoring';

const STORAGE_KEY = 'enneagram-diagnosis';

type StoredData = {
  mode: AnswerMode;
  answers: Answers;
  currentIndex: number;
};

export function useDiagnosis() {
  const [mode, setMode] = useState<AnswerMode>('parent');
  const [answers, setAnswers] = useState<Answers>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [showTransition, setShowTransition] = useState(false);
  const [pendingTransitionKey, setPendingTransitionKey] = useState<string | null>(null);
  const [seenTransitions, setSeenTransitions] = useState<Set<string>>(new Set());

  // シャッフル済み質問リスト（初回のみ生成）
  const [shuffledQuestions] = useState(() => shuffleQuestions(questions));

  const totalQuestions = shuffledQuestions.length;
  const currentQuestion = shuffledQuestions[currentIndex] ?? null;
  const progress = totalQuestions > 0 ? ((currentIndex) / totalQuestions) * 100 : 0;

  // 現在の状態ラベル
  const currentState: State | null = currentQuestion?.state ?? null;

  // localStorageへの保存
  useEffect(() => {
    try {
      const data: StoredData = { mode, answers, currentIndex };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ignore
    }
  }, [mode, answers, currentIndex]);

  // localStorageからの復元
  const restoreFromStorage = useCallback(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data: StoredData = JSON.parse(raw);
        setMode(data.mode);
        setAnswers(data.answers);
        setCurrentIndex(data.currentIndex);
        return true;
      }
    } catch {
      // ignore
    }
    return false;
  }, []);

  // 回答を記録して次へ
  const answer = useCallback((value: LikertValue) => {
    if (!currentQuestion) return;

    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
    setDirection(1);

    const nextIndex = currentIndex + 1;
    if (nextIndex < totalQuestions) {
      // 状態遷移チェック
      const nextQuestion = shuffledQuestions[nextIndex];
      const transitionKey = `${currentQuestion.state}-${nextQuestion.state}`;
      if (
        currentQuestion.state !== nextQuestion.state &&
        !seenTransitions.has(transitionKey)
      ) {
        setPendingTransitionKey(transitionKey);
        setShowTransition(true);
        setSeenTransitions(prev => new Set(prev).add(transitionKey));
      } else {
        setCurrentIndex(nextIndex);
      }
    } else {
      setCurrentIndex(nextIndex); // 完了
    }
  }, [currentQuestion, currentIndex, totalQuestions, shuffledQuestions, seenTransitions]);

  // 遷移画面を閉じて次の問題へ
  const dismissTransition = useCallback(() => {
    setShowTransition(false);
    setPendingTransitionKey(null);
    setCurrentIndex(prev => prev + 1);
  }, []);

  // 前に戻る
  const goBack = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  // 診断完了判定
  const isComplete = currentIndex >= totalQuestions;

  // 結果計算
  const result: DiagnosisResult | null = useMemo(() => {
    if (!isComplete) return null;
    return calculateResult(answers);
  }, [isComplete, answers]);

  // リセット
  const reset = useCallback(() => {
    setAnswers({});
    setCurrentIndex(0);
    setSeenTransitions(new Set());
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
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
    result,
    reset,
    restoreFromStorage,
  };
}

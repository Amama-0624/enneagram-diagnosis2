import { Question } from '@/data/types';

/**
 * Fisher-Yates シャッフル（非破壊的）
 */
function shuffleArray<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * 質問を出題順に並べる
 * - 状態 A → B → C の順序は維持
 * - 各状態内ではタイプ順をシャッフル
 */
export function shuffleQuestions(questions: Question[]): Question[] {
  const stateA = questions.filter(q => q.state === 'A');
  const stateB = questions.filter(q => q.state === 'B');
  const stateC = questions.filter(q => q.state === 'C');

  return [
    ...shuffleArray(stateA),
    ...shuffleArray(stateB),
    ...shuffleArray(stateC),
  ];
}

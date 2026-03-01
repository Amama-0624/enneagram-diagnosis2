import {
  Answers, EnneagramType, DiagnosisResult,
  WingResult, DistortionInfo, StressDetail, ReliabilityResult,
} from '@/data/types';
import { questions } from '@/data/questions';
import { STRESS_LINES, WING_CANDIDATES } from '@/data/constants';

const ALL_TYPES: EnneagramType[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

/**
 * 回答値を正規化（逆転項目の反転処理）
 */
function normalizeValue(value: number, isReverse: boolean): number {
  return isReverse ? 5 - value : value;
}

/**
 * 指定状態の各タイプスコアを集計
 * 各タイプ2問 × 最大4点 = 最大8点 → 0-100 に正規化
 */
function calcStateScores(answers: Answers, state: 'A' | 'B' | 'C'): Record<number, number> {
  const scores: Record<number, number> = {};
  for (const t of ALL_TYPES) {
    const qs = questions.filter(q => q.state === state && q.type === t);
    let sum = 0;
    let count = 0;
    for (const q of qs) {
      const val = answers[q.id];
      if (val !== undefined) {
        sum += normalizeValue(val, q.isReverse);
        count++;
      }
    }
    // 各問1-4点、2問で2-8点 → 0-100に変換
    const maxPossible = count * 4;
    const minPossible = count;
    scores[t] = count > 0
      ? Math.round(((sum - minPossible) / (maxPossible - minPossible)) * 100)
      : 0;
  }
  return scores;
}

/**
 * コアタイプ推定（Aスコアの最高タイプ）
 */
function determineCoreType(coreScores: Record<number, number>): EnneagramType {
  let maxScore = -1;
  let maxType: EnneagramType = 9;
  for (const t of ALL_TYPES) {
    if (coreScores[t] > maxScore) {
      maxScore = coreScores[t];
      maxType = t;
    }
  }
  return maxType;
}

/**
 * ウィング推定
 */
function determineWing(coreType: EnneagramType, coreScores: Record<number, number>): WingResult {
  const [w1, w2] = WING_CANDIDATES[coreType];
  const s1 = coreScores[w1];
  const s2 = coreScores[w2];
  const diff = Math.abs(s1 - s2);

  if (diff < 10) {
    return { wing: null, label: `${coreType}（バランス型）`, confidence: diff };
  }

  const wing = s1 > s2 ? w1 : w2;
  return {
    wing,
    label: `${coreType}w${wing}`,
    confidence: diff,
  };
}

/**
 * 歪み指数（A→B の変化量）
 */
function calcDistortion(
  coreScores: Record<number, number>,
  adaptationScores: Record<number, number>,
): DistortionInfo[] {
  return ALL_TYPES.map(t => ({
    type: t,
    aScore: coreScores[t],
    bScore: adaptationScores[t],
    diff: adaptationScores[t] - coreScores[t],
  }));
}

/**
 * ストレスライン一致率の計算
 */
function calcStressDetail(
  coreType: EnneagramType,
  stressScores: Record<number, number>,
): StressDetail {
  const stressDir = STRESS_LINES[coreType].disintegration;
  const stressDirScore = stressScores[stressDir];

  // Cスコアの上位タイプ
  const sorted = ALL_TYPES
    .map(t => ({ type: t, score: stressScores[t] }))
    .sort((a, b) => b.score - a.score);
  const cTopInC = sorted.slice(0, 3).map(s => s.type);

  // ストレスライン一致率: ストレス方向タイプが上位に入っている程度
  const matchScore = cTopInC.includes(stressDir) ? stressDirScore : Math.round(stressDirScore * 0.5);

  return {
    coreType,
    stressDirection: stressDir,
    matchScore,
    cTopInC,
  };
}

/**
 * 信頼度の計算
 */
function calcReliability(
  coreScores: Record<number, number>,
  answers: Answers,
): ReliabilityResult {
  const notes: string[] = [];

  // 1. コアタイプと2位の差が小さいか
  const sorted = ALL_TYPES
    .map(t => ({ type: t, score: coreScores[t] }))
    .sort((a, b) => b.score - a.score);
  const topDiff = sorted[0].score - sorted[1].score;
  if (topDiff < 10) {
    notes.push('上位2タイプのスコアが近く、コアタイプの判定が不確実です');
  }

  // 2. 全問回答しているか
  const totalAnswered = Object.keys(answers).length;
  if (totalAnswered < 54) {
    notes.push(`${54 - totalAnswered}問が未回答です`);
  }

  // 3. 回答のばらつき（すべて同じ回答でないか）
  const values = Object.values(answers);
  const allSame = values.length > 0 && values.every(v => v === values[0]);
  if (allSame) {
    notes.push('すべての回答が同じ値です。正確な結果が得られていない可能性があります');
  }

  // スコア算出
  let score = 100;
  if (topDiff < 10) score -= 25;
  if (topDiff < 5) score -= 15;
  if (totalAnswered < 54) score -= (54 - totalAnswered) * 2;
  if (allSame) score -= 40;
  score = Math.max(0, Math.min(100, score));

  let label: string;
  if (score >= 80) label = '高い';
  else if (score >= 60) label = 'やや高い';
  else if (score >= 40) label = '中程度';
  else label = '低い';

  return { score, label, notes };
}

/**
 * メインのスコアリング関数
 */
export function calculateResult(answers: Answers): DiagnosisResult {
  const coreScores = calcStateScores(answers, 'A');
  const adaptationScores = calcStateScores(answers, 'B');
  const stressScores = calcStateScores(answers, 'C');

  const coreType = determineCoreType(coreScores);
  const wing = determineWing(coreType, coreScores);
  const distortion = calcDistortion(coreScores, adaptationScores);
  const highDistortion = distortion.filter(d => Math.abs(d.diff) >= 25);
  const stressDetail = calcStressDetail(coreType, stressScores);
  const reliability = calcReliability(coreScores, answers);

  return {
    coreType,
    coreScores,
    wing,
    adaptationScores,
    stressScores,
    distortion,
    highDistortion,
    stressDetail,
    reliability,
  };
}

/** エニアグラムタイプ (1-9) */
export type EnneagramType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

/** 回答状態: A=安定時, B=困難時(適応), C=強ストレス時 */
export type State = 'A' | 'B' | 'C';

/** 回答モード */
export type AnswerMode = 'parent' | 'self';

/** Likert 4段階 */
export type LikertValue = 1 | 2 | 3 | 4;

/** 質問定義 */
export type Question = {
  id: string;
  type: EnneagramType;
  state: State;
  text: {
    parent: string;
    self: string;
  };
  isReverse: boolean;
};

/** 回答マップ */
export type Answers = Record<string, LikertValue>;

/** ウィング推定結果 */
export type WingResult = {
  wing: EnneagramType | null;
  label: string;
  confidence: number;
};

/** 歪み情報 */
export type DistortionInfo = {
  type: EnneagramType;
  aScore: number;
  bScore: number;
  diff: number;
};

/** ストレス詳細 */
export type StressDetail = {
  coreType: EnneagramType;
  stressDirection: EnneagramType;
  matchScore: number;
  cTopInC: EnneagramType[];
};

/** 信頼度 */
export type ReliabilityResult = {
  score: number;
  label: string;
  notes: string[];
};

/** 診断結果全体 */
export type DiagnosisResult = {
  coreType: EnneagramType;
  coreScores: Record<number, number>;
  wing: WingResult;
  adaptationScores: Record<number, number>;
  stressScores: Record<number, number>;
  distortion: DistortionInfo[];
  highDistortion: DistortionInfo[];
  stressDetail: StressDetail;
  reliability: ReliabilityResult;
};

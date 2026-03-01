'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Answers, AnswerMode, DiagnosisResult } from '@/data/types';
import { TYPE_DESCRIPTIONS } from '@/data/constants';
import { calculateResult } from '@/lib/scoring';
import { TypeBadge } from '@/components/TypeBadge';
import { RadarChartComponent } from '@/components/RadarChart';
import { DistortionBar } from '@/components/DistortionBar';
import { StressArrow } from '@/components/StressArrow';
import { ReframingCard } from '@/components/ReframingCard';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-3xl shadow-lg p-6 md:p-8"
    >
      <h3 className="text-xl font-bold text-[#7C6FAF] mb-4">{title}</h3>
      {children}
    </motion.section>
  );
}

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [mode, setMode] = useState<AnswerMode>('parent');

  useEffect(() => {
    try {
      const answersRaw = localStorage.getItem('enneagram-answers');
      const modeRaw = localStorage.getItem('enneagram-mode');
      if (!answersRaw) {
        router.push('/');
        return;
      }
      const answers: Answers = JSON.parse(answersRaw);
      if (modeRaw === 'parent' || modeRaw === 'self') setMode(modeRaw);
      setResult(calculateResult(answers));
    } catch {
      router.push('/');
    }
  }, [router]);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#8E8AA0]">結果を計算中...</div>
      </div>
    );
  }

  const desc = TYPE_DESCRIPTIONS[result.coreType];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* ヘッダー */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center py-4"
        >
          <p className="text-[#8E8AA0] text-sm mb-4">あなたの診断結果</p>
          <TypeBadge type={result.coreType} wingLabel={result.wing.label} />
        </motion.div>

        {/* 1. コア構造 */}
        <Section title="コア構造（安定時の傾向）">
          <p className="text-[#3D3552] leading-relaxed mb-4">{desc.summary}</p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h4 className="text-sm font-bold text-[#7BC67E] mb-2">強み</h4>
              <ul className="space-y-1">
                {desc.strengths.map((s, i) => (
                  <li key={i} className="text-sm text-[#3D3552]">・ {s}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#F2A7B3] mb-2">課題</h4>
              <ul className="space-y-1">
                {desc.challenges.map((c, i) => (
                  <li key={i} className="text-sm text-[#3D3552]">・ {c}</li>
                ))}
              </ul>
            </div>
          </div>
          <RadarChartComponent
            scores={[
              { label: '安定時 (A)', color: '#7C6FAF', data: result.coreScores },
            ]}
          />
        </Section>

        {/* 2. 適応パターン */}
        <Section title="適応パターン（困難時の変化）">
          <p className="text-[#3D3552] leading-relaxed mb-4">
            困ったときや壁にぶつかったとき、安定時とは異なるパターンが現れることがあります。
            以下は安定時との差分を示しています。
          </p>
          <RadarChartComponent
            scores={[
              { label: '安定時 (A)', color: '#7C6FAF', data: result.coreScores },
              { label: '困難時 (B)', color: '#F2A7B3', data: result.adaptationScores },
            ]}
          />
          <div className="mt-6">
            <h4 className="text-sm font-bold text-[#3D3552] mb-3">歪み指数（A → B の変化量）</h4>
            <DistortionBar distortion={result.distortion} />
          </div>
          {result.highDistortion.length > 0 && (
            <div className="mt-4 bg-[#FFF8F0] rounded-2xl p-4">
              <p className="text-sm text-[#8E8AA0]">
                大きな変化が見られるタイプ:
                {result.highDistortion.map(d => ` タイプ${d.type}(${d.diff > 0 ? '+' : ''}${d.diff})`).join('、')}
              </p>
            </div>
          )}
        </Section>

        {/* 3. ストレス変容 */}
        <Section title="ストレス変容">
          <p className="text-[#3D3552] leading-relaxed mb-6">
            強いストレス下では、エニアグラム理論で予測される「ストレスライン」の方向に
            行動パターンが変化することがあります。
          </p>
          <RadarChartComponent
            scores={[
              { label: '安定時 (A)', color: '#7C6FAF', data: result.coreScores },
              { label: 'ストレス時 (C)', color: '#EF9A9A', data: result.stressScores },
            ]}
          />
          <div className="mt-6">
            <StressArrow stressDetail={result.stressDetail} />
          </div>
        </Section>

        {/* 4. ウィング */}
        <Section title="ウィング推定">
          <div className="text-center">
            <TypeBadge type={result.coreType} wingLabel={result.wing.label} size="sm" />
            <p className="mt-4 text-[#3D3552] leading-relaxed">
              {result.wing.wing
                ? `隣接するタイプ${result.wing.wing}の影響が見られます（信頼度差: ${result.wing.confidence}pt）。`
                : '両隣のタイプがほぼ均等で、バランス型と推定されます。'
              }
            </p>
          </div>
        </Section>

        {/* 5. リフレーミング（親モードのみ） */}
        {mode === 'parent' && (
          <Section title="リフレーミング">
            <ReframingCard coreType={result.coreType} />
          </Section>
        )}

        {/* 6. 信頼度 */}
        <Section title="診断の信頼度">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${result.reliability.score}%`,
                  backgroundColor:
                    result.reliability.score >= 80 ? '#7BC67E' :
                    result.reliability.score >= 60 ? '#F7C873' :
                    result.reliability.score >= 40 ? '#F2A7B3' : '#EF9A9A',
                }}
              />
            </div>
            <span className="text-lg font-bold text-[#3D3552]">
              {result.reliability.label}
            </span>
          </div>
          {result.reliability.notes.length > 0 && (
            <ul className="space-y-1">
              {result.reliability.notes.map((note, i) => (
                <li key={i} className="text-sm text-[#8E8AA0]">・ {note}</li>
              ))}
            </ul>
          )}
          <div className="mt-4 bg-[#FFF8F0] rounded-2xl p-4">
            <p className="text-xs text-[#8E8AA0] leading-relaxed">
              この結果は性格を断定するものではなく、現時点での傾向を示すものです。
              お子さんの理解と対話のきっかけとしてお役立てください。
            </p>
          </div>
        </Section>

        {/* アクション */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 pb-8">
          <button
            onClick={() => router.push('/')}
            className="flex-1 py-3 px-6 rounded-2xl bg-[#7C6FAF] text-white font-bold hover:bg-[#6B5E9E] transition-colors cursor-pointer"
          >
            もう一度診断する
          </button>
          <button
            onClick={() => router.push('/about')}
            className="flex-1 py-3 px-6 rounded-2xl border-2 border-[#7C6FAF] text-[#7C6FAF] font-bold hover:bg-[#7C6FAF]/5 transition-colors cursor-pointer"
          >
            診断について
          </button>
        </div>
      </div>
    </div>
  );
}

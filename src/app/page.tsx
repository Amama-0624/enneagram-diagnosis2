'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { AnswerMode } from '@/data/types';

export default function LandingPage() {
  const router = useRouter();
  const [selectedMode, setSelectedMode] = useState<AnswerMode | null>(null);

  const handleStart = () => {
    if (!selectedMode) return;
    localStorage.setItem('enneagram-mode', selectedMode);
    localStorage.removeItem('enneagram-diagnosis');
    router.push('/quiz');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-lg w-full"
      >
        {/* タイトル */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#3D3552] mb-3">
            エニアグラム構造診断
          </h1>
          <p className="text-[#8E8AA0] text-base leading-relaxed">
            54の質問に答えることで、9つの性格タイプの傾向を<br />
            「安定時」「困難時」「ストレス時」の3つの状態から分析します。
          </p>
        </div>

        {/* メインカード */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-6">
          <h2 className="text-lg font-bold text-[#3D3552] mb-4 text-center">
            回答モードを選んでください
          </h2>

          <div className="space-y-3">
            <button
              onClick={() => setSelectedMode('parent')}
              className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
                selectedMode === 'parent'
                  ? 'border-[#7C6FAF] bg-[#7C6FAF]/5'
                  : 'border-gray-200 hover:border-[#7C6FAF]/40'
              }`}
            >
              <div className="font-medium text-[#3D3552]">
                お子さんについて回答する
              </div>
              <div className="text-sm text-[#8E8AA0] mt-1">
                保護者の方がお子さんの行動を観察して回答します
              </div>
            </button>

            <button
              onClick={() => setSelectedMode('self')}
              className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
                selectedMode === 'self'
                  ? 'border-[#7C6FAF] bg-[#7C6FAF]/5'
                  : 'border-gray-200 hover:border-[#7C6FAF]/40'
              }`}
            >
              <div className="font-medium text-[#3D3552]">
                自分について回答する
              </div>
              <div className="text-sm text-[#8E8AA0] mt-1">
                ご自身の行動や傾向について回答します
              </div>
            </button>
          </div>

          <button
            onClick={handleStart}
            disabled={!selectedMode}
            className={`w-full mt-6 py-4 rounded-2xl font-bold text-white text-lg transition-all ${
              selectedMode
                ? 'bg-[#7C6FAF] hover:bg-[#6B5E9E] shadow-md hover:shadow-lg cursor-pointer'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            診断を始める
          </button>
        </div>

        {/* フッターリンク */}
        <div className="text-center">
          <button
            onClick={() => router.push('/about')}
            className="text-[#7C6FAF] text-sm hover:underline cursor-pointer"
          >
            この診断について詳しく見る
          </button>
        </div>

        {/* 所要時間 */}
        <p className="text-center text-[#8E8AA0] text-xs mt-4">
          所要時間: 約10〜15分 ・ 54問
        </p>
      </motion.div>
    </div>
  );
}

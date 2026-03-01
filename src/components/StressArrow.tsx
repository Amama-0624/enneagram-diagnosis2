'use client';

import { StressDetail, EnneagramType } from '@/data/types';
import { TYPE_NAMES, TYPE_COLORS, STRESS_LINES } from '@/data/constants';

type Props = {
  stressDetail: StressDetail;
};

export function StressArrow({ stressDetail }: Props) {
  const { coreType, stressDirection, matchScore } = stressDetail;
  const integrationDir = STRESS_LINES[coreType].integration;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* ストレスライン図 */}
      <div className="flex items-center gap-4">
        {/* 統合方向 */}
        <div className="text-center">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto"
            style={{ backgroundColor: TYPE_COLORS[integrationDir] }}
          >
            {integrationDir}
          </div>
          <p className="text-xs text-[#8E8AA0] mt-1">統合</p>
          <p className="text-xs text-[#3D3552] font-medium">{TYPE_NAMES[integrationDir]}</p>
        </div>

        <svg className="w-8 h-8 text-[#7BC67E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
        </svg>

        {/* コアタイプ */}
        <div className="text-center">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto ring-4 ring-[#7C6FAF]/20"
            style={{ backgroundColor: TYPE_COLORS[coreType] }}
          >
            {coreType}
          </div>
          <p className="text-xs text-[#7C6FAF] mt-1 font-bold">コア</p>
          <p className="text-sm text-[#3D3552] font-medium">{TYPE_NAMES[coreType]}</p>
        </div>

        <svg className="w-8 h-8 text-[#EF9A9A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>

        {/* 分裂方向 */}
        <div className="text-center">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto"
            style={{ backgroundColor: TYPE_COLORS[stressDirection] }}
          >
            {stressDirection}
          </div>
          <p className="text-xs text-[#8E8AA0] mt-1">ストレス</p>
          <p className="text-xs text-[#3D3552] font-medium">{TYPE_NAMES[stressDirection]}</p>
        </div>
      </div>

      {/* 一致率 */}
      <div className="bg-[#FFF8F0] rounded-2xl p-4 text-center w-full">
        <p className="text-sm text-[#8E8AA0]">ストレスライン一致率</p>
        <p className="text-3xl font-bold text-[#7C6FAF] mt-1">{matchScore}%</p>
      </div>
    </div>
  );
}

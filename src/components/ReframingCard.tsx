'use client';

import { EnneagramType } from '@/data/types';
import { REFRAMING_MESSAGES, TYPE_COLORS } from '@/data/constants';

type Props = {
  coreType: EnneagramType;
};

export function ReframingCard({ coreType }: Props) {
  const message = REFRAMING_MESSAGES[coreType];
  const color = TYPE_COLORS[coreType];

  return (
    <div
      className="rounded-3xl p-6 border-2"
      style={{ borderColor: color, backgroundColor: color + '10' }}
    >
      <div className="flex items-center gap-2 mb-3">
        <svg className="w-6 h-6 text-[#7C6FAF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <h3 className="text-lg font-bold text-[#3D3552]">お子さんへの視点</h3>
      </div>
      <p className="text-[#3D3552] leading-relaxed">{message}</p>
    </div>
  );
}

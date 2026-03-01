'use client';

import { DistortionInfo, EnneagramType } from '@/data/types';
import { TYPE_SHORT, TYPE_COLORS } from '@/data/constants';

type Props = {
  distortion: DistortionInfo[];
};

export function DistortionBar({ distortion }: Props) {
  const maxAbs = Math.max(...distortion.map(d => Math.abs(d.diff)), 1);

  return (
    <div className="space-y-3">
      {distortion.map(d => {
        const pct = (d.diff / maxAbs) * 50;
        const isPositive = d.diff >= 0;
        const color = TYPE_COLORS[d.type as EnneagramType];

        return (
          <div key={d.type} className="flex items-center gap-3">
            <span className="w-16 text-sm text-[#3D3552] font-medium text-right">
              {d.type}: {TYPE_SHORT[d.type as EnneagramType]}
            </span>
            <div className="flex-1 h-6 bg-gray-100 rounded-full relative overflow-hidden">
              {/* 中央線 */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300" />
              {/* バー */}
              <div
                className="absolute top-1 bottom-1 rounded-full transition-all duration-500"
                style={{
                  backgroundColor: color,
                  left: isPositive ? '50%' : `${50 + pct}%`,
                  width: `${Math.abs(pct)}%`,
                }}
              />
            </div>
            <span className={`w-10 text-sm font-medium text-right ${
              d.diff > 0 ? 'text-[#EF9A9A]' : d.diff < 0 ? 'text-[#81D4FA]' : 'text-[#8E8AA0]'
            }`}>
              {d.diff > 0 ? '+' : ''}{d.diff}
            </span>
          </div>
        );
      })}
    </div>
  );
}

'use client';

import { EnneagramType } from '@/data/types';
import { TYPE_NAMES, TYPE_COLORS } from '@/data/constants';

type Props = {
  type: EnneagramType;
  wingLabel: string;
  size?: 'lg' | 'sm';
};

export function TypeBadge({ type, wingLabel, size = 'lg' }: Props) {
  const color = TYPE_COLORS[type];

  if (size === 'sm') {
    return (
      <span
        className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium text-white"
        style={{ backgroundColor: color }}
      >
        {wingLabel}
      </span>
    );
  }

  return (
    <div className="text-center">
      <div
        className="w-24 h-24 mx-auto rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg mb-3"
        style={{ backgroundColor: color }}
      >
        {type}
      </div>
      <h2 className="text-2xl font-bold text-[#3D3552] mb-1">{wingLabel}</h2>
      <p className="text-lg text-[#8E8AA0]">{TYPE_NAMES[type]}</p>
    </div>
  );
}

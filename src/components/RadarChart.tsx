'use client';

import {
  Radar, RadarChart as RechartsRadarChart,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Legend,
} from 'recharts';
import { TYPE_SHORT } from '@/data/constants';
import { EnneagramType } from '@/data/types';

type Props = {
  scores: {
    label: string;
    color: string;
    data: Record<number, number>;
  }[];
};

const ALL_TYPES: EnneagramType[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export function RadarChartComponent({ scores }: Props) {
  const chartData = ALL_TYPES.map(t => {
    const entry: Record<string, string | number> = {
      type: `${t}: ${TYPE_SHORT[t]}`,
    };
    for (const s of scores) {
      entry[s.label] = s.data[t] ?? 0;
    }
    return entry;
  });

  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart data={chartData} cx="50%" cy="50%" outerRadius="70%">
          <PolarGrid stroke="#E8E4F0" />
          <PolarAngleAxis
            dataKey="type"
            tick={{ fill: '#3D3552', fontSize: 12 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: '#8E8AA0', fontSize: 10 }}
          />
          {scores.map(s => (
            <Radar
              key={s.label}
              name={s.label}
              dataKey={s.label}
              stroke={s.color}
              fill={s.color}
              fillOpacity={0.15}
              strokeWidth={2}
            />
          ))}
          <Legend
            wrapperStyle={{ fontSize: 12, color: '#3D3552' }}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
}

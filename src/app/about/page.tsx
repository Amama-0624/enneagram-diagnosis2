'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex justify-center p-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <h1 className="text-3xl font-bold text-[#3D3552] mb-8 text-center">
          この診断について
        </h1>

        <div className="bg-white rounded-3xl shadow-lg p-8 space-y-8">
          <section>
            <h2 className="text-xl font-bold text-[#7C6FAF] mb-3">診断の目的</h2>
            <p className="text-[#3D3552] leading-relaxed">
              この診断は、エニアグラムの理論に基づいて、お子さん（またはご自身）の性格傾向を
              3つの状態（安定時・困難時・強ストレス時）から多角的に分析するものです。
              不登校支援の現場で、お子さんの個性や行動パターンへの理解を深めるために活用できます。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#7C6FAF] mb-3">エニアグラムとは</h2>
            <p className="text-[#3D3552] leading-relaxed">
              エニアグラムは、人間の性格を9つの基本タイプに分類する性格類型論です。
              各タイプには固有の動機、恐れ、欲求があり、ストレス下では特定のパターンで変化します。
              この診断では、安定時の「コアタイプ」に加え、困難時の「適応パターン」や
              ストレス時の「変容パターン」も含めて総合的に分析します。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#7C6FAF] mb-3">9つのタイプ</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { n: 1, name: '改革する人', color: '#E8B4B8' },
                { n: 2, name: '助ける人', color: '#F2A7B3' },
                { n: 3, name: '達成する人', color: '#F7C873' },
                { n: 4, name: '個性的な人', color: '#B39DDB' },
                { n: 5, name: '調べる人', color: '#81D4FA' },
                { n: 6, name: '忠実な人', color: '#A5D6A7' },
                { n: 7, name: '熱中する人', color: '#FFE082' },
                { n: 8, name: '挑戦する人', color: '#EF9A9A' },
                { n: 9, name: '平和をもたらす人', color: '#C5E1A5' },
              ].map(t => (
                <div
                  key={t.n}
                  className="flex items-center gap-2 p-2 rounded-xl"
                  style={{ backgroundColor: t.color + '30' }}
                >
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: t.color }}
                  >
                    {t.n}
                  </span>
                  <span className="text-sm text-[#3D3552] font-medium">{t.name}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#7C6FAF] mb-3">対象年齢の目安</h2>
            <p className="text-[#3D3552] leading-relaxed">
              自己回答の場合は中学生以上を想定しています。
              小学生のお子さんについては、保護者の方が「お子さんについて回答する」モードで
              日頃の行動を思い浮かべながら回答してください。
            </p>
          </section>

          <section className="bg-[#FFF8F0] rounded-2xl p-6">
            <h2 className="text-xl font-bold text-[#F2A7B3] mb-3">ご注意ください</h2>
            <ul className="text-[#3D3552] space-y-2 text-sm leading-relaxed">
              <li>・ この診断は性格を断定するものではなく、傾向を把握するためのツールです</li>
              <li>・ 結果は「今のその人」を映すものであり、成長や環境によって変化します</li>
              <li>・ 医学的な診断の代わりになるものではありません</li>
              <li>・ お子さんへのラベル貼りではなく、理解と対話のきっかけとしてお使いください</li>
            </ul>
          </section>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => router.push('/')}
            className="bg-[#7C6FAF] text-white px-8 py-3 rounded-2xl font-bold hover:bg-[#6B5E9E] transition-colors cursor-pointer"
          >
            トップに戻る
          </button>
        </div>
      </motion.div>
    </div>
  );
}

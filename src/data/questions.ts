import { Question } from './types';

/**
 * 54問の質問データ
 * - 状態 A/B/C × 9タイプ × 各2問 = 54問
 * - id: "{state}{type}-{番号}" (例: "A1-1")
 */
export const questions: Question[] = [
  // ========== 状態A: 安定時 (18問) ==========
  // タイプ1
  { id: 'A1-1', type: 1, state: 'A', isReverse: false,
    text: { parent: 'その子は、物事を正しくやりたいという気持ちが強い', self: '物事を正しくやりたいという気持ちが強い' } },
  { id: 'A1-2', type: 1, state: 'A', isReverse: false,
    text: { parent: 'その子は、ルールやきまりを守ることを大切にする', self: 'ルールやきまりを守ることを大切にする' } },
  // タイプ2
  { id: 'A2-1', type: 2, state: 'A', isReverse: false,
    text: { parent: 'その子は、困っている人がいると助けたくなる', self: '困っている人がいると助けたくなる' } },
  { id: 'A2-2', type: 2, state: 'A', isReverse: false,
    text: { parent: 'その子は、人に喜んでもらえると嬉しくなる', self: '人に喜んでもらえると嬉しくなる' } },
  // タイプ3
  { id: 'A3-1', type: 3, state: 'A', isReverse: false,
    text: { parent: 'その子は、目標を決めてそこに向かって頑張れる', self: '目標を決めてそこに向かって頑張れる' } },
  { id: 'A3-2', type: 3, state: 'A', isReverse: false,
    text: { parent: 'その子は、うまくできると自信がつく', self: 'うまくできると自信がつく' } },
  // タイプ4
  { id: 'A4-1', type: 4, state: 'A', isReverse: false,
    text: { parent: 'その子は、自分だけの世界観や感性を大切にしている', self: '自分だけの世界観や感性を大切にしている' } },
  { id: 'A4-2', type: 4, state: 'A', isReverse: false,
    text: { parent: 'その子は、他の人とは違う特別な存在でいたいと思っている', self: '他の人とは違う特別な存在でいたいと思う' } },
  // タイプ5
  { id: 'A5-1', type: 5, state: 'A', isReverse: false,
    text: { parent: 'その子は、興味のあることを深く調べるのが好き', self: '興味のあることを深く調べるのが好き' } },
  { id: 'A5-2', type: 5, state: 'A', isReverse: false,
    text: { parent: 'その子は、一人で静かに考える時間が必要', self: '一人で静かに考える時間が必要' } },
  // タイプ6
  { id: 'A6-1', type: 6, state: 'A', isReverse: false,
    text: { parent: 'その子は、信頼できる人やグループを大切にする', self: '信頼できる人やグループを大切にする' } },
  { id: 'A6-2', type: 6, state: 'A', isReverse: false,
    text: { parent: 'その子は、何かを決める前に慎重に確認する', self: '何かを決める前に慎重に確認する' } },
  // タイプ7
  { id: 'A7-1', type: 7, state: 'A', isReverse: false,
    text: { parent: 'その子は、新しいことやワクワクすることが大好き', self: '新しいことやワクワクすることが大好き' } },
  { id: 'A7-2', type: 7, state: 'A', isReverse: false,
    text: { parent: 'その子は、楽しい計画を考えるのが得意', self: '楽しい計画を考えるのが得意' } },
  // タイプ8
  { id: 'A8-1', type: 8, state: 'A', isReverse: false,
    text: { parent: 'その子は、自分の意見をはっきり言える', self: '自分の意見をはっきり言える' } },
  { id: 'A8-2', type: 8, state: 'A', isReverse: false,
    text: { parent: 'その子は、不公平なことに対して怒りを感じる', self: '不公平なことに対して怒りを感じる' } },
  // タイプ9
  { id: 'A9-1', type: 9, state: 'A', isReverse: false,
    text: { parent: 'その子は、争いごとを避けて穏やかに過ごしたい', self: '争いごとを避けて穏やかに過ごしたい' } },
  { id: 'A9-2', type: 9, state: 'A', isReverse: false,
    text: { parent: 'その子は、みんなが仲良くしてくれると安心する', self: 'みんなが仲良くしてくれると安心する' } },

  // ========== 状態B: 困難時・適応 (18問) ==========
  // タイプ1
  { id: 'B1-1', type: 1, state: 'B', isReverse: false,
    text: { parent: 'うまくいかないとき、その子は自分のやり方が正しいと主張する', self: 'うまくいかないとき、自分のやり方が正しいと主張する' } },
  { id: 'B1-2', type: 1, state: 'B', isReverse: false,
    text: { parent: '困ったとき、その子は他の人のミスが気になる', self: '困ったとき、他の人のミスが気になる' } },
  // タイプ2
  { id: 'B2-1', type: 2, state: 'B', isReverse: false,
    text: { parent: 'うまくいかないとき、その子はもっと人の世話をしようとする', self: 'うまくいかないとき、もっと人の世話をしようとする' } },
  { id: 'B2-2', type: 2, state: 'B', isReverse: false,
    text: { parent: '困ったとき、その子は自分の気持ちより相手の気持ちを優先する', self: '困ったとき、自分の気持ちより相手の気持ちを優先する' } },
  // タイプ3
  { id: 'B3-1', type: 3, state: 'B', isReverse: false,
    text: { parent: 'うまくいかないとき、その子はもっと頑張って結果を出そうとする', self: 'うまくいかないとき、もっと頑張って結果を出そうとする' } },
  { id: 'B3-2', type: 3, state: 'B', isReverse: false,
    text: { parent: '困ったとき、その子は人からどう見られるかを気にする', self: '困ったとき、人からどう見られるかを気にする' } },
  // タイプ4
  { id: 'B4-1', type: 4, state: 'B', isReverse: false,
    text: { parent: 'うまくいかないとき、その子は「自分は分かってもらえない」と感じる', self: 'うまくいかないとき、「自分は分かってもらえない」と感じる' } },
  { id: 'B4-2', type: 4, state: 'B', isReverse: false,
    text: { parent: '困ったとき、その子は感情的になって引きこもることがある', self: '困ったとき、感情的になって引きこもることがある' } },
  // タイプ5
  { id: 'B5-1', type: 5, state: 'B', isReverse: false,
    text: { parent: 'うまくいかないとき、その子はさらに一人で考え込む', self: 'うまくいかないとき、さらに一人で考え込む' } },
  { id: 'B5-2', type: 5, state: 'B', isReverse: false,
    text: { parent: '困ったとき、その子は人と距離を置いて情報を集めようとする', self: '困ったとき、人と距離を置いて情報を集めようとする' } },
  // タイプ6
  { id: 'B6-1', type: 6, state: 'B', isReverse: false,
    text: { parent: 'うまくいかないとき、その子は最悪の事態を想像して不安になる', self: 'うまくいかないとき、最悪の事態を想像して不安になる' } },
  { id: 'B6-2', type: 6, state: 'B', isReverse: false,
    text: { parent: '困ったとき、その子は頼れる人の意見を求める', self: '困ったとき、頼れる人の意見を求める' } },
  // タイプ7
  { id: 'B7-1', type: 7, state: 'B', isReverse: false,
    text: { parent: 'うまくいかないとき、その子は別の楽しいことを探そうとする', self: 'うまくいかないとき、別の楽しいことを探そうとする' } },
  { id: 'B7-2', type: 7, state: 'B', isReverse: false,
    text: { parent: '困ったとき、その子は「大丈夫、なんとかなる」と言う', self: '困ったとき、「大丈夫、なんとかなる」と考える' } },
  // タイプ8
  { id: 'B8-1', type: 8, state: 'B', isReverse: false,
    text: { parent: 'うまくいかないとき、その子はもっと強く自己主張する', self: 'うまくいかないとき、もっと強く自己主張する' } },
  { id: 'B8-2', type: 8, state: 'B', isReverse: false,
    text: { parent: '困ったとき、その子は自分で状況をコントロールしようとする', self: '困ったとき、自分で状況をコントロールしようとする' } },
  // タイプ9
  { id: 'B9-1', type: 9, state: 'B', isReverse: false,
    text: { parent: 'うまくいかないとき、その子は問題を先延ばしにする', self: 'うまくいかないとき、問題を先延ばしにする' } },
  { id: 'B9-2', type: 9, state: 'B', isReverse: false,
    text: { parent: '困ったとき、その子は何も感じていないふりをする', self: '困ったとき、何も感じていないふりをする' } },

  // ========== 状態C: 強ストレス時 (18問) ==========
  // タイプ1
  { id: 'C1-1', type: 1, state: 'C', isReverse: false,
    text: { parent: '強いストレスを感じると、その子は急に感情的になったり泣いたりする', self: '強いストレスを感じると、急に感情的になったり泣いたりする' } },
  { id: 'C1-2', type: 1, state: 'C', isReverse: false,
    text: { parent: '追い詰められると、その子は「自分はダメだ」と落ち込む', self: '追い詰められると、「自分はダメだ」と落ち込む' } },
  // タイプ2
  { id: 'C2-1', type: 2, state: 'C', isReverse: false,
    text: { parent: '強いストレスを感じると、その子は攻撃的になって怒りをぶつける', self: '強いストレスを感じると、攻撃的になって怒りをぶつける' } },
  { id: 'C2-2', type: 2, state: 'C', isReverse: false,
    text: { parent: '追い詰められると、その子は「自分がこんなにしてあげてるのに」と怒る', self: '追い詰められると、「自分がこんなにしてあげてるのに」と思う' } },
  // タイプ3
  { id: 'C3-1', type: 3, state: 'C', isReverse: false,
    text: { parent: '強いストレスを感じると、その子はやる気を失ってぼーっとする', self: '強いストレスを感じると、やる気を失ってぼーっとする' } },
  { id: 'C3-2', type: 3, state: 'C', isReverse: false,
    text: { parent: '追い詰められると、その子はすべてを投げ出して現実逃避する', self: '追い詰められると、すべてを投げ出して現実逃避する' } },
  // タイプ4
  { id: 'C4-1', type: 4, state: 'C', isReverse: false,
    text: { parent: '強いストレスを感じると、その子は過度に人に尽くそうとする', self: '強いストレスを感じると、過度に人に尽くそうとする' } },
  { id: 'C4-2', type: 4, state: 'C', isReverse: false,
    text: { parent: '追い詰められると、その子は相手の期待に必死に応えようとする', self: '追い詰められると、相手の期待に必死に応えようとする' } },
  // タイプ5
  { id: 'C5-1', type: 5, state: 'C', isReverse: false,
    text: { parent: '強いストレスを感じると、その子は衝動的に行動したり落ち着きがなくなる', self: '強いストレスを感じると、衝動的に行動したり落ち着きがなくなる' } },
  { id: 'C5-2', type: 5, state: 'C', isReverse: false,
    text: { parent: '追い詰められると、その子はいろいろなことに手を出して気を紛らわす', self: '追い詰められると、いろいろなことに手を出して気を紛らわす' } },
  // タイプ6
  { id: 'C6-1', type: 6, state: 'C', isReverse: false,
    text: { parent: '強いストレスを感じると、その子は成果や評価を過度に気にする', self: '強いストレスを感じると、成果や評価を過度に気にする' } },
  { id: 'C6-2', type: 6, state: 'C', isReverse: false,
    text: { parent: '追い詰められると、その子は自分を大きく見せようとする', self: '追い詰められると、自分を大きく見せようとする' } },
  // タイプ7
  { id: 'C7-1', type: 7, state: 'C', isReverse: false,
    text: { parent: '強いストレスを感じると、その子は急に批判的になり細かいことに怒る', self: '強いストレスを感じると、急に批判的になり細かいことに怒る' } },
  { id: 'C7-2', type: 7, state: 'C', isReverse: false,
    text: { parent: '追い詰められると、その子は完璧を求めてイライラする', self: '追い詰められると、完璧を求めてイライラする' } },
  // タイプ8
  { id: 'C8-1', type: 8, state: 'C', isReverse: false,
    text: { parent: '強いストレスを感じると、その子は殻に閉じこもって誰にも会いたがらない', self: '強いストレスを感じると、殻に閉じこもって誰にも会いたがらない' } },
  { id: 'C8-2', type: 8, state: 'C', isReverse: false,
    text: { parent: '追い詰められると、その子は秘密主義になって何も話さなくなる', self: '追い詰められると、秘密主義になって何も話さなくなる' } },
  // タイプ9
  { id: 'C9-1', type: 9, state: 'C', isReverse: false,
    text: { parent: '強いストレスを感じると、その子は不安でいっぱいになり心配ばかりする', self: '強いストレスを感じると、不安でいっぱいになり心配ばかりする' } },
  { id: 'C9-2', type: 9, state: 'C', isReverse: false,
    text: { parent: '追い詰められると、その子は「何か悪いことが起きるかも」と怯える', self: '追い詰められると、「何か悪いことが起きるかも」と怯える' } },
];

import type { Metadata } from 'next';
import GuideShell from '../guide-shell';

export const metadata:Metadata = { title:'帳篷租借方案', description:'可飛鹿營區威力屋四人帳、睡眠組、組合價格與續住規則。', alternates:{ canonical:'/guide/rental' } };
export default function RentalGuidePage() {
  return <GuideShell eyebrow="RENTAL PLAN" title="帳篷租借方案" intro="少帶一點裝備，也能享受真正的草地露營。" active="/guide/rental">
    <section><small>01 · PLAN A</small><h2>A 方案｜威力屋四人帳</h2><ul><li>威力屋 TT270 四人帳，約 270 × 270 公分。</li><li>附帳內燈與電源延長線。</li><li>費用 NT$1,200，已包含帳篷搭設。</li><li>營位費另計 NT$1,200。</li></ul></section>
    <section><small>02 · PLAN B</small><h2>B 方案｜雙人睡眠組</h2><ul><li>雙人充氣床墊 1 張，約 191 × 137 × 25 公分。</li><li>家庭用枕頭 2 個。</li><li>床包及枕頭套。</li><li>費用 NT$400。</li></ul></section>
    <section><small>03 · PACKAGE</small><h2>租借組合與參考總價</h2><div className="rental-table"><div><b>租借組合</b><b>租借費</b><b>含營位總價</b></div><div><span>A</span><span>NT$1,200</span><strong>NT$2,400</strong></div><div><span>A＋B</span><span>NT$1,600</span><strong>NT$2,800</strong></div><div><span>A＋B＋B</span><span>NT$2,000</span><strong>NT$3,200</strong></div></div></section>
    <section><small>04 · EXTEND & CHANGE</small><h2>續住與異動</h2><ul><li>連續住宿第 2 晚，整筆租帳方案減 NT$300。</li><li>僅租 B 睡眠組不適用續住折扣；第 3 晚起恢復原價。</li><li>搭帳作業會於入住日前 1 日開始。</li><li>取消或延期租帳，須於入住日前 2 日通知。</li><li>帳篷若已完成搭設，需支付 NT$300 搭拆帳工資。</li></ul></section>
  </GuideShell>;
}

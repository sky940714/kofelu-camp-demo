import type { Metadata } from 'next';
import GuideShell from '../guide-shell';

export const metadata:Metadata = { title:'露營屋房型介紹', description:'可飛鹿營區2人、4人、6人露營屋數量、設備及加人規則。', alternates:{ canonical:'/guide/rooms' } };
const rooms = [
  ['2 人房','營一區 3 間・營二區 3 間','標準雙人床 1 張'],
  ['4 人房','營一區 2 間・營二區 2 間','標準雙人床 2 張'],
  ['6 人房','營一區 1 間・營二區 1 間','標準雙人床 3 張'],
];
export default function RoomsGuidePage() {
  return <GuideShell eyebrow="CABIN TYPES" title="露營屋房型介紹" intro="2、4、6 人房依同行人數選擇，輕裝也能住進山裡。" active="/guide/rooms">
    <section><small>01 · ROOM TYPES</small><h2>房型一覽</h2><div className="room-price-grid">{rooms.map(([name,count,bed]) => <div key={name}><small>{count}</small><h3>{name}</h3><p>{bed}</p></div>)}</div><p className="guide-note">房價與實際空位請透過官方 LINE 向營主確認。</p></section>
    <section><small>02 · EXTRA GUEST</small><h2>加人與加床</h2><p>超過房型標準入住人數時，每位成人加收 <strong>NT$800</strong>，費用已包含：</p><ul><li>雙人充氣床墊 1 張，約 190 × 137 × 25 公分</li><li>棉被 1 件</li><li>枕頭 2 個</li><li>盥洗用品</li></ul><p>年滿 6 歲或身高 150 公分以上者以成人計費；實際可加人數與床位安排須由營主確認。</p></section>
    <section><small>03 · AMENITIES</small><h2>房內設備與備品</h2><div className="guide-columns"><div><h3>房內設備</h3><ul><li>電視、冷氣、冰箱</li><li>電熱水瓶、吹風機</li><li>乾濕分離衛浴</li><li>礦泉水、室內拖鞋</li></ul></div><div><h3>提供備品</h3><ul><li>大浴巾、毛巾</li><li>沐浴乳、洗髮精</li><li>牙刷與牙膏請自行準備</li><li>露營屋不提供早餐</li></ul></div></div></section>
    <section><small>04 · ROOM RULES</small><h2>露營屋使用規定</h2><ul><li>寵物不得進入露營屋室內。</li><li>室內禁止烹煮及吸菸。</li><li>露台烹煮請使用瓦斯爐，禁止明火及高耗電器具。</li><li>夜間續住時段為 18:00～22:30，且須與隔日住宿連續預約。</li></ul></section>
  </GuideShell>;
}

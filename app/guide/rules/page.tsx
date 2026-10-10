import type { Metadata } from 'next';
import GuideShell from '../guide-shell';

export const metadata:Metadata = { title:'入住時間與營區公約', description:'可飛鹿營區入住退房時間、寧靜時段、寵物、用電、生火與停車規定。', alternates:{ canonical:'/guide/rules' } };
const rules = [
  ['寧靜時段','22:00 至隔日 07:00 請降低音量，禁止大聲喧嘩、卡拉 OK、麻將及賭博遊戲；公共區域與交誼廳於 22:30 熄燈清場。'],
  ['寵物管理','寵物請全程繫繩或妥善安置並清理排泄物；離開帳區時須有人陪同。露營屋室內禁止寵物進入。'],
  ['用電與用水','禁止電磁爐、電暖爐、電鍋、電毯、烤箱、自備冰箱等高耗電設備；山區水源有限，請節約用水。'],
  ['戶外安全','兒童不得單獨使用戲水池或公共設施；個人物品請自行保管，並自備防蚊用品及常用藥品。'],
  ['煙火與生火','禁止爆竹、煙火、仙女棒、點火把等危險物品。禁止地面生火；烤肉架、焚火台或瓦斯爐須離草皮至少 45 公分。'],
  ['垃圾與公物','垃圾請分為一般垃圾、資源回收與廚餘；離營前恢復營位原貌。禁止將繩索綁在樹木或植栽，搬運車與護草墊使用後請歸位。'],
  ['停車規定','營區人車分離，車輛不得駛入營位。免費停車不負保管責任，卸載後請移至指定停車位置。'],
];
export default function RulesGuidePage() {
  return <GuideShell eyebrow="CAMP GUIDELINES" title="入住時間與營區公約" intro="一起維護安靜、安全且舒服的山林住宿環境。" active="/guide/rules">
    <section><small>01 · CHECK IN</small><h2>入住與退房時間</h2><div className="time-cards"><div><small>一般日期</small><strong>14:00 後入住</strong><span>隔日 12:00 前退房</span></div><div><small>連續假日</small><strong>14:00 後入住</strong><span>隔日 11:00 前退房；假期最後一天 12:00 前</span></div><div><small>夜間續住</small><strong>18:00～22:30</strong><span>須與隔日住宿連續預約</span></div></div></section>
    <section><small>02 · OPEN DAYS</small><h2>一般預約開放規則</h2><ul><li>星期五、六、日接受一般散客預約。</li><li>星期一至星期四須達 10 帳以上才受理，自搭帳與租帳皆適用。</li><li>國定假日、連續假日、特殊休園日及實際空位，以營主在官方 LINE 的確認結果為準。</li></ul></section>
    <section><small>03 · HOUSE RULES</small><h2>生活公約</h2><div className="rule-list">{rules.map(([title,copy],index) => <div key={title}><b>{String(index + 1).padStart(2,'0')}</b><span><h3>{title}</h3><p>{copy}</p></span></div>)}</div></section>
  </GuideShell>;
}

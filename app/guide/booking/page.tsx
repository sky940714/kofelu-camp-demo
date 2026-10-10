import type { Metadata } from 'next';
import GuideShell from '../guide-shell';

export const metadata:Metadata = { title:'預約、訂金與退費說明', description:'可飛鹿營區預約流程、50%訂金、取消退費及天候延期規則。', alternates:{ canonical:'/guide/booking' } };

export default function BookingGuidePage() {
  return <GuideShell eyebrow="BOOKING POLICY" title="預約、訂金與退費" intro="先了解成立條件、付款期限與取消規則，再放心安排山林假期。" active="/guide/booking">
    <section><small>01 · BOOKING</small><h2>預約流程</h2><ol><li>透過官網整理日期、住宿方式、數量與聯絡資料。</li><li>前往可飛鹿官方 LINE，確認訊息內容後親自送出。</li><li>營主於 LINE 確認空位、實際價格與付款方式。</li><li>確認後支付訂單總額 50% 訂金，並提供匯款人姓名、帳號末 4 碼與金額。</li><li>營主確認款項後，訂位才正式成立。</li></ol><p className="guide-note">匯款帳號不公開顯示於官網，會在 LINE 確認訂位後提供。</p></section>
    <section><small>02 · PAYMENT</small><h2>付款期限</h2><ul><li>一般訂單：營主確認後 3 日內完成匯款，以隔日為第 1 日，最晚於第 3 日中午 12:00 前完成。</li><li>入住日前 3 日內成立的訂單：確認後 24 小時內完成匯款。</li><li>逾期未匯款視同放棄訂位，營區不再保留空位。</li><li>匯款後請主動透過 LINE 通知營主核對。</li></ul></section>
    <section><small>03 · CANCELLATION</small><h2>個人因素取消</h2><div className="refund-grid"><span><b>14 日以上</b><em>退 100%</em></span><span><b>10–13 日</b><em>退 70%</em></span><span><b>7–9 日</b><em>退 50%</em></span><span><b>4–6 日</b><em>退 40%</em></span><span><b>2–3 日</b><em>退 30%</em></span><span><b>前 1 日</b><em>退 20%</em></span><span><b>入住當日</b><em>不退費</em></span></div><p>依實際收到的訂金金額計算。單筆訂單不可拆分、部分取消或部分延期。</p></section>
    <section><small>04 · WEATHER</small><h2>天候因素與延期</h2><ul><li>一般雨天、梅雨季、陣雨、強風或低溫，不列入免費退費或延期範圍。</li><li>颱風或豪雨以中央氣象署針對營區所在地發布的警報或特報為準。</li><li>入住日前 2～3 日或前 1 日符合警報標準：可申請延期。</li><li>入住當日符合警報標準：可申請延期或全額退還已付訂金。</li><li>延期須整筆訂單辦理，並與營主另行確認可更換日期。</li></ul></section>
  </GuideShell>;
}

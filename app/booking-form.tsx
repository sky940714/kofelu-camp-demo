'use client';

import { FormEvent, useEffect, useState } from 'react';

export default function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const lineUrl = process.env.NEXT_PUBLIC_LINE_OFFICIAL_URL;

  useEffect(() => {
    if (!submitted) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [submitted]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSubmitted(true); }
  return (
    <>
    <form className="booking-form" onSubmit={handleSubmit}>
      <span className="preview-badge">預約系統預覽</span>
      <div className="field-row"><label>入住日期<input name="checkin" type="date" required /></label><label>住宿晚數<select name="nights" defaultValue="1"><option value="1">1 晚</option><option value="2">2 晚</option><option value="3">3 晚</option></select></label></div>
      <label>住宿選擇<select name="stay" defaultValue=""><option value="" disabled>請選擇營位或房型</option><option>自搭帳草皮營位</option><option>露營車營位</option><option>2 人露營屋</option><option>4 人露營屋</option><option>6 人露營屋</option><option>團露／包區需求</option></select></label>
      <div className="field-row"><label>入住人數<select name="guests" defaultValue="2">{[1,2,3,4,5,6].map((count) => <option key={count}>{count} 人</option>)}</select></label><label>帳數／房數<select name="units" defaultValue="1">{[1,2,3,4,5,6].map((count) => <option key={count}>{count}</option>)}</select></label></div>
      <div className="field-row"><label>聯絡人<input name="name" autoComplete="name" placeholder="王小明" required /></label><label>手機號碼<input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="0912 345 678" required /></label></div>
      <label>備註需求<textarea name="note" rows={3} placeholder="例如：需要夜衝、攜帶寵物或希望安排團露區域" /></label>
      <label className="consent"><input type="checkbox" required /><span>我已閱讀入住與取消規則，並同意營區使用以上資料聯繫本次預約。</span></label>
      <button className="submit-booking" type="submit">整理預約需求 <span>→</span></button>
      <p className="form-note">展示階段不會傳送或儲存任何個人資料。</p>
    </form>
    {submitted && <div className="booking-modal-backdrop" role="presentation">
      <section className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-modal-title" aria-describedby="booking-modal-description">
        <span className="booking-modal-check" aria-hidden="true">✓</span>
        <small>預約流程展示</small>
        <h3 id="booking-modal-title">預約申請已送出</h3>
        <p id="booking-modal-description">接下來將前往可飛鹿官方 LINE，請將預約資訊傳送給營主，以確認實際剩餘位置。</p>
        <div className="booking-modal-notice"><strong>請注意</strong><span>完成營主確認並支付訂金後，訂位才正式成立。</span></div>
        {lineUrl
          ? <a className="booking-line-action" href={lineUrl}>前往官方 LINE 確認位置 <span>→</span></a>
          : <button className="booking-line-action" type="button" onClick={() => setSubmitted(false)}>展示：前往官方 LINE <span>→</span></button>}
        <p className="booking-modal-demo">目前為展示版本，尚未連結正式 LINE。</p>
      </section>
    </div>}
    </>
  );
}

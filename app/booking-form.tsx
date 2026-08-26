'use client';

import { FormEvent, useState } from 'react';

export default function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  function handleSubmit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSubmitted(true); }
  if (submitted) return <div className="booking-success" role="status"><span>✓</span><h3>預約需求已整理完成</h3><p>目前是網站展示版本，尚未將資料送出。正式上線後會由營區收到需求並回覆空位。</p><button type="button" onClick={() => setSubmitted(false)}>修改預約內容</button></div>;
  return (
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
  );
}

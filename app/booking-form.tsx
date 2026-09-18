'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';

type BookingDraft = {
  checkin: string;
  nights: string;
  stay: string;
  guests: string;
  units: string;
  name: string;
  phone: string;
  note: string;
};

const lineOfficialId = process.env.NEXT_PUBLIC_LINE_OFFICIAL_ID || '@484cyfiv';

function formatDate(value: string) {
  if (!value) return '';
  const [year, month, day] = value.split('-');
  return `${year}/${month}/${day}`;
}

function buildLineUrl(booking: BookingDraft) {
  const message = [
    '【可飛鹿營區－預約申請】',
    '',
    `入住日期：${formatDate(booking.checkin)}`,
    `住宿晚數：${booking.nights} 晚`,
    `住宿選擇：${booking.stay}`,
    `入住人數：${booking.guests} 人`,
    `帳數／房數：${booking.units}`,
    `聯絡人：${booking.name}`,
    `手機：${booking.phone}`,
    `備註：${booking.note || '無'}`,
    '',
    '我了解此訊息僅為預約申請，須經營區確認空位及支付 30% 訂金後才正式成立。',
  ].join('\n');

  return `https://line.me/R/oaMessage/${encodeURIComponent(lineOfficialId)}/?${encodeURIComponent(message)}`;
}

export default function BookingForm() {
  const [booking, setBooking] = useState<BookingDraft | null>(null);
  const lineUrl = useMemo(() => booking ? buildLineUrl(booking) : '', [booking]);

  useEffect(() => {
    if (!booking) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [booking]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setBooking({
      checkin: String(data.get('checkin') || ''),
      nights: String(data.get('nights') || ''),
      stay: String(data.get('stay') || ''),
      guests: String(data.get('guests') || ''),
      units: String(data.get('units') || ''),
      name: String(data.get('name') || '').trim(),
      phone: String(data.get('phone') || '').trim(),
      note: String(data.get('note') || '').trim(),
    });
  }

  return (
    <>
      <form className="booking-form" onSubmit={handleSubmit}>
        <span className="preview-badge">預約需求申請</span>
        <div className="field-row"><label>入住日期<input name="checkin" type="date" required /></label><label>住宿晚數<select name="nights" defaultValue="1"><option value="1">1 晚</option><option value="2">2 晚</option><option value="3">3 晚</option></select></label></div>
        <label>住宿選擇<select name="stay" defaultValue="" required><option value="" disabled>請選擇營位或房型</option><option>自搭帳草皮營位</option><option>露營車營位</option><option>2 人露營屋</option><option>4 人露營屋</option><option>6 人露營屋</option><option>團露／包區需求</option></select></label>
        <div className="field-row"><label>入住人數<select name="guests" defaultValue="2">{[1,2,3,4,5,6].map((count) => <option key={count} value={count}>{count} 人</option>)}</select></label><label>帳數／房數<select name="units" defaultValue="1">{[1,2,3,4,5,6].map((count) => <option key={count} value={count}>{count}</option>)}</select></label></div>
        <div className="field-row"><label>聯絡人<input name="name" autoComplete="name" placeholder="王小明" required /></label><label>手機號碼<input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="0912 345 678" pattern="[0-9+() -]{8,20}" required /></label></div>
        <label>備註需求<textarea name="note" rows={3} placeholder="例如：需要夜衝、攜帶寵物或希望安排團露區域" /></label>
        <label className="consent"><input type="checkbox" required /><span>我已閱讀入住與取消規則，並同意營區使用以上資料聯繫本次預約。</span></label>
        <button className="submit-booking" type="submit">確認預約內容 <span>→</span></button>
        <p className="form-note">送出後將開啟官方 LINE；請在 LINE 內確認並傳送訊息。</p>
      </form>

      {booking && <div className="booking-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setBooking(null); }}>
        <section className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-modal-title" aria-describedby="booking-modal-description">
          <span className="booking-modal-check" aria-hidden="true">✓</span>
          <small>預約內容確認</small>
          <h3 id="booking-modal-title">預約資料已整理</h3>
          <p id="booking-modal-description">請確認以下資料，接著前往可飛鹿官方 LINE，並在聊天室按下傳送。</p>
          <dl className="booking-summary">
            <div><dt>入住日期</dt><dd>{formatDate(booking.checkin)}</dd></div>
            <div><dt>住宿選擇</dt><dd>{booking.stay}</dd></div>
            <div><dt>人數／數量</dt><dd>{booking.guests} 人・{booking.units} 帳／房</dd></div>
            <div><dt>聯絡人</dt><dd>{booking.name}・{booking.phone}</dd></div>
          </dl>
          <div className="booking-modal-notice"><strong>請注意</strong><span>前往 LINE 後仍須由您按下傳送；經營區確認空位並支付 30% 訂金後，訂位才正式成立。</span></div>
          <a className="booking-line-action" href={lineUrl}>前往官方 LINE 傳送 <span>→</span></a>
          <button className="booking-modal-edit" type="button" onClick={() => setBooking(null)}>返回修改資料</button>
        </section>
      </div>}
    </>
  );
}

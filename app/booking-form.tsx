'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import campMap from '../public/camp-map.jpg';

type StayMode = 'tent' | 'rental' | 'cabin' | 'rv';
type CabinType = '2人房' | '4人房' | '6人房';
type MapArea = {
  id: string;
  label: string;
  kind: 'camp' | 'gravel' | 'cabin' | 'rv';
  capacity: number;
  detail: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

const lineOfficialId = process.env.NEXT_PUBLIC_LINE_OFFICIAL_ID || '@484cyfiv';

const mapAreas: MapArea[] = [
  { id:'a', label:'A區', kind:'camp', capacity:6, detail:'草皮營位・鄰近營本部', x:56.3, y:34.0, w:34.0, h:4.0 },
  { id:'b', label:'B區', kind:'camp', capacity:7, detail:'草皮營位・鄰近營本部', x:56.3, y:38.2, w:34.0, h:4.0 },
  { id:'c', label:'C區', kind:'camp', capacity:8, detail:'草皮營位・鄰近親子設施', x:56.3, y:47.0, w:34.0, h:4.0 },
  { id:'d', label:'D區', kind:'camp', capacity:8, detail:'草皮營位・鄰近私人果園', x:56.3, y:51.1, w:34.0, h:4.0 },
  { id:'e', label:'E區', kind:'camp', capacity:8, detail:'草皮營位・樟樹林旁', x:20.4, y:46.6, w:29.3, h:4.0 },
  { id:'f', label:'F區', kind:'camp', capacity:7, detail:'草皮營位・營二區中段', x:20.4, y:50.8, w:29.3, h:4.0 },
  { id:'g', label:'G區', kind:'camp', capacity:6, detail:'草皮營位・營二區中段', x:20.4, y:54.8, w:29.3, h:4.0 },
  { id:'h', label:'H區', kind:'camp', capacity:7, detail:'草皮營位・鄰近停車場', x:20.4, y:58.7, w:29.3, h:4.0 },
  { id:'i', label:'I區', kind:'camp', capacity:3, detail:'小型草皮區・3帳', x:36.8, y:73.4, w:13.2, h:5.8 },
  { id:'j', label:'J區', kind:'camp', capacity:2, detail:'溪畔小型區・2帳', x:19.2, y:80.5, w:13.2, h:4.3 },
  { id:'k', label:'K區', kind:'camp', capacity:3, detail:'樟樹林旁・3帳', x:12.3, y:46.5, w:8.0, h:4.8 },
  { id:'l', label:'L區', kind:'camp', capacity:4, detail:'營二區側邊・4帳', x:4.8, y:42.1, w:7.5, h:9.0 },
  { id:'gravel', label:'碎石區', kind:'gravel', capacity:3, detail:'碎石營位・共3帳', x:36.7, y:64.6, w:13.4, h:6.4 },
  { id:'rv', label:'露營車營位', kind:'rv', capacity:4, detail:'露營車專區・共4個營位', x:40.8, y:40.2, w:9.0, h:6.0 },
  { id:'camp-one', label:'營一區住宿', kind:'cabin', capacity:6, detail:'101–103兩人房・104–105四人房・106六人房', x:57.0, y:25.7, w:34.5, h:8.2 },
  { id:'camp-two', label:'營二區住宿', kind:'cabin', capacity:6, detail:'201–203兩人房・204–205四人房・206六人房', x:13.8, y:64.4, w:21.0, h:17.8 },
];

const stayOptions: Array<{ id:StayMode; title:string; subtitle:string }> = [
  { id:'tent', title:'自搭帳', subtitle:'選擇喜歡的草皮或碎石區' },
  { id:'rental', title:'租帳篷', subtitle:'帳篷租借・價格另行洽詢' },
  { id:'cabin', title:'露營屋', subtitle:'2、4、6人房' },
  { id:'rv', title:'露營車', subtitle:'專屬營位共4個' },
];

const cabinLimits: Record<CabinType, number> = { '2人房':3, '4人房':2, '6人房':1 };

const publicHolidays = new Set([
  '2026-01-01','2026-02-16','2026-02-17','2026-02-18','2026-02-19','2026-02-20','2026-02-27',
  '2026-04-03','2026-04-06','2026-05-01','2026-06-19','2026-09-25','2026-09-28','2026-10-09',
  '2026-10-26','2026-12-25','2027-01-01','2027-02-05','2027-02-08','2027-02-09','2027-02-10',
  '2027-02-11','2027-03-01','2027-04-05','2027-04-06','2027-04-30','2027-06-09','2027-09-15',
  '2027-10-11','2027-10-25','2027-12-24','2027-12-31',
]);

function toDateKey(date:Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function fromDateKey(value:string) {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day, 12);
}

function isAllowedCheckin(value:string) {
  if (!value) return false;
  const day = fromDateKey(value).getDay();
  return day === 0 || day === 5 || day === 6 || publicHolidays.has(value);
}

function differenceInNights(start:string, end:string) {
  if (!start || !end) return 0;
  return Math.round((fromDateKey(end).getTime() - fromDateKey(start).getTime()) / 86400000);
}

function CalendarMonth({ month, checkin, checkout, onSelect }:{ month:Date; checkin:string; checkout:string; onSelect:(key:string, locked:boolean) => void }) {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const firstDay = new Date(year, monthIndex, 1).getDay();
  const days = new Date(year, monthIndex + 1, 0).getDate();
  const today = toDateKey(new Date());
  const cells = Array.from({ length:firstDay + days }, (_, index) => index < firstDay ? null : new Date(year, monthIndex, index - firstDay + 1, 12));
  return <div className="calendar-month">
    <h4>{year} 年 {monthIndex + 1} 月</h4>
    <div className="calendar-weekdays">{['日','一','二','三','四','五','六'].map((day) => <span key={day}>{day}</span>)}</div>
    <div className="calendar-grid">{cells.map((date, index) => {
      if (!date) return <span className="calendar-empty" key={`empty-${index}`} />;
      const key = toDateKey(date);
      const past = key < today;
      const locked = !isAllowedCheckin(key);
      const inRange = !!checkin && !!checkout && key > checkin && key < checkout;
      const selected = key === checkin || key === checkout;
      return <button key={key} type="button" disabled={past} className={`${locked ? 'locked' : ''} ${inRange ? 'in-range' : ''} ${selected ? key === checkin ? 'range-start' : 'range-end' : ''}`} aria-label={`${key}${locked ? '，平日僅受理十帳以上團體' : ''}`} onClick={() => onSelect(key, locked)}><span>{date.getDate()}</span>{publicHolidays.has(key) && <small>假</small>}</button>;
    })}</div>
  </div>;
}

function formatDate(value:string) {
  if (!value) return '';
  const [year, month, day] = value.split('-');
  return `${year}/${month}/${day}`;
}

type BookingFormProps = { standaloneStep?: 1 | 2 | 3 };
const bookingStorageKey = 'kofelu-booking-progress';

export default function BookingForm({ standaloneStep }:BookingFormProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [weekdayNotice, setWeekdayNotice] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(() => { const date = new Date(); return new Date(date.getFullYear(), date.getMonth(), 1); });
  const [mode, setMode] = useState<StayMode>('tent');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [units, setUnits] = useState(1);
  const [guests, setGuests] = useState(2);
  const [cabinType, setCabinType] = useState<CabinType>('2人房');
  const [zoomed, setZoomed] = useState(false);
  const [booking, setBooking] = useState<{ name:string; phone:string; note:string } | null>(null);
  const [hydrated, setHydrated] = useState(!standaloneStep);
  const currentStep = standaloneStep ?? step;

  useEffect(() => {
    if (!standaloneStep) return;
    const frame = window.requestAnimationFrame(() => {
      try {
        const saved = JSON.parse(sessionStorage.getItem(bookingStorageKey) || '{}');
        if (typeof saved.checkin === 'string') setCheckin(saved.checkin);
        if (typeof saved.checkout === 'string') setCheckout(saved.checkout);
        if (stayOptions.some((option) => option.id === saved.mode)) setMode(saved.mode);
        if (Array.isArray(saved.selectedIds)) setSelectedIds(saved.selectedIds.filter((id:unknown) => typeof id === 'string'));
        if (typeof saved.units === 'number') setUnits(saved.units);
        if (typeof saved.guests === 'number') setGuests(saved.guests);
        if (['2人房','4人房','6人房'].includes(saved.cabinType)) setCabinType(saved.cabinType);
        if (standaloneStep === 2 && (!saved.checkin || !saved.checkout)) router.replace('/booking/date');
        if (standaloneStep === 3 && (!saved.checkin || !saved.checkout || !saved.selectedIds?.length)) router.replace('/booking/date');
      } catch {
        sessionStorage.removeItem(bookingStorageKey);
        if (standaloneStep > 1) router.replace('/booking/date');
      } finally {
        setHydrated(true);
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [router, standaloneStep]);

  useEffect(() => {
    if (!standaloneStep || !hydrated) return;
    sessionStorage.setItem(bookingStorageKey, JSON.stringify({ checkin, checkout, mode, selectedIds, units, guests, cabinType }));
  }, [standaloneStep, hydrated, checkin, checkout, mode, selectedIds, units, guests, cabinType]);

  const selectableAreas = useMemo(() => mapAreas.filter((area) => {
    if (mode === 'tent' || mode === 'rental') return area.kind === 'camp' || area.kind === 'gravel';
    if (mode === 'cabin') return area.kind === 'cabin';
    return area.kind === 'rv';
  }), [mode]);
  const selectedAreas = mapAreas.filter((area) => selectedIds.includes(area.id));
  const selectedCapacity = selectedAreas.reduce((sum, area) => sum + area.capacity, 0);
  const nights = differenceInNights(checkin, checkout);
  const areaText = selectedAreas.map((area) => area.label).join('、');
  const modeLabel = stayOptions.find((option) => option.id === mode)?.title || '';
  const maxUnits = mode === 'cabin' ? cabinLimits[cabinType] : Math.max(1, selectedCapacity);

  const lineUrl = useMemo(() => {
    if (!booking) return '';
    const message = [
      '【可飛鹿營區－預約申請】','',
      `入住日期：${formatDate(checkin)}`,
      `退房日期：${formatDate(checkout)}`,
      `住宿晚數：${nights} 晚`,
      `住宿方式：${modeLabel}${mode === 'cabin' ? `・${cabinType}` : ''}`,
      `指定區域：${areaText}`,
      `數量：${units} ${mode === 'cabin' ? '間' : mode === 'rv' ? '位' : '帳'}`,
      `入住人數：${guests} 人`,
      `聯絡人：${booking.name}`,
      `手機：${booking.phone}`,
      `備註：${booking.note || '無'}`,'',
      '我了解此訊息僅為預約申請，區內實際位置由營區安排；須經營區確認空位及支付50%訂金後才正式成立。',
    ].join('\n');
    return `https://line.me/R/oaMessage/${encodeURIComponent(lineOfficialId)}/?${encodeURIComponent(message)}`;
  }, [booking, checkin, checkout, nights, modeLabel, mode, cabinType, areaText, units, guests]);

  function changeMode(next:StayMode) {
    setMode(next);
    setSelectedIds([]);
    setUnits(1);
  }

  function toggleArea(area:MapArea) {
    if (!selectableAreas.some((item) => item.id === area.id)) return;
    if (mode === 'tent' || mode === 'rental') {
      setSelectedIds((ids) => ids.includes(area.id) ? ids.filter((id) => id !== area.id) : [...ids, area.id]);
    } else {
      setSelectedIds([area.id]);
      setUnits(1);
    }
  }

  function selectDate(key:string, locked:boolean) {
    if (locked) {
      setWeekdayNotice(true);
      return;
    }
    if (!checkin || checkout || key <= checkin) {
      if (!isAllowedCheckin(key)) {
        setWeekdayNotice(true);
        return;
      }
      setCheckin(key);
      setCheckout('');
      return;
    }
    setCheckout(key);
    setCalendarOpen(false);
  }

  function shiftMonth(amount:number) {
    setCalendarMonth((month) => new Date(month.getFullYear(), month.getMonth() + amount, 1));
  }

  function proceedToMap() {
    if (!checkin || !checkout) return;
    if (standaloneStep) router.push('/booking/map');
    else setStep(2);
  }

  function proceedToDetails() {
    if (!selectedIds.length) return;
    if (units > maxUnits) return;
    if (standaloneStep) router.push('/booking/contact');
    else setStep(3);
  }

  function handleSubmit(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setBooking({
      name:String(data.get('name') || '').trim(),
      phone:String(data.get('phone') || '').trim(),
      note:String(data.get('note') || '').trim(),
    });
  }

  if (!hydrated) return <div className="booking-wizard booking-loading" aria-live="polite">正在載入預約資料…</div>;

  function goToStep(number:number) {
    if (standaloneStep) {
      const routes = ['/booking/date','/booking/map','/booking/contact'];
      if (number <= currentStep) router.push(routes[number - 1]);
    } else if (number < step) setStep(number);
  }

  return <div className="booking-wizard">
    <div className="wizard-progress" aria-label={`預約步驟 ${currentStep}，共3步`}>
      {[1,2,3].map((number) => <button key={number} type="button" className={currentStep === number ? 'active' : currentStep > number ? 'done' : ''} onClick={() => goToStep(number)} disabled={number > currentStep}><span>{currentStep > number ? '✓' : number}</span><small>{number === 1 ? '日期方式' : number === 2 ? '地圖選區' : '聯絡確認'}</small></button>)}
    </div>

    {currentStep === 1 && <section className="wizard-panel" aria-labelledby="wizard-step-one">
      <div className="wizard-heading"><small>STEP 01</small><h3 id="wizard-step-one">先決定怎麼住</h3><p>選好日期與住宿方式，再從營區圖挑選偏好的區域。</p></div>
      <div className="date-choice"><label>入住／退房日期<button type="button" className={`date-range-field ${checkin ? 'has-value' : ''}`} onClick={() => setCalendarOpen(true)} aria-haspopup="dialog"><span className="date-calendar-icon" aria-hidden="true">▦</span><span><small>入住</small><strong>{checkin ? formatDate(checkin) : '選擇日期'}</strong></span><i>→</i><span><small>退房</small><strong>{checkout ? formatDate(checkout) : '選擇日期'}</strong></span>{nights > 0 ? <em>{nights} 晚</em> : <em className="date-open-hint">開啟日曆</em>}</button></label></div>
      <div className="stay-choice-grid">{stayOptions.map((option) => <button key={option.id} type="button" className={mode === option.id ? 'selected' : ''} onClick={() => changeMode(option.id)}><i>{option.id === 'tent' ? '△' : option.id === 'rental' ? '⌂' : option.id === 'cabin' ? '▦' : '▰'}</i><strong>{option.title}</strong><span>{option.subtitle}</span></button>)}</div>
      <button className="wizard-next" type="button" disabled={!checkin || !checkout} onClick={proceedToMap}>進入營區地圖 <span>→</span></button>
    </section>}

    {currentStep === 2 && <section className="wizard-panel map-step" aria-labelledby="wizard-step-two">
      <div className="wizard-heading map-heading"><div><small>STEP 02</small><h3 id="wizard-step-two">直接點選偏好區域</h3><p>{mode === 'tent' || mode === 'rental' ? '可複選多個區域；區內確切位置由營區安排。' : '請選擇一個偏好的區域。'}</p></div><button type="button" className="map-zoom" onClick={() => setZoomed((value) => !value)}>{zoomed ? '縮小全圖' : '放大地圖'}</button></div>
      <p className="map-mobile-hint"><span>↔</span> 地圖可上下左右滑動，也可以直接點選下方區域卡片</p>
      <div className={`map-viewport ${zoomed ? 'zoomed' : ''}`}>
        <div className="map-canvas">
          <Image src={campMap} alt="可飛鹿營區導覽圖" sizes="(max-width: 700px) 760px, 920px" priority={false} />
          {mapAreas.map((area) => {
            const enabled = selectableAreas.some((item) => item.id === area.id);
            const selected = selectedIds.includes(area.id);
            return <button key={area.id} type="button" disabled={!enabled} aria-pressed={selected} aria-label={`${area.label}，${area.detail}`} className={`map-hotspot ${enabled ? 'enabled' : ''} ${selected ? 'selected' : ''}`} style={{ left:`${area.x}%`, top:`${area.y}%`, width:`${area.w}%`, height:`${area.h}%` }} onClick={() => toggleArea(area)}><span>{selected ? '✓ ' : ''}{area.label}</span></button>;
          })}
        </div>
      </div>
      <div className="map-selection-list">{selectableAreas.map((area) => <button type="button" key={area.id} className={selectedIds.includes(area.id) ? 'selected' : ''} onClick={() => toggleArea(area)}><strong>{area.label}</strong><span>{area.detail}</span></button>)}</div>
      {!!selectedAreas.length && <div className="selection-summary"><div><small>已選區域</small><strong>{areaText}</strong><span>合計可容納約 {selectedCapacity} {mode === 'cabin' ? '間' : mode === 'rv' ? '位' : '帳'}</span></div>{mode === 'cabin' && <label>房型<select value={cabinType} onChange={(event) => { setCabinType(event.target.value as CabinType); setUnits(1); }}><option>2人房</option><option>4人房</option><option>6人房</option></select></label>}<label>需求數量<div className="unit-stepper"><button type="button" onClick={() => setUnits(Math.max(1, units - 1))}>−</button><strong>{units}</strong><button type="button" onClick={() => setUnits(units + 1)}>＋</button></div></label></div>}
      {selectedAreas.length > 0 && units > maxUnits && <p className="wizard-error">所選區域最多可安排 {maxUnits} {mode === 'cabin' ? '間' : mode === 'rv' ? '位' : '帳'}，請調整數量或增加區域。</p>}
      <div className="wizard-actions"><button type="button" className="wizard-back" onClick={() => standaloneStep ? router.push('/booking/date') : setStep(1)}>← 返回修改</button><button type="button" className="wizard-next" disabled={!selectedAreas.length || units > maxUnits} onClick={proceedToDetails}>填寫聯絡資料 <span>→</span></button></div>
    </section>}

    {currentStep === 3 && <section className="wizard-panel" aria-labelledby="wizard-step-three">
      <div className="wizard-heading"><small>STEP 03</small><h3 id="wizard-step-three">最後留下聯絡方式</h3><p>營主會在官方LINE確認實際空位、價格與50%訂金。</p></div>
      <div className="booking-review"><span>{formatDate(checkin)} → {formatDate(checkout)}・{nights}晚</span><strong>{modeLabel}{mode === 'cabin' ? ` ${cabinType}` : ''} × {units}</strong><small>{areaText}｜區內位置由營區安排</small></div>
      <form className="wizard-contact" onSubmit={handleSubmit}><div className="field-row"><label>入住人數<input type="number" min="1" max="100" value={guests} onChange={(event) => setGuests(Number(event.target.value))} required /></label><label>聯絡人<input name="name" autoComplete="name" placeholder="王小明" required /></label></div><label>手機號碼<input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="0912 345 678" pattern="[0-9+() -]{8,20}" required /></label><label>備註需求<textarea name="note" rows={3} placeholder="例如：租帳篷、攜帶寵物、希望相鄰安排" /></label><label className="consent"><input type="checkbox" required /><span>我已閱讀入住與取消規則，並同意營區使用以上資料聯繫本次預約。</span></label><div className="wizard-actions"><button type="button" className="wizard-back" onClick={() => standaloneStep ? router.push('/booking/map') : setStep(2)}>← 返回地圖</button><button className="wizard-next" type="submit">確認預約內容 <span>→</span></button></div></form>
    </section>}

    {calendarOpen && <div className="calendar-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setCalendarOpen(false); }}><section className="range-calendar" role="dialog" aria-modal="true" aria-labelledby="calendar-title"><header><div><small>SELECT YOUR STAY</small><h3 id="calendar-title">選擇入住與退房日期</h3><p>{checkin && !checkout ? '請選擇退房日期（限週五、六、日及國定例假日）' : '先選入住日期，再選退房日期'}</p></div><button type="button" aria-label="關閉日期選擇" onClick={() => setCalendarOpen(false)}>×</button></header><div className="calendar-nav"><button type="button" aria-label="上個月" onClick={() => shiftMonth(-1)}>←</button><span>{checkin ? formatDate(checkin) : '入住'} <b>→</b> {checkout ? formatDate(checkout) : '退房'}{nights > 0 && <em>{nights} 晚</em>}</span><button type="button" aria-label="下個月" onClick={() => shiftMonth(1)}>→</button></div><div className="calendar-months"><CalendarMonth month={calendarMonth} checkin={checkin} checkout={checkout} onSelect={selectDate} /><CalendarMonth month={new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1)} checkin={checkin} checkout={checkout} onSelect={selectDate} /></div><div className="calendar-legend"><span><i className="weekend-dot" />五、六、日可選入住與退房</span><span><i className="holiday-dot" />國定例假日</span><span><i className="locked-dot" />平日團體請洽 LINE</span></div></section></div>}
    {weekdayNotice && <div className="weekday-notice-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setWeekdayNotice(false); }}><section className="weekday-notice" role="alertdialog" aria-modal="true" aria-labelledby="weekday-notice-title"><span>10+</span><small>平日團體預約</small><h3 id="weekday-notice-title">平日入住與退房僅接受 10 帳以上</h3><p>週一至週四不開放一般線上預約，也無法設為退房日。如有 10 帳以上團體需求，請透過官方 LINE 洽詢營主。</p><a href={`https://line.me/R/ti/p/${encodeURIComponent(lineOfficialId)}`}>前往官方 LINE 洽詢</a><button type="button" onClick={() => setWeekdayNotice(false)}>返回選擇其他日期</button></section></div>}
    {booking && <div className="booking-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setBooking(null); }}><section className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-modal-title"><span className="booking-modal-check" aria-hidden="true">✓</span><small>預約內容確認</small><h3 id="booking-modal-title">預約資料已整理</h3><p>請前往可飛鹿官方 LINE，並在聊天室按下傳送。</p><dl className="booking-summary"><div><dt>日期</dt><dd>{formatDate(checkin)} → {formatDate(checkout)}・{nights} 晚</dd></div><div><dt>住宿方式</dt><dd>{modeLabel}{mode === 'cabin' ? `・${cabinType}` : ''}</dd></div><div><dt>指定區域</dt><dd>{areaText}</dd></div><div><dt>數量／人數</dt><dd>{units} {mode === 'cabin' ? '間' : mode === 'rv' ? '位' : '帳'}・{guests} 人</dd></div></dl><div className="booking-modal-notice"><strong>請注意</strong><span>客人可指定區域，區內實際位置由營區安排；支付 50% 訂金後才正式成立。</span></div><a className="booking-line-action" href={lineUrl} target="_blank" rel="noreferrer">前往官方 LINE 傳送 <span>→</span></a><button className="booking-modal-edit" type="button" onClick={() => setBooking(null)}>返回修改資料</button></section></div>}
  </div>;
}

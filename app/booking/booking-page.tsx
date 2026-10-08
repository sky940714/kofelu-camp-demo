import Image from 'next/image';
import Link from 'next/link';
import BookingForm from '../booking-form';

export default function BookingPage({ step }:{ step:1 | 2 | 3 }) {
  return <main className="standalone-booking-page">
    <header className="booking-page-header">
      <Link href="/" className="booking-page-brand"><Image src="/kofelu-logo.png" alt="" width={48} height={48} sizes="48px" /><span><strong>可飛鹿營區</strong><small>ONLINE RESERVATION</small></span></Link>
      <Link href="/" className="booking-page-close" aria-label="返回可飛鹿營區首頁">×</Link>
    </header>
    <div className="booking-page-intro"><small>BOOK YOUR ESCAPE</small><h1>{step === 1 ? '選擇日期與住宿方式' : step === 2 ? '選擇偏好的營區位置' : '填寫聯絡資料'}</h1><p>完成三個步驟後，系統會整理預約內容並帶你前往官方 LINE 確認。</p></div>
    <BookingForm standaloneStep={step} />
  </main>;
}

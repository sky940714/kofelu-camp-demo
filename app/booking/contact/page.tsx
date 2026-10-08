import type { Metadata } from 'next';
import BookingPage from '../booking-page';
export const metadata:Metadata = { title:'填寫預約聯絡資料' };
export default function ContactPage() { return <BookingPage step={3} />; }

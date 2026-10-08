import type { Metadata } from 'next';
import BookingPage from '../booking-page';
export const metadata:Metadata = { title:'選擇日期與住宿方式' };
export default function DatePage() { return <BookingPage step={1} />; }

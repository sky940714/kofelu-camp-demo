import type { Metadata } from 'next';
import BookingPage from '../booking-page';
export const metadata:Metadata = { title:'選擇營區位置' };
export default function MapPage() { return <BookingPage step={2} />; }

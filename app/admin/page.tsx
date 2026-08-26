import type { Metadata } from 'next';
import InventoryDashboard from './inventory-dashboard';

export const metadata: Metadata = {
  title: '營主後台',
  description: '可飛鹿營區房型與營位庫存管理。',
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <InventoryDashboard />;
}

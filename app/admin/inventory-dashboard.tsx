'use client';

import { useEffect, useMemo, useState } from 'react';

type InventoryItem = {
  id: string;
  name: string;
  type: string;
  total: number;
  remaining: number;
  icon: string;
};

const initialInventory: InventoryItem[] = [
  { id: 'room-2', name: '兩人房', type: '露營屋', total: 6, remaining: 6, icon: '2' },
  { id: 'room-4', name: '四人房', type: '露營屋', total: 4, remaining: 4, icon: '4' },
  { id: 'room-6', name: '六人房', type: '露營屋', total: 2, remaining: 2, icon: '6' },
  { id: 'rv-site', name: '露營車營位', type: '車泊營位', total: 4, remaining: 4, icon: '車' },
  { id: 'camp-site', name: '一般營位', type: '草皮營位', total: 72, remaining: 72, icon: '帳' },
];

const storageKey = 'kofelu-demo-inventory-v1';

function localDateValue(date = new Date()) {
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60_000).toISOString().slice(0, 10);
}

export default function InventoryDashboard() {
  const [date, setDate] = useState(localDateValue());
  const [inventory, setInventory] = useState(initialInventory);
  const [savedAt, setSavedAt] = useState('');

  useEffect(() => {
    const saved = window.localStorage.getItem(`${storageKey}:${date}`);
    setInventory(saved ? JSON.parse(saved) : initialInventory);
  }, [date]);

  const totals = useMemo(() => inventory.reduce((sum, item) => sum + item.total, 0), [inventory]);
  const remaining = useMemo(() => inventory.reduce((sum, item) => sum + item.remaining, 0), [inventory]);

  function update(id: string, next: number) {
    setInventory((items) => items.map((item) => item.id === id
      ? { ...item, remaining: Math.min(item.total, Math.max(0, next)) }
      : item));
    setSavedAt('尚未儲存');
  }

  function save() {
    window.localStorage.setItem(`${storageKey}:${date}`, JSON.stringify(inventory));
    setSavedAt(`已儲存 ${new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })}`);
  }

  function reset() {
    setInventory(initialInventory);
    window.localStorage.removeItem(`${storageKey}:${date}`);
    setSavedAt('已恢復總庫存');
  }

  return (
    <main className="admin-shell">
      <header className="admin-topbar">
        <a className="admin-brand" href="/">
          <img src="/kofelu-logo.png" alt="" width="46" height="46" />
          <span><strong>可飛鹿營區</strong><small>營主管理後台</small></span>
        </a>
        <a className="back-to-site" href="/">返回官網</a>
      </header>

      <section className="admin-content">
        <div className="admin-heading">
          <div><p>INVENTORY</p><h1>房間與營位庫存</h1><span>選擇日期後，調整當日官網可預約的剩餘數量。</span></div>
          <label className="date-control">管理日期<input type="date" value={date} onChange={(event) => { setSavedAt(''); setDate(event.target.value); }} /></label>
        </div>

        <div className="demo-notice"><strong>展示模式</strong><span>目前資料只保存在這台裝置；正式版會加入安全登入、雲端同步與操作紀錄。</span></div>

        <div className="inventory-summary">
          <div><span>當日總庫存</span><strong>{totals}</strong><small>間／位</small></div>
          <div><span>目前剩餘</span><strong>{remaining}</strong><small>間／位</small></div>
          <div><span>已保留或售出</span><strong>{totals - remaining}</strong><small>間／位</small></div>
        </div>

        <section className="inventory-panel" aria-labelledby="inventory-title">
          <div className="panel-heading"><div><h2 id="inventory-title">{date.replaceAll('-', ' / ')} 庫存</h2><p>按加減快速調整，或直接輸入剩餘數量。</p></div><button className="reset-button" type="button" onClick={reset}>恢復總庫存</button></div>
          <div className="inventory-list">
            {inventory.map((item) => {
              const sold = item.total - item.remaining;
              const level = item.remaining === 0 ? 'empty' : item.remaining <= Math.max(2, item.total * 0.2) ? 'low' : 'ok';
              return <article className="inventory-row" key={item.id}>
                <div className="inventory-icon" aria-hidden="true">{item.icon}</div>
                <div className="inventory-name"><strong>{item.name}</strong><span>{item.type}・總數 {item.total}</span></div>
                <div className={`stock-status ${level}`}><i />{item.remaining === 0 ? '已滿' : level === 'low' ? '即將額滿' : '尚有空位'}</div>
                <div className="sold-count"><span>已使用</span><strong>{sold}</strong></div>
                <div className="stepper" aria-label={`${item.name}剩餘數量`}>
                  <button type="button" onClick={() => update(item.id, item.remaining - 1)} disabled={item.remaining === 0} aria-label={`${item.name}減少一個`}>−</button>
                  <label><span>剩餘</span><input type="number" min="0" max={item.total} value={item.remaining} onChange={(event) => update(item.id, Number(event.target.value))} /></label>
                  <button type="button" onClick={() => update(item.id, item.remaining + 1)} disabled={item.remaining === item.total} aria-label={`${item.name}增加一個`}>＋</button>
                </div>
              </article>;
            })}
          </div>
        </section>

        <div className="admin-savebar"><span>{savedAt || '調整完成後請記得儲存'}</span><button type="button" onClick={save}>儲存這一天的庫存</button></div>
      </section>
    </main>
  );
}

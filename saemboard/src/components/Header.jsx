import { useState, useEffect } from 'react';
import { formatDate, formatTime } from '../utils/dateUtils';

export default function Header({ onMenuClick }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="app-header">
      <button className="header-menu-btn" onClick={onMenuClick} aria-label="메뉴">☰</button>
      <div className="header-datetime">
        <span className="header-date">{formatDate(now)}</span>
        <span className="header-time">{formatTime(now)}</span>
      </div>
      <div className="header-right">오늘도 화이팅! 🌟</div>
    </header>
  );
}

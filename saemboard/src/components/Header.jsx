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
      <button className="header-menu-btn" onClick={onMenuClick} aria-label="메뉴">
        ☰
      </button>
      <div className="header-datetime">
        <span className="header-date">{formatDate(now)}</span>
        <span className="header-time">{formatTime(now)}</span>
      </div>
      <div className="header-right">
        <span className="header-greeting">오늘도 화이팅! 🌟</span>
      </div>

      <style>{`
        .app-header {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 14px 24px;
          background: var(--card-bg);
          border-bottom: 1px solid var(--border);
          flex-shrink: 0;
        }

        .header-menu-btn {
          display: none;
          font-size: 20px;
          color: var(--text-muted);
          padding: 4px;
          border-radius: var(--radius-sm);
        }
        .header-menu-btn:hover { color: var(--text); }

        .header-datetime {
          display: flex;
          align-items: baseline;
          gap: 10px;
          flex: 1;
        }
        .header-date {
          font-size: 16px;
          font-weight: 600;
          color: var(--text);
        }
        .header-time {
          font-size: 24px;
          font-weight: 700;
          color: var(--accent);
          letter-spacing: -0.5px;
        }

        .header-right {
          font-size: 13px;
          color: var(--text-muted);
        }

        @media (max-width: 768px) {
          .header-menu-btn { display: block; }
          .app-header { padding: 12px 16px; }
          .header-time { font-size: 20px; }
          .header-date { font-size: 14px; }
          .header-right { display: none; }
        }
      `}</style>
    </header>
  );
}

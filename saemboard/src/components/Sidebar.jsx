import { load } from '../utils/storage';

const NAV_ITEMS = [
  { id: 'dashboard', icon: '⊞', label: '대시보드' },
  { id: 'schedule', icon: '📅', label: '일정' },
  { id: 'timetable', icon: '📋', label: '시간표' },
  { id: 'meal', icon: '🍱', label: '급식' },
  { id: 'settings', icon: '⚙️', label: '설정' },
];

export default function Sidebar({ currentPage, onNavigate, open, onClose }) {
  const settings = load('settings', {});
  const teacherName = settings.teacherName || '선생님';
  const schoolName = settings.schoolName || '우리학교';

  return (
    <aside className={`sidebar${open ? ' sidebar--open' : ''}`}>
      <div className="sidebar-logo">
        <span className="sidebar-logo-icon">📚</span>
        <span className="sidebar-logo-text">쌤보드</span>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`sidebar-nav-item${currentPage === item.id ? ' sidebar-nav-item--active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="sidebar-nav-icon">{item.icon}</span>
            <span className="sidebar-nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-profile">
        <div className="sidebar-profile-avatar">
          {teacherName.charAt(0)}
        </div>
        <div className="sidebar-profile-info">
          <div className="sidebar-profile-name">{teacherName}</div>
          <div className="sidebar-profile-school">{schoolName}</div>
        </div>
      </div>

      <style>{`
        .sidebar {
          width: var(--sidebar-width);
          min-width: var(--sidebar-width);
          background: var(--sidebar-bg);
          display: flex;
          flex-direction: column;
          padding: 20px 12px;
          border-right: 1px solid var(--border);
          transition: transform 0.25s ease;
          z-index: 100;
        }

        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 4px 8px 20px;
          border-bottom: 1px solid var(--border);
          margin-bottom: 12px;
        }
        .sidebar-logo-icon { font-size: 22px; }
        .sidebar-logo-text {
          font-size: 18px;
          font-weight: 700;
          color: var(--accent);
          letter-spacing: -0.3px;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex: 1;
        }

        .sidebar-nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: var(--radius-sm);
          color: var(--text-muted);
          font-size: 14px;
          font-weight: 500;
          transition: background 0.15s, color 0.15s;
          text-align: left;
        }
        .sidebar-nav-item:hover {
          background: var(--accent-soft);
          color: var(--text);
        }
        .sidebar-nav-item--active {
          background: var(--accent);
          color: #fff;
        }
        .sidebar-nav-item--active:hover {
          background: var(--accent-hover);
          color: #fff;
        }
        .sidebar-nav-icon { font-size: 16px; width: 20px; text-align: center; }

        .sidebar-profile {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 8px 4px;
          border-top: 1px solid var(--border);
          margin-top: 12px;
        }
        .sidebar-profile-avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: var(--accent);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 15px;
          flex-shrink: 0;
        }
        .sidebar-profile-name {
          font-size: 13px;
          font-weight: 600;
          color: var(--text);
        }
        .sidebar-profile-school {
          font-size: 11px;
          color: var(--text-muted);
        }

        @media (max-width: 768px) {
          .sidebar {
            position: fixed;
            left: 0;
            top: 0;
            bottom: 0;
            transform: translateX(-100%);
          }
          .sidebar--open {
            transform: translateX(0);
            box-shadow: var(--shadow-md);
          }
        }
      `}</style>
    </aside>
  );
}

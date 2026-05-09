import { load } from '../utils/storage';

const NAV_ITEMS = [
  { id: 'dashboard', icon: '⊞', label: '대시보드' },
  { id: 'schedule', icon: '📅', label: '일정' },
  { id: 'timetable', icon: '📋', label: '시간표' },
  { id: 'meal', icon: '🍱', label: '급식' },
  { id: 'settings', icon: '⚙️', label: '설정' },
];

export default function Sidebar({ currentPage, onNavigate, open }) {
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
        <div className="sidebar-profile-avatar">{teacherName.charAt(0)}</div>
        <div className="sidebar-profile-info">
          <div className="sidebar-profile-name">{teacherName}</div>
          <div className="sidebar-profile-school">{schoolName}</div>
        </div>
      </div>
    </aside>
  );
}

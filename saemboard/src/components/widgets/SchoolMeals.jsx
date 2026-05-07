import { todayYMD } from '../../utils/dateUtils';

const MOCK_MEALS = {
  lunch: ['잡곡밥', '미역국', '제육볶음', '깍두기', '요구르트'],
  dinner: ['쌀밥', '된장찌개', '고등어구이', '콩나물무침', '배추김치'],
};

export default function SchoolMeals() {
  const today = todayYMD();

  return (
    <div className="widget">
      <div className="widget-header">
        <span className="widget-title">🍱 급식</span>
        <span className="meal-date">{today}</span>
      </div>

      <div className="meal-section">
        <div className="meal-label">점심</div>
        <ul className="meal-list">
          {MOCK_MEALS.lunch.map((item, i) => (
            <li key={i} className="meal-item">{item}</li>
          ))}
        </ul>
      </div>

      <style>{`
        .meal-date { font-size: 11px; color: var(--text-muted); }
        .meal-section { margin-top: 4px; }
        .meal-label {
          font-size: 11px; font-weight: 700; color: var(--accent);
          background: var(--accent-soft); display: inline-block;
          padding: 2px 8px; border-radius: 20px; margin-bottom: 8px;
        }
        .meal-list {
          list-style: none;
          display: flex; flex-direction: column; gap: 4px;
        }
        .meal-item {
          font-size: 13px; color: var(--text);
          padding: 4px 8px;
          background: var(--bg); border-radius: var(--radius-sm);
        }
      `}</style>
    </div>
  );
}

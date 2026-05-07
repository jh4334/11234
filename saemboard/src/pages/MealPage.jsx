const WEEK_MEALS = [
  { day: '월요일', menu: ['잡곡밥', '미역국', '제육볶음', '깍두기', '요구르트'] },
  { day: '화요일', menu: ['쌀밥', '된장찌개', '고등어구이', '콩나물무침', '배추김치'] },
  { day: '수요일', menu: ['볶음밥', '순두부찌개', '닭갈비', '도라지나물', '깻잎김치'] },
  { day: '목요일', menu: ['잡곡밥', '육개장', '두부조림', '시금치나물', '총각김치'] },
  { day: '금요일', menu: ['쌀밥', '닭개장', '돼지불고기', '취나물', '배추김치'] },
];

const DAYS = ['월', '화', '수', '목', '금'];

export default function MealPage() {
  const today = new Date().getDay();
  const todayIdx = today >= 1 && today <= 5 ? today - 1 : 0;

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">🍱 이번 주 급식</h1>
        <span className="meal-badge">목업 데이터</span>
      </div>

      <div className="meal-week-grid">
        {WEEK_MEALS.map((meal, idx) => (
          <div key={meal.day} className={`meal-card widget${idx === todayIdx ? ' meal-card--today' : ''}`}>
            <div className="meal-card-day">
              {meal.day}
              {idx === todayIdx && <span className="meal-today-badge">오늘</span>}
            </div>
            <ul className="meal-card-list">
              {meal.menu.map((item, i) => (
                <li key={i} className="meal-card-item">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <style>{`
        .page { display: flex; flex-direction: column; gap: 20px; }
        .page-header { display: flex; align-items: center; gap: 12px; }
        .page-title { font-size: 20px; font-weight: 700; color: var(--text); }
        .meal-badge {
          font-size: 11px; color: var(--text-muted);
          background: var(--border-light); padding: 3px 10px; border-radius: 20px;
        }

        .meal-week-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 12px;
        }
        .meal-card { transition: box-shadow 0.15s; }
        .meal-card:hover { box-shadow: var(--shadow-md); }
        .meal-card--today { border: 2px solid var(--accent); }

        .meal-card-day {
          font-size: 14px; font-weight: 700; color: var(--text);
          display: flex; align-items: center; gap: 6px;
          margin-bottom: 8px;
        }
        .meal-today-badge {
          font-size: 10px; background: var(--accent); color: #fff;
          padding: 2px 6px; border-radius: 20px;
        }
        .meal-card-list { list-style: none; display: flex; flex-direction: column; gap: 4px; }
        .meal-card-item {
          font-size: 12px; color: var(--text);
          padding: 4px 6px; background: var(--bg); border-radius: 4px;
        }

        @media (max-width: 900px) {
          .meal-week-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 500px) {
          .meal-week-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

const WEEK_MEALS = [
  { day: '월요일', menu: ['잡곡밥', '미역국', '제육볶음', '깍두기', '요구르트'] },
  { day: '화요일', menu: ['쌀밥', '된장찌개', '고등어구이', '콩나물무침', '배추김치'] },
  { day: '수요일', menu: ['볶음밥', '순두부찌개', '닭갈비', '도라지나물', '깻잎김치'] },
  { day: '목요일', menu: ['잡곡밥', '육개장', '두부조림', '시금치나물', '총각김치'] },
  { day: '금요일', menu: ['쌀밥', '닭개장', '돼지불고기', '취나물', '배추김치'] },
];

export default function MealPage() {
  const today = new Date().getDay();
  const todayIdx = today >= 1 && today <= 5 ? today - 1 : 0;

  return (
    <div className="page">
      <div className="page-header" style={{ gap: '12px' }}>
        <h1 className="page-title">🍱 이번 주 급식</h1>
        <span className="meal-badge">목업 데이터</span>
      </div>
      <div className="meal-week-grid">
        {WEEK_MEALS.map((meal, idx) => (
          <div key={meal.day} className={`widget meal-card${idx === todayIdx ? ' meal-card--today' : ''}`}>
            <div className="meal-card-day">
              {meal.day}
              {idx === todayIdx && <span className="meal-today-badge">오늘</span>}
            </div>
            <ul className="meal-card-list">
              {meal.menu.map((item, i) => <li key={i} className="meal-card-item">{item}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

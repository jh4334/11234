import { todayYMD } from '../../utils/dateUtils';

const MOCK_MEALS = {
  lunch: ['잡곡밥', '미역국', '제육볶음', '깍두기', '요구르트'],
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
          {MOCK_MEALS.lunch.map((item, i) => <li key={i} className="meal-item">{item}</li>)}
        </ul>
      </div>
    </div>
  );
}

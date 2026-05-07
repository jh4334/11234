import MiniCalendar from '../components/widgets/MiniCalendar';
import WeeklyTimetable from '../components/widgets/WeeklyTimetable';
import TodoList from '../components/widgets/TodoList';
import Memo from '../components/widgets/Memo';
import TodayRecord from '../components/widgets/TodayRecord';
import SchoolMeals from '../components/widgets/SchoolMeals';

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-row dashboard-row--top">
        <div className="dashboard-col dashboard-col--wide">
          <WeeklyTimetable />
        </div>
        <div className="dashboard-col">
          <MiniCalendar />
        </div>
      </div>

      <div className="dashboard-row dashboard-row--bottom">
        <TodayRecord />
        <TodoList />
        <Memo />
        <SchoolMeals />
      </div>

      <style>{`
        .dashboard {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .dashboard-row {
          display: grid;
          gap: 20px;
        }
        .dashboard-row--top {
          grid-template-columns: 1.4fr 1fr;
        }
        .dashboard-row--bottom {
          grid-template-columns: repeat(4, 1fr);
        }

        /* 공통 위젯 스타일 */
        .widget {
          background: var(--card-bg);
          border-radius: var(--radius);
          padding: 16px;
          box-shadow: var(--shadow);
          border: 1px solid var(--border-light);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .widget-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .widget-title {
          font-size: 13px;
          font-weight: 700;
          color: var(--text);
        }

        @media (max-width: 1100px) {
          .dashboard-row--bottom {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .dashboard-row--top {
            grid-template-columns: 1fr;
          }
          .dashboard-row--bottom {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

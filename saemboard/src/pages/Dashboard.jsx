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
        <WeeklyTimetable />
        <MiniCalendar />
      </div>
      <div className="dashboard-row dashboard-row--bottom">
        <TodayRecord />
        <TodoList />
        <Memo />
        <SchoolMeals />
      </div>
    </div>
  );
}

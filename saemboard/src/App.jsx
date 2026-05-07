import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import SchedulePage from './pages/SchedulePage';
import TimetablePage from './pages/TimetablePage';
import MealPage from './pages/MealPage';
import SettingsPage from './pages/SettingsPage';
import './App.css';

const PAGES = {
  dashboard: Dashboard,
  schedule: SchedulePage,
  timetable: TimetablePage,
  meal: MealPage,
  settings: SettingsPage,
};

export default function App() {
  const [page, setPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const PageComponent = PAGES[page] || Dashboard;

  return (
    <div className="app-shell">
      <Sidebar
        currentPage={page}
        onNavigate={(p) => { setPage(p); setSidebarOpen(false); }}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
      <div className="app-main">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="app-content">
          <PageComponent />
        </main>
      </div>
    </div>
  );
}

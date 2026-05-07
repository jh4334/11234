import { useState } from 'react';
import { load, save } from '../utils/storage';

export default function SettingsPage() {
  const [settings, setSettings] = useState(() => load('settings', {
    teacherName: '',
    schoolName: '',
    subject: '',
    grade: '',
  }));
  const [saved, setSaved] = useState(false);

  function handleChange(key, val) {
    setSettings(s => ({ ...s, [key]: val }));
    setSaved(false);
  }

  function handleSave() {
    save('settings', settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">⚙️ 설정</h1>
      </div>

      <div className="widget settings-form">
        <div className="settings-section-title">기본 정보</div>

        <div className="settings-field">
          <label className="settings-label">선생님 이름</label>
          <input
            className="form-input"
            placeholder="예) 김선생"
            value={settings.teacherName}
            onChange={e => handleChange('teacherName', e.target.value)}
          />
        </div>
        <div className="settings-field">
          <label className="settings-label">학교 이름</label>
          <input
            className="form-input"
            placeholder="예) 행복초등학교"
            value={settings.schoolName}
            onChange={e => handleChange('schoolName', e.target.value)}
          />
        </div>
        <div className="settings-field">
          <label className="settings-label">담당 과목</label>
          <input
            className="form-input"
            placeholder="예) 수학"
            value={settings.subject}
            onChange={e => handleChange('subject', e.target.value)}
          />
        </div>
        <div className="settings-field">
          <label className="settings-label">담당 학년</label>
          <input
            className="form-input"
            placeholder="예) 3학년 2반"
            value={settings.grade}
            onChange={e => handleChange('grade', e.target.value)}
          />
        </div>

        <div className="settings-actions">
          <button className="btn-primary" onClick={handleSave}>
            {saved ? '✓ 저장됨' : '저장'}
          </button>
        </div>
      </div>

      <style>{`
        .page { display: flex; flex-direction: column; gap: 20px; }
        .page-header { display: flex; align-items: center; }
        .page-title { font-size: 20px; font-weight: 700; color: var(--text); }

        .settings-form { display: flex; flex-direction: column; gap: 16px; max-width: 500px; }
        .settings-section-title {
          font-size: 12px; font-weight: 700; color: var(--text-muted);
          text-transform: uppercase; letter-spacing: 0.5px;
          padding-bottom: 8px; border-bottom: 1px solid var(--border-light);
        }
        .settings-field { display: flex; flex-direction: column; gap: 6px; }
        .settings-label { font-size: 13px; font-weight: 600; color: var(--text); }
        .form-input {
          padding: 9px 12px;
          border: 1.5px solid var(--border);
          border-radius: var(--radius-sm); font-size: 13px;
          background: var(--bg); color: var(--text);
          transition: border-color 0.15s;
        }
        .form-input:focus { border-color: var(--accent); }
        .settings-actions { padding-top: 4px; }
        .btn-primary {
          padding: 9px 24px; background: var(--accent); color: #fff;
          border-radius: var(--radius-sm); font-size: 13px; font-weight: 600;
          transition: background 0.15s;
        }
        .btn-primary:hover { background: var(--accent-hover); }
      `}</style>
    </div>
  );
}

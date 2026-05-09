import { useState } from 'react';
import { load, save } from '../utils/storage';

export default function SettingsPage() {
  const [settings, setSettings] = useState(() => load('settings', { teacherName: '', schoolName: '', subject: '', grade: '' }));
  const [saved, setSaved] = useState(false);

  function handleChange(key, val) { setSettings(s => ({ ...s, [key]: val })); setSaved(false); }

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
        {[
          { key: 'teacherName', label: '선생님 이름', placeholder: '예) 김선생' },
          { key: 'schoolName', label: '학교 이름', placeholder: '예) 행복초등학교' },
          { key: 'subject', label: '담당 과목', placeholder: '예) 수학' },
          { key: 'grade', label: '담당 학년', placeholder: '예) 3학년 2반' },
        ].map(({ key, label, placeholder }) => (
          <div key={key} className="settings-field">
            <label className="settings-label">{label}</label>
            <input className="form-input" placeholder={placeholder}
              value={settings[key]} onChange={e => handleChange(key, e.target.value)} />
          </div>
        ))}
        <div className="settings-actions">
          <button className="btn-primary" onClick={handleSave}>{saved ? '✓ 저장됨' : '저장'}</button>
        </div>
      </div>
    </div>
  );
}

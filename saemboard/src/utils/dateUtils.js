const DAYS = ['일', '월', '화', '수', '목', '금', '토'];
const MONTHS = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

export function formatDate(date) {
  const d = date || new Date();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const dow = DAYS[d.getDay()];
  return `${month}월 ${day}일 (${dow})`;
}

export function formatTime(date) {
  const d = date || new Date();
  const h = String(d.getHours()).padStart(2, '0');
  const m = String(d.getMinutes()).padStart(2, '0');
  return `${h}:${m}`;
}

export function getMonthLabel(year, month) {
  return `${year}년 ${MONTHS[month]}`;
}

export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

export function toYMD(date) {
  const d = date || new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function todayYMD() {
  return toYMD(new Date());
}

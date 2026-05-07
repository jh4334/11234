const PREFIX = 'saemboard-';

export function load(key, fallback = null) {
  try {
    const val = localStorage.getItem(PREFIX + key);
    return val ? JSON.parse(val) : fallback;
  } catch {
    return fallback;
  }
}

export function save(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    // storage quota exceeded
  }
}

const { contextBridge } = require('electron');

// 필요한 경우 여기서 안전하게 Node API를 렌더러에 노출
// 현재는 localStorage 기반이라 별도 API 불필요
contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform,
});

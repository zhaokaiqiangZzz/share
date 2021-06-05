export const config = {
  server: '/api/',
  size: 10,
  autoSaveInterval: 10 * 60 * 1000, // 默认自动保存的时间
  screenLockTime: 10 * 60 * 1000,   // 系统锁屏时间
  logoutTime: 30 * 60 * 1000,       // 系统自动注销时间
  ERROR_RESPONSE_CODE_KEY: 'code',
  ERROR_RESPONSE_MESSAGE_KEY: 'message',
  PHONE_NUMBER: 'thisIsOurPhoneNumber' // 系统报错时提示的联系电话
};

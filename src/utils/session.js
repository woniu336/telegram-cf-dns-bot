const { SESSION_TIMEOUT, CLEAN_SESSION_INTERVAL } = require('../config');

const userSessions = new Map();

const SessionState = {
  // command: setdns
  SELECTING_DOMAIN_FOR_SET: 'SELECTING_DOMAIN_FOR_SET',
  SELECTING_DOMAIN_FOR_DELETE: 'SELECTING_DOMAIN_FOR_DELETE',

  // command: deldns
  WAITING_SUBDOMAIN_FOR_SET: 'WAITING_SUBDOMAIN_FOR_SET',
  WAITING_SUBDOMAIN_FOR_DELETE: 'WAITING_SUBDOMAIN_FOR_DELETE',

  // command: getdnsall && getdns
  WAITING_IP: 'WAITING_IP',
  WAITING_PROXY: 'WAITING_PROXY',
  WAITING_CONFIRM_DELETE: 'WAITING_CONFIRM_DELETE',
  SELECTING_DOMAIN_FOR_ALL_DNS: 'SELECTING_DOMAIN_FOR_ALL_DNS',
  WAITING_DNS_UPDATE_NEW_IP: 'WAITING_DNS_UPDATE_NEW_IP',
  MANAGING_DNS_RECORD: 'MANAGING_DNS_RECORD',
  VIEWING_DNS_RECORDS: 'VIEWING_DNS_RECORDS',
  WAITING_NEW_PROXY: 'WAITING_NEW_PROXY',
  SELECTING_DOMAIN_FOR_QUERY: 'SELECTING_DOMAIN_FOR_QUERY',
  WAITING_SUBDOMAIN_INPUT: 'WAITING_SUBDOMAIN_INPUT'
};

function cleanupSessions() {
  const now = Date.now();
  for (const [chatId, session] of userSessions.entries()) {
    if (now - session.lastUpdate > SESSION_TIMEOUT) {
      userSessions.delete(chatId);
    }
  }
}

// 启动定期清理
setInterval(cleanupSessions, CLEAN_SESSION_INTERVAL);

module.exports = {
  userSessions,
  SessionState,
  cleanupSessions
};

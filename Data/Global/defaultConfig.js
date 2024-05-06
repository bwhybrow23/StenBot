const defaultConfig = {
  info: {
    id: 0,
    name: '',
    owner_id: '',
    blacklisted: false
  },
  gatekeeper: {
    welcome_enabled: false,
    welcome_channel: '0',
    welcome_message: 'Welcome {user} to {server}',
    leave_enabled: false,
    leave_channel: '0',
    leave_message: 'Goodbye {user} from {server}'
  },
  userjoin: {
    enabled: false,
    role: '0',
    nickname: 'None'
  },
  moderation: {
    staff_role: '0',
    link_block: false,
    filter: [],
    mute_role: ''
  },
  logging: {
    enabled: false,
    channel: '0',
    level: 'medium',
    ignore: []
  },
  tickets: {
    enabled: false,
    message: '**User:** {user}\n**Reason:** {reason}'
  }
};

export default defaultConfig;
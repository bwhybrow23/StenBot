/** 
 * 
 * NEW CONFIG LAYOUT W/ NOTES
 * 
 */

/**
 * 
 * TO-DO
 * 
 * #- Implement new JSON layout into model
 * #- Config command(s)
 * #- App.js stuffs
 * # - Any events/Functions that need updating
 * #- Tickets with default value
 * #- Remove any requirement of the admin value
 * #- Move config-leave and config-welcomer into config-gatekeeper
 * 
 */

//Actual JSON Layout
let json = {
    info: {
        id: '',
        name: '',
        owner_id: '',
        blacklisted: false
    }, 
    gatekeeper: {
        welcome_enabled: false,
        welcome_channel: '',
        welcome_message: '',
        leave_enabled: false,
        leave_channel: '',
        leave_message: ''
    },
    userjoin: {
        enabled: false,
        roles: [],
        nickname: ''
    },
    moderation: {
        staff_role: '',
        link_block: false,
        filter: []
    },
    logging: {
        enabled: false,
        channel: '',
        level: 'medium',
        ignore: []
    },
    tickets: {
        enabled: false,
        message: ''
    }
};
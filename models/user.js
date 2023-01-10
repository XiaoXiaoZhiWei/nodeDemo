class UserSchma {
    constructor(nick_name, avatar_url, open_id, session_key, updated_at) {
        this.nick_name = nick_name,
        this.avatar_url = avatar_url,
        this.gender = 0,
        this.open_id = open_id,
        this.session_key = session_key,
        this.created_at = Date(),
        this.updated_at = updated_at
    }
    
}

module.exports.user = UserSchma;
class Account {
    constructor(id, password, name, email) {
        this._id = id;
        this._password = password;
        this._name = name;
        this._email = email;
    }
    set password(newPassword) {
        // validate new password
        this._password = newPassword;
    }
    get email() {
        return this._email;
    }
}
class Member {
    constructor(account) {
        this._account = account;
    }
    getEmail() {
        return this._account.email;
    }
    reset_password(newPassword) {
        this._account.password = newPassword;
    }
    create_question(question) {
        // API creating new question
    }
}
//# sourceMappingURL=user.js.map
class Account {
    private _id: number;
    private _password: string;
    private _name: string;
    private _email: string;
    constructor(id: number, password: string, name: string, email: string) {
        this._id = id;
        this._password = password;
        this._name = name;
        this._email = email;
    }

    public set password(newPassword: string) {
        // validate new password
        this._password = newPassword;
    }

    public get email() {
        return this._email;
    }
}

class Member {
    private _account: Account;
    constructor(account: Account) {
        this._account = account;
    }

    getEmail() {
        return this._account.email;
    }

    reset_password(newPassword: string) {
        this._account.password = newPassword;
    }

    create_question(question: Question) {
        // API creating new question
    }
}

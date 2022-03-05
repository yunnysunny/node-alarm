const {Email} = require('email');
const AbstractAlarm = require('./AbstractAlarm');
class EmailAlarm extends AbstractAlarm {
    constructor(options = {}) {
        super();
        this._to = options.to;
        this._from = options.from;
        this._sendmailPath = options.sendmailPath;
    }
    send(title, msg, callback) {
        new Email({
            path: this._sendmailPath,
            to: this._to,
            from: this._from,
            subject: title,
            body: msg,
        }).send(callback);
    }
}

module.exports = EmailAlarm;
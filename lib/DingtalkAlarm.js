const superagent = require('superagent');
const AbstractAlarm = require('./AbstractAlarm');
const MAX_LEN = 4000;
const SUPPORTED_MSG_TYPE = ['text', 'markdown'];
class DingtalkAlarm extends AbstractAlarm {
    constructor(options = {}) {
        super();
        const msgType = options.msgType;
        if (!SUPPORTED_MSG_TYPE.includes(msgType)) {
            throw new Error('unsupported message type [' + msgType + ']');
        }
        this._msgType = msgType;
        this._url = options.url;
    }
    _getData(title, msg) {
        if (this._msgType === 'text') {
            return {
                msgtype: this._msgType,
                [this._msgType]: {
                    content: msg,
                }
            };
        } else if (this._msgType === 'markdown') {
            return {
                msgtype: this._msgType,
                [this._msgType]: {
                    text: msg,
                    title
                }
            };
        }
    }
    send(title, msg, callback) {
        if (msg.length > MAX_LEN) {
            msg = msg.substring(0, MAX_LEN) + '...';
        }
        const data = this._getData(title, msg);
        superagent.post(this._url)
            .send(data)
            .end(function(err, res) {
                if (err) {
                    return callback(err);                    
                }
                if (res.statusCode !== 200) {
                    return callback(`send dingtalk error:[${res.statusCode}] ${res.body}`);
                }
                const body = res.body || {};
                if (body.errcode !== 0) {
                    return callback(`send dingtalk failed:[${body.errcode}] ${body.errmsg}`);
                }
                callback();
            });
    }
}

module.exports = DingtalkAlarm;
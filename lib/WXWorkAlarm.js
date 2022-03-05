const superagent = require('superagent');
const AbstractAlarm = require('./AbstractAlarm');

const MAX_LEN = 4000;
const SUPPORTED_MSG_TYPE = ['text', 'markdown'];
class WXWorkAlarm extends AbstractAlarm {
    constructor(options = {}) {
        super();
        const msgType = options.msgType;
        if (!SUPPORTED_MSG_TYPE.includes(msgType)) {
            throw new Error('unsupported message type [' + msgType + ']');
        }
        this._msgType = msgType;
        this._url = options.url;
    }
    send(title, msg, callback) {
        if (msg.length > MAX_LEN) {
            msg = msg.substring(0, MAX_LEN) + '...';
        }
        const data = {
            msgtype: this._msgType,
            [this._msgType]: {
                content: msg
            }
        };
        superagent.post(this._url)
            .send(data)
            .end(function(err, res) {
                if (err) {
                    return callback(err);                    
                }
                if (res.statusCode !== 200) {
                    return callback(`send work weixin error:[${res.statusCode}] ${res.body}`);
                }
                callback();
            });
    }
}

module.exports = WXWorkAlarm;
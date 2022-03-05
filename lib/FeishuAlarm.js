const superagent = require('superagent');
const AbstractAlarm = require('./AbstractAlarm');

const MAX_LEN = 4000;
const SUPPORTED_MSG_TYPE = 'text';
class FeishuAlarm extends AbstractAlarm {
    constructor(options = {}) {
        super();
        const msgType = options.msgType;
        if (msgType !== SUPPORTED_MSG_TYPE) {
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
            msg_type: this._msgType,
            content: {
                [this._msgType]: msg
            }
        };
        superagent.post(this._url)
            .send(data)
            .end(function(err, res) {
                if (err) {
                    return callback(err);                    
                }
                if (res.statusCode !== 200) {
                    return callback(`send feishu error:[${res.statusCode}] ${res.body}`);
                }
                const body = res.body || {};
                if (body.StatusCode !== 0) {// 成功时返回的数据结构是 {StatusCode: number}，失败时返回 {code: number, msg: string}
                    return callback(`send feishu failed:[${body.code}] ${body.msg}`);
                }
                callback();
            });
    }
}

module.exports = FeishuAlarm;
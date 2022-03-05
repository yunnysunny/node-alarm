const util = require('util');
const EmailAlarm = require('./lib/EmailAlarm');
const WXWorkAlarm = require('./lib/WXWorkAlarm');
const FeishuAlarm = require('./lib/FeishuAlarm');
const DingtalkAlarm = require('./lib/DingtalkAlarm');

const ALARM_TYPE_EMAIL =  'email';
const ALARM_TYPE_WXWORK =  'wxwork';
const ALARM_TYPE_FEISHU =  'feishu';
const ALARM_TYPE_DINGTALK = 'dingtalk';
function factory(type, options) {
    switch (type) {
    case ALARM_TYPE_EMAIL:
        return new EmailAlarm(options);
    case ALARM_TYPE_WXWORK:
        return new WXWorkAlarm(options);
    case ALARM_TYPE_FEISHU:
        return new FeishuAlarm(options);
    case ALARM_TYPE_DINGTALK:
        return new DingtalkAlarm(options);
    }
}

class NodeAlarm {
    constructor(alarmConfigs) {
        const alarms = [];
        for (let i=0,len=alarmConfigs.length;i<len;i++) {
    
            const {type, options} = alarmConfigs[i] || {};
            const alarm = factory(type, options);
            if (!alarm) {
                throw new Error('unsupported alarm type ' + type);
            }
            alarms.push(alarm);
        }
        this._alarms = alarms;
    }
    send(title, msg, callback) {
        const promises = [];
        const alarms = this._alarms;
        for (let i=0,len=alarms.length;i<len;i++) {
            const alarm = alarms[i];
    
            const send = util.promisify(alarm.send).bind(alarm);
            promises.push(send(title, msg));
        }
        if (typeof (callback) !== 'function') {
            return promises;
        }
        Promise.all(promises).then(function() {
            callback();
        }).catch(function(err) {
            callback(err);
        });
    }
}

NodeAlarm.ALARM_TYPE_EMAIL = ALARM_TYPE_EMAIL;
NodeAlarm.ALARM_TYPE_WXWORK = ALARM_TYPE_WXWORK;
NodeAlarm.ALARM_TYPE_FEISHU = ALARM_TYPE_FEISHU;
NodeAlarm.ALARM_TYPE_DINGTALK = ALARM_TYPE_DINGTALK;
module.exports = NodeAlarm;

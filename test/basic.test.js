const {expect} = require('chai');
const fs = require('fs');
const path = require('path');
const NodeAlarm = require('../');

const EMAIL_CONFIG = {
    type: NodeAlarm.ALARM_TYPE_EMAIL,
    options: {
        from: 'yunnysunny@foxmail.com',
        to: 'yunnysunny@foxmail.com',
        sendmailPath: process.env.SENDMAIL_PATH
    }
};
const WXWork_CONFIG = {
    type: NodeAlarm.ALARM_TYPE_WXWORK,
    options: {
        url: 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=637cc457-6e6f-44a5-99ad-2e3d825482b2',
        msgType: 'markdown'
    }
};
const FEISHU_CONFIG = {
    type: NodeAlarm.ALARM_TYPE_FEISHU,
    options: {
        url: 'https://open.feishu.cn/open-apis/bot/v2/hook/bbb0ce47-fd3d-4da3-828a-59d7c39ed694',
        msgType: 'text'
    }
};
const DINGTALK_CONFIG = {
    type: NodeAlarm.ALARM_TYPE_DINGTALK,
    options: {
        // eslint-disable-next-line max-len
        url: 'https://oapi.dingtalk.com/robot/send?access_token=4110ef58c5d9f0a377ecabc79b3fb699636470274345548edad182a7976ea61f',
        msgType: 'markdown'
    }
};

const TITLE = 'title_to_send';
const MSG = 'msg_to_send';
const BIG_MSG = fs.readFileSync(
    path.join(__dirname, './messages/send.txt')
).toString('utf8');
describe('basic test#', function() {
    it('test sending email', function(done) {
        const configs = [
            EMAIL_CONFIG
        ];
        const alarm = new NodeAlarm(configs);
        alarm.send(TITLE, MSG, function(err) {
            expect(err).to.be.undefined;
            done();
        });
    });
    it('test sending wxwork', function(done) {
        const configs = [
            WXWork_CONFIG
        ];
        const alarm = new NodeAlarm(configs);
        alarm.send(TITLE, MSG, function(err) {
            expect(err).to.be.undefined;
            done();
        });
    });
    it('test sending feishu', function(done) {
        const configs = [
            FEISHU_CONFIG
        ];
        const alarm = new NodeAlarm(configs);
        alarm.send(TITLE, MSG, function(err) {
            expect(err).to.be.undefined;
            done();
        });
    });
    it('test sending dingtalk', function(done) {
        const configs = [
            DINGTALK_CONFIG
        ];
        const alarm = new NodeAlarm(configs);
        alarm.send(TITLE, MSG, function(err) {
            expect(err).to.be.undefined;
            done();
        });
    });
    it('test sending big message', function(done) {
        const configs = [
            EMAIL_CONFIG,
            WXWork_CONFIG,
            FEISHU_CONFIG,
            DINGTALK_CONFIG
        ];
        const alarm = new NodeAlarm(configs);
        alarm.send(TITLE, BIG_MSG, function(err) {
            expect(err).to.be.undefined;
            done();
        });
    });
});
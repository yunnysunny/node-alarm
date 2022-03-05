# node-alarm

[![build status][action-image]][action-url]
[![GitHub license](https://img.shields.io/github/license/yunnysunny/node-alarm)](https://github.com/yunnysunny/node-alarm)
[![node version][node-image]][node-url]

[npm-url]: https://npmjs.org/package/@yunnysunny/node-alarm
[action-image]: https://github.com/yunnysunny/node-alarm/workflows/CI/badge.svg
[action-url]: https://github.com/yunnysunny/node-alarm/actions/workflows/ci.yml

[node-image]: https://img.shields.io/badge/node.js-%3E=_12-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/

[![NPM](https://nodei.co/npm/node-alarm.png?downloads=true)](https://nodei.co/npm/node-alarm/) 

一个报警发送库，支持发送邮件和各种办公 IM 的聊天机器人，包括企业微信、飞书、钉钉。

## 安装

```
yarn add node-alarm
```

或者
```
npm install node-alarm
```

### 配置 sendmail

发送邮件时需要依赖于 sendmail，在 linux 下需要保证操作系统环境中已经安装了这个软件，否则需要使用 `apt-get install sendmail` (debain 环境下) 进行安装。

Windows 下没有 sendmail 的官方版本支持，需要安装一个模拟的版本，具体可以参见这篇博文 [在windows下配置sendmail服务器](https://www.jianshu.com/p/2bdc4c60ae40) 。安装配置完成后，在使用本包发送邮件的时候，需要显示的指定 sendmail 所在的完整的路径，或者将 sendmail 可执行程序所在的路径添加到环境变量 PATH 中。

## 示例

```javascript
const NodeAlarm = require('node-alarm');
const EMAIL_CONFIG = {
    type: NodeAlarm.ALARM_TYPE_EMAIL,
    options: {
        from: 'yunnysunny@foxmail.com',//发件人
        //收件人，支持逗号分隔的字符串来传递多个收件人，传递多个收件人时也支持直接传递字符串数组
        to: 'yunnysunny@foxmail.com',
        sendmailPath: process.env.SENDMAIL_PATH//sendmail的路径，默认为空，为空时从环境变量 PATH 中查找
    }
};
const WXWORK_CONFIG = {
    type: NodeAlarm.ALARM_TYPE_WXWORK,
    options: {
        // 机器人地址
        url: 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=637cc457-6e6f-44a5-99ad-2e3d825482b2',
        msgType: 'markdown'//支持 text 和 markdown 两种类型
    }
};
const FEISHU_CONFIG = {
    type: NodeAlarm.ALARM_TYPE_FEISHU,
    options: {
        // 机器人地址
        url: 'https://open.feishu.cn/open-apis/bot/v2/hook/bbb0ce47-fd3d-4da3-828a-59d7c39ed694',
        msgType: 'text'// 只支持 text 类型
    }
};
const DINGTALK_CONFIG = {
    type: NodeAlarm.ALARM_TYPE_DINGTALK,
    options: {
        // 机器人地址
        url: 'https://oapi.dingtalk.com/robot/send?access_token=4110ef58c5d9f0a377ecabc79b3fb699636470274345548edad182a7976ea61f',
        msgType: 'markdown'//支持 text 和 markdown 类型
    }
};
const configs = [
    EMAIL_CONFIG,
    WXWORK_CONFIG,
    FEISHU_CONFIG,
    DINGTALK_CONFIG
];
const alarm = new NodeAlarm(configs);
alarm.send(TITLE, BIG_MSG, function(err) {
    // check if err is exist
});
```

## 贡献代码

所有的实现代码都在 lib 文件夹下，添加一个具体的实现类继承自 [AbstractAlarm](lib/AbstractAlarm.js) 即可，下面给出一个示例：

```javascript
const AbstractAlarm = require('./AbstractAlarm');
class CustomAlarm extends AbstractAlarm {
    constructor(options = {}) {
        super();
        // options 处理
    }
    //省略其他内部函数
    send(title, msg, callback) {
        //具体发送业务逻辑，成功传递 callback()，失败传递 callback(Error)
    }
}
module.exports = CustomAlarm;
```

由于导出的是类文件，所以文件名以大骆驼峰命名。如果使用 http 做请求的话，本项目已经内置 superagent 库。

欢迎大家提 pull request。

## 协议

[MIT](LICENSE)

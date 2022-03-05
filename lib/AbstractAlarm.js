module.exports = class AbstractAlarm {
    constructor() {

    }
    // eslint-disable-next-line no-unused-vars
    send(title, msg, callback) {
        throw new Error('not supported now');
    }
};
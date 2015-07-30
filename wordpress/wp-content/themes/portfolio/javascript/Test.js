var Mediator = require('./Mediator');

module.exports = {
    init    :   initTest
}

Mediator.register('test', module);
module.receive = receive;

function initTest() {
    console.log('hello, world!');
}

function receive(msg, data) {
    if (msg == 'TEST') {
        console.log('received', msg);
    }
}

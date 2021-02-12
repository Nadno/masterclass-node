const EventEmitter = require('events');
const path = require('path');
const fs = require('fs');

const emitter = new EventEmitter();

emitter.on('log', (object) => {
  fs.appendFile(
    path.join(__dirname, 'log.txt'),
    JSON.stringify(object),
    (err) => {
      if (err) {
        throw new Error(err);
      }
    }
  );
});

function log(message) {
  emitter.emit('log', message);
}

module.exports = log;

const os = require('os');

const { freemem, totalmem } = os;

const getStats = () => {
  const free = parseInt((freemem() / 1024) / 1024);
  const total = parseInt((totalmem() / 1024) / 1024);
  const percent = parseInt((free / total) * 100);

  return {
    'free': `${free} MB`,
    'total': `${total} MB`,
    'usage': `${percent}%`,
  };
}

const logStats = () => {
  console.clear()
  console.table(getStats())
}

const oneSecond = 1000;

setInterval(logStats, oneSecond)
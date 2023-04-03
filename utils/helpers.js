// const dayjs = require("dayjs");

// function formatDate(date) {
//   return dayjs(date).format("DD MM YYYY HH:mm:ss");
// }

// module.exports = formatDate;

const dayjs = require("dayjs");

function formatDate(date) {
  return dayjs(date).format("HH:mm:ss on DD-MM-YYYY");
}

module.exports = formatDate;

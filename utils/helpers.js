const dayjs = require("dayjs");

function formatDate(date) {
  dayjs(date).format("DD MM YYYY HH:mm:ss");
}

module.exports = formatDate;

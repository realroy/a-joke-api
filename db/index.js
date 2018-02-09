const mongoose = require("mongoose");
require("dotenv").config();

const getDbURL = env =>
  env === 'production' ? '' : `mongodb://172.17.0.2:27017/${env}`

module.exports = () => {
  const url = getDbURL(process.env)
  const connection = mongoose.createConnection(url)
  connection.on('error', console.error)
  connection.once('open', () => console.log('Estrablish DB complete!'))
  return connection
};

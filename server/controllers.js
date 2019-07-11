const dbHelpers = require('../database/dbHelpers.js');

const get = (req, res) => {
  dbHelpers.get()
    .then((data) => {
      res.status(200).send(data)
    })
    .catch((err) => {
      res.status(404);
    })
}

module.exports = { get };
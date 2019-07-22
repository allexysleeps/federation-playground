const data = require('./data')

module.exports.getPriceById = (id) => Promise.resolve(data.find((i) => i.id === id, data))

module.exports.getPricesByIds = (ids) => Promise.resolve(
  data.reduce((acc, i ) => ids.find((id) => i.id === id) ? [...acc, i] : acc, [])
)
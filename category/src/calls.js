const data = require('./data')

module.exports.getCategoryById = (id) => Promise
  .resolve(data.find((i) => id === i.id))

module.exports.getCategoriesById = (ids) => Promise
  .resolve(data.filter(({ id }) => ids.find((i => i === id))))
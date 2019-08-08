const data = require('./data')

module.exports.getProductById = (productId) => Promise
  .resolve(data.find(({ id }) => id === productId))

module.exports.getProducts = () => Promise.resolve(data)
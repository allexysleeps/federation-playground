const { getPricesByIds } = require('./calls')

module.exports.priceBatcher = (ids) => getPricesByIds(ids)
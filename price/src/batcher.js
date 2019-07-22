const { getPricesByIds } = require('./calls')

module.exports.priceBatcher = (ids) => getPricesByIds(ids).then((data) => { console.log(data); return data })
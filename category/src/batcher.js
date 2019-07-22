const { getCategoriesById } = require('./calls')

module.exports.categoryBatcher = (ids) => getCategoriesById(ids)
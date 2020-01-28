const { ApolloServer, gql } = require('apollo-server')
const { buildFederatedSchema } = require('@apollo/federation')
const DataLoader = require('dataloader')

const { getCategoryById, getCategoriesById } = require('./calls')
const { categoryBatcher } = require('./batcher')

const categoryLoader = new DataLoader(categoryBatcher)

const typeDefs = gql`
    extend type Query {
        category(id: String!): Category
    }
    type Category @key (fields: "code") {
        code: String!
        name: String,
        parentCategory: [Category],
        subCategory: [Category],
    }
`

const resolvers = {
  Category: {
    subCategory(obj) {
      const catIds = obj.subCategory.map(({ id }) => id )
      return getCategoriesById(catIds)
    },
    parentCategory(obj) {
      const catIds = obj.parentCategory.map(({ id }) => id )
      return getCategoriesById(catIds)
    },
    __resolveReference(obj) {
      return categoryLoader.load(obj.id)
    }
  },
  Query: {
    category(_, args) {
      return getCategoryById(args.id)
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  schema: buildFederatedSchema([{ typeDefs, resolvers }])
})

server.listen(3003).then(({ url }) => {
  console.log(`Category MS is running on ${url}`)
})
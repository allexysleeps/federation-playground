const { ApolloServer, gql } = require('apollo-server')
const { buildFederatedSchema } = require('@apollo/federation')
const DataLoader = require('dataloader')

const { priceBatcher } = require('./batcher')

const priceLoader = new DataLoader(priceBatcher)

const typeDefs = gql`
    type ProductPrice @key(fields: "id type") {
        id: String!,
        type: ProductType
        incVat: Int
        exVat: Int
    }

    enum ProductType {
        BASE
        PROMOTIONAL
    }
`

const resolvers = {
  ProductPrice: {
    __resolveReference: async ({ id, type }) => {
      const price = await priceLoader.load(id)
      return {
        id,
        type,
        ...price,
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  schema: buildFederatedSchema([{ typeDefs, resolvers }])
})

server.listen(3002).then(({ url }) => {
  console.log(`Price MS is running on ${url}`)
})
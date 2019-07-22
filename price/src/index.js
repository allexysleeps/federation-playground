const { ApolloServer, gql } = require('apollo-server')
const { buildFederatedSchema } = require('@apollo/federation')
const DataLoader = require('dataloader')

const { priceBatcher } = require('./batcher')

const priceLoader = new DataLoader(priceBatcher)

const typeDefs = gql`
    type Price {
        id: String!
        incVat: Int
        exVat: Int
    }
    type ProductPrice @key(fields: "id") {
        id: String!,
        price: Price
    }
`

const resolvers = {
  ProductPrice: {
    __resolveReference({ id }) {
      return {
        id,
        price: priceLoader.load(id)
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
const { ApolloServer, gql } = require('apollo-server')
const { buildFederatedSchema } = require('@apollo/federation')

const { getProductById, getProducts } = require('./calls')

const typeDefs = gql`
    extend type Query {
        product(id: String!): Product
        products: [Product]
    }
    type Product {
        id: String!
        name: String
        price(type: ProductType): ProductPrice @provides(fields: "id type")
    }
    extend type ProductPrice @key (fields: "id type") {
        id: String! @external
        type: ProductType @external
    }
    enum ProductType {
        BASE
        PROMOTIONAL
    }
`

  const resolvers = {
    Query: {
      product(_, args) {
        return getProductById(args.id)
      },
      products() {
        return getProducts()
      }
    },
    Product: {
      price(product, args) {
        return { __typename: 'ProductPrice', id: product.id, type: args.type }
      }
    }
  }

const server = new ApolloServer({
  typeDefs,
  schema: buildFederatedSchema([{ typeDefs, resolvers }])
})

server.listen(3001).then(({ url }) => {
  console.log(`Product MS is running on ${url}`)
})
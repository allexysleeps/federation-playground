const { ApolloServer, gql } = require('apollo-server')
const { buildFederatedSchema } = require('@apollo/federation')

const { getProducts } = require('./calls')

const typeDefs = gql`
    extend type Query {
        searchProducts: [Product]
    }
    type Product {
        id: ID!
        name: String
        price: ProductPrice @provides(fields: "id")
        parentCategory: [Category!]! @provides(fields: "id")
    }
    type Test {
        id: String
    }
    extend type ProductPrice @key (fields: "id") {
        id: String! @external
    }
    extend type Category @key (fields: "id") {
        id: String! @external
    }
`

const resolvers = {
  Query: {
    searchProducts() {
      return getProducts()
    }
  },
  Product: {
    price(product) {
      return { __typename: 'ProductPrice', id: product.id }
    },
    parentCategory({ parentCategory }) {
      return parentCategory
        .map((id) => ({ __typename: 'Category', id }))
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  schema: buildFederatedSchema([{ typeDefs, resolvers }])
})

server.listen(3004).then(({ url }) => {
  console.log(`Product MS is running on ${url}`)
})
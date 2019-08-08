const { ApolloServer } = require('apollo-server');
const { ApolloGateway } = require("@apollo/gateway");

const gateway = new ApolloGateway({
  serviceList: [
    { name: 'product', url: 'http://localhost:3001/graphql' },
    { name: 'price', url: 'http://localhost:3002/graphql' },
    { name: 'category', url: 'http://localhost:3003/graphql' }
  ],
});

gateway.load()
  .then(({ schema, executor }) => {
    const server = new ApolloServer({ schema, executor });
  
    server.listen(3000).then(({ url }) => {
      console.log(`🚀 Server ready at ${url}`);
    });
  })
  .catch((e) => {
    console.log(e)
  })
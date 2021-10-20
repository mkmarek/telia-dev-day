const { ApolloServer } = require('apollo-server');
const { ApolloGateway } = require('@apollo/gateway');

const gateway = new ApolloGateway({
  serviceList: [
    { name: 'products', url: 'http://localhost:2222' },
    { name: 'orders', url: 'http://localhost:1111' }
  ]
});

// Pass the ApolloGateway to the ApolloServer constructor
const server = new ApolloServer({
  gateway
});

server.listen(3333).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
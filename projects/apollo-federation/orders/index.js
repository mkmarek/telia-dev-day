const { ApolloServer, gql } = require("apollo-server");
const fs = require('fs');
const resolverFunctions = require('./resolvers');
const path = require('path')
const { buildSubgraphSchema } = require('@apollo/subgraph');

const schema = fs.readFileSync(path.join(__dirname, 'schema.graphql')).toString()

const resolvers = {
    Mutation: {
        createUserOrder(parent, args, context, info) {
            console.log('Order service got createUserOrder')
            return resolverFunctions.createUserOrder(args.id);
        },
        createOrderItem(parent, args, context, info) {
            console.log('Order service got createOrderItem')
            return resolverFunctions.addToOrder(args.input.orderItem.orderId, args.input.orderItem.productId);
        }
    }
};

const server = new ApolloServer({ schema: buildSubgraphSchema([{ typeDefs: gql(schema), resolvers }]) });

server.listen(1111).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

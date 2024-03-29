const { ApolloServer, gql } = require("apollo-server");
const fs = require('fs');
const resolverFunctions = require('./resolvers');
const path = require('path')

const schema = fs.readFileSync(path.join(__dirname, 'schema.graphql')).toString()

const resolvers = {
    Query: {
        allCategories(parent, args, context, info) {
            return resolverFunctions.allCategories();
        },
        allManufacturers(parent, args, context, info) {
            return resolverFunctions.allManufacturers();
        },
        allProducts(parent, args, context, info) {
            return resolverFunctions.allProducts();
        },
        async productById(parent, args, context, info) {
            const result = await resolverFunctions.productById(args.id);
            return result.nodes[0]
        }
    },
    Mutation: {
        createUserOrder(parent, args, context, info) {
            return resolverFunctions.createUserOrder(args.id);
        },
        createOrderItem(parent, args, context, info) {
            return resolverFunctions.addToOrder(args.input.orderItem.orderId, args.input.orderItem.productId);
        }
    },
    Product: {
        async categoryByCategoryId(parent, args, context, info) {
            const result = await resolverFunctions.categoryByCategoryId(parent.category_id);

            return result.nodes[0]
        }
    }
};

const server = new ApolloServer({ typeDefs: schema, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

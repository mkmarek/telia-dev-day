const { ApolloServer, gql } = require("apollo-server");
const fs = require('fs');
const resolverFunctions = require('./resolvers');
const path = require('path')
const { buildSubgraphSchema } = require('@apollo/subgraph');

const schema = fs.readFileSync(path.join(__dirname, 'schema.graphql')).toString()

const resolvers = {
    Query: {
        allCategories(parent, args, context, info) {
            console.log('Product service got allCategories')
            return resolverFunctions.allCategories();
        },
        allManufacturers(parent, args, context, info) {
            console.log('Product service got allManufacturers')
            return resolverFunctions.allManufacturers();
        },
        allProducts(parent, args, context, info) {
            console.log('Product service got allProducts')
            return resolverFunctions.allProducts();
        },
        async productById(parent, args, context, info) {
            console.log('Product service got productById')
            const result = await resolverFunctions.productById(args.id);
            return result.nodes[0]
        }
    },
    Product: {
        async categoryByCategoryId(parent, args, context, info) {
            console.log('Product service got categoryByCategoryId')
            const result = await resolverFunctions.categoryByCategoryId(parent.category_id);

            return result.nodes[0]
        }
    }
};

const server = new ApolloServer({ schema: buildSubgraphSchema([{ typeDefs: gql(schema), resolvers }]) });

server.listen(2222).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

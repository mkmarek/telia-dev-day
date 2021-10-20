const { ApolloServer, gql } = require("apollo-server");
const fs = require('fs');
const path = require('path')

const inputData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json')))

function getProducts(group) {
    return inputData.products.filter(e => !group || e.groups.includes(group))
}

function getProduct(id) {
    return inputData.products.find(e => e.id === id)
}

function getUsers() {
    return inputData.users;
}

function getUser(id) {
    return inputData.users.find(e => e.id === id)
}

const typeDefs = gql`
type Product {
    id: ID!
    name: String!
    price: Float!
    comments: [Comment!]!
}

type User {
    imageUrl: String!
    name: String!
}

type Comment {
    id: ID!
    user: User!
    content: String!
}

type ProductVariant {
    id: ID!
    color: String
}

type Query {
    products(group: String): [Product!]!
    product(id: ID!): Product
    users: [User!]!
    user(id: ID!): User
}
`;

const resolvers = {
    Query: {
        products: (parent, args, context, info) => getProducts(args.group),
        product: (parent, args, context, info) => getProduct(args.id),
        users: (parent, args, context, info) => getUsers(),
        user:  (parent, args, context, info) => getUser(args.id),
    },
    Product: {
        comments: (parent, args, context, info) => {
            const parentProduct = getProduct(parent.id)
            if (!parentProduct) {
                return []
            }

            return parentProduct.comments || [];
        }
    },
    Comment: {
        user: (parent, args, context, info) => getUser(parent.userId),
    }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

const express = require("express");
const {graphqlHTTP} = require("express-graphql");
const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLSchema} = require("graphql/type");

let usersList = []

const UserType = new GraphQLObjectType({
    name: "UserType",
    fields: () => ({
        id: {type: GraphQLID}, name: {type: GraphQLString}, email: {type: GraphQLString}
    })
});
const query = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        users: {
            type: new GraphQLList(UserType),
            resolve() {
                return usersList
            }
        },
        user: {
            type: UserType,
            args: {id: {type: GraphQLID}},
            resolve(parent, {id}) {
                return usersList.find(user => user.id === id)
            }
        }
    }
})

const mutation = new GraphQLObjectType({
    name: "mutations",
    fields: {
        addUser: {
            type: UserType,
            args: {name: {type: GraphQLString}, email: {type: GraphQLString}},
            resolve(parent, {name, email}) {
                const newUser = {name, email, id: Date.now().toString()};
                usersList.push(newUser);
                return newUser;
            }
        },
        updateUser: {
            type: UserType,
            args: {id: {type: GraphQLID}, name: {type: GraphQLString}, email: {type: GraphQLString}},
            resolve(parent, {id, name, email}) {
                const user = usersList.find(u => u.id === id);
                user.name = name;
                user.email = email;
                return user;
            }
        },
        deleteUser: {
            type: UserType,
            args: {id: {type: GraphQLID}},
            resolve(parent, {id}) {
                const user = usersList.find(u => u.id === id);
                usersList = usersList.filter(u => u.id !== id);
                return user;
            }
        }
    }
});

const schema = new GraphQLSchema({query, mutation});

const app = express();

app.use("/graphql", graphqlHTTP({schema, graphiql: true}))

app.listen(5001, () => console.log("Server Running"))

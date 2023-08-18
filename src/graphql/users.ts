import {gql} from 'apollo-server-express';
import {initModels, usersAttributes} from '@/database/models/init-models';
import postgreSqlDatabase from "@/database/postgres";

const models = initModels(postgreSqlDatabase.postgresQLInstance.sequelize);

export const typeDefs = gql`
    type User {
        id: Int
        username: String
        fullname: String
        town: String
        avatar: String
        quotes: String
        background: String
        friends: [ID!]
    }
    
    type Query {
        users: [User],
        user(id: Int!): User
    }
    
    type Mutation {
        createUser(username: String, fullname: String, town: String, avatar: String, quotes: String): User
        changeUserInfomation(id: Int!, username: String, fullname: String, town: String, avatar: String, quotes: String): User
    }
`;

 export const resolvers = {
    Query: {
        users: async () =>{
            const data = await models.users.findAll();
            return data.map((user) => user.dataValues);
        },
        user: async(obj, args, context, info) => {
            const data = await models.users.findOne({where: {id: args.id}});
            return data?.dataValues;
        },
    },
    Mutation: {
        createUser: async (obj, args: usersAttributes, context, info) =>  {
            const user = await models.users.create(args);
            return user.id
        },
        changeUserInfomation: async(obj, args, context, info) => {
            const user = await models.users.findOne({where: {id: args.id}});
            if(user){
                const res = await user.update(args);
                return res.dataValues
            }
            return null
        }
    }
 }

 export default {
    typeDefs,
    resolvers
 }

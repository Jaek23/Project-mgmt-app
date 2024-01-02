// const {projects, clients} = require('../sampleData'); no longer using this 

const Project = require('../models/Project');
const Client = require('../models/Client');

const {
    GraphQLObjectType, 
    GraphQLID, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLList 
} = require('graphql');

// Project Type 
const ProjectType = new GraphQLObjectType({
    name:'Project',
    fields:() =>({
        id:{type: GraphQLID},
        name:{type:GraphQLString},
        description:{type:GraphQLString},
        status:{type:GraphQLString},
        client:{
            type: ClientType,
            resolve(parent, args){
                return Client.findById(parent.clientId); //we are finding the client id matching the client id in the projects schema -- parent.clientId refers to the Client id in the project model 
            }
        }
    }),
});


// Client Type 
const ClientType = new GraphQLObjectType({
    name:'Client',
    fields:() =>({
        id:{type: GraphQLID},
        name:{type:GraphQLString},
        email:{type:GraphQLString},
        phone:{type:GraphQLString},
    }),
});

// Queries 
const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        projects:{
            type: new GraphQLList(ProjectType),
            resolve(parent, args){
                return Project.find();
            }
        },
        project:{ // this query is to grab a single project 
            type:ProjectType, // this refers to the projectType we created above 
            args:{id: {type:GraphQLID}}, //refers to the project ID by referring to the type which is GraphQLID referenced above 
            resolve(parent, args){ // resolver is the query to fetch the requested data 
                return Project.findById(args.id) // finding the project by their id 
            },
        },
        clients:{
            type: new GraphQLList(ClientType),
            resolve(parent, args){
                return Client.find();
            }
        },
        client:{ // this query is to grab a single client 
            type:ClientType, // this refers to the clientType we created above 
            args:{id: {type:GraphQLID}}, //refers to the client ID by referring to the type which is GraphQLID referenced above 
            resolve(parent, args){ // resolver is the query to fetch the requested data 
                return Client.findById(args.id) // finding the client by their id 
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query:RootQuery,
});
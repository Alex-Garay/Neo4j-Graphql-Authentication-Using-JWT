export const typeDefs = `
    type User {
        id: ID @id
        username: String! @unique
        password: String!
    }
    input UserInput {
        username: String!
        password: String!
    }
    type AuthenticationUser {
        username: String!   
    }
    type Authentication {
        token: String!
        user: AuthenticationUser
    }
    type Mutation {
        SignUp(input: UserInput): Authentication
    }
    type Mutation {
        LogIn(input: UserInput): Authentication
    }
`;

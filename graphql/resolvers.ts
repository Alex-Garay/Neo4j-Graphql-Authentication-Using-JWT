import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import "dotenv/config";
import { User } from "../utility/database";
export const resolvers = {
  Mutation: {
    SignUp: async (_parent: any, args: any) => {
      let { username } = args.input;
      const { password } = args.input;
      // Convert username to lowercase
      username = username.toLowerCase();
      // Find if user already exists
      const validatedUser = await User.find({
        where: {
          username: username,
        },
      });
      // Throw error if user exists
      if (validatedUser.length > 0) {
        throw new Error("User already exists!");
      }
      // Use bcrypt to hash password to store securely in database
      const hashedPassoword = await bcrypt.hash(password, 10);
      // Create the user using the hashed password
      const { users: user } = await User.create({
        input: {
          username: username,
          password: hashedPassoword,
        },
      });
      // Sign JWT token using user id and username expiring in 24h
      const token = jwt.sign(
        {
          userid: user[0].id,
          username: user[0].username,
        },
        process.env.JWT_SECRET!,
        { expiresIn: "24h" }
      );
      // Return Authenticated User
      return {
        token,
        authenticated: true,
        user: {
          username: user[0].username,
        },
      };
    },
    LogIn: async (_parent: any, args: any) => {
      const { username: usernameInput, password } = args.input;
      // CHeck for existing user
      const validateUser = await User.find({
        where: {
          username: usernameInput,
        },
      });
      // Check if user does not exist
      if (validateUser.length === 0) {
        throw new Error("User does not exist!");
      }
      // Deconstruct id, username, and password from our user array
      const { id, username, password: hashedPassoword } = validateUser[0];
      // Compare input password with our hashed password in database
      const validatePassword = await bcrypt.compare(password, hashedPassoword);
      // Throw error if passwords aren't validated
      if (!validatePassword) {
        throw new Error("Password is incorrect!");
      }
      // Sign JWT token using user id and username expiring in 24h
      const token = jwt.sign(
        {
          userid: id,
          username: username,
        },
        process.env.JWT_SECRET!,
        { expiresIn: "24h" }
      );
      // Return Authenticated User
      return {
        token: token,
        user: {
          username: username,
        },
      };
    },
  },
};

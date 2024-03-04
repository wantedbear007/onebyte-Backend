import { userRegistrationModel } from "../models/userRegistrationModel";

export const mutationsResolvers = {
  getName: (parent: any, args: { name: String }, context: any, info: any) => {
    return "hello " + args.name;
  },
  registerUser: (
    parent: any,
    args: userRegistrationModel,
    // args: {
    //   name: string;
    //   email: string;
    //   username: string;
    //   bio: string;
    //   profileUrl?: string;
    //   password: string;
    // },
    context: any,
    info: any
  ) => {
    const { username, bio, email, name, password } = args;
    console.log("mutation resolvers called !");
    console.log(username, bio, email, name, password);

    // use zod for checking !
    return "bhupendra Jogiii";
    // check all fields
    // password encryption
  },

  // loginUser: (
  //   parent: any,
  //   args: { username: string; password: string },
  //   context: any,
  //   info: any
  // ) => {},
};

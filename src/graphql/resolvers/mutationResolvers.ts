import { isErrored } from "stream";
import InputValidation from "../../middleware/inputValidation";
import { userRegistrationModel } from "../models/userRegistrationModel";
import * as zodTypeCheck from "zod";
import { ApolloError, ValidationError } from "apollo-server-core";
import { responseCodes } from "../../utils/statusCode";

// user registration error

export interface userRegistrationResponse {
  message: string;
  statusCode?: number;
}

export const mutationsResolvers = {
  getName: (parent: any, args: { name: String }, context: any, info: any) => {
    return "hello " + args.name;
  },
  registerUser: async (
    parent: any,
    args: userRegistrationModel,
    context: any,
    info: any
  ) => {
    const { username, bio, email, name, password } = args;

    try {
      if (!(username || bio || email || name || password)) {
        throw new ValidationError("all fields are required");
      }

      const validateDetails: boolean = InputValidation.registration(args);
      if (!validateDetails) {
        throw new ValidationError("data format is invalid");
      }
      console.log(username, bio, email, name, password);

      const response: userRegistrationResponse = {
        message: "request was successful",
        statusCode: responseCodes.userCreated,
      };

      return response;
    } catch (err: any) {
      if (err instanceof ValidationError) {
        // throw new ApolloError("Validation error: ", err.message);
        console.log("validation err")
      } else {
        console.log("internal error ");
      }
    }

    // console.log(username, bio, email, name, password);

    // use zod for checking !
    // return "bhupendra Jogiii";
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

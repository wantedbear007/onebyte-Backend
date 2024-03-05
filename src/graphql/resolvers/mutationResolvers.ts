import InputValidation from "../../middleware/inputValidation";
import { userRegistrationModel } from "../models/userRegistrationModel";
import { ValidationError } from "apollo-server-core";
import { responseCodes } from "../../utils/statusCode";
import Hashing from "../../services/passwordHashing";

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
    // response
    let response: userRegistrationResponse = {
      message: "Registration was successful",
    };

    try {
      if (!(username || bio || email || name || password)) {
        throw new ValidationError("all fields are required");
      }

      const validateDetails: boolean = InputValidation.registration(args);
      if (!validateDetails) {
        throw new ValidationError("data format is invalid");
      }
      console.log(username, bio, email, name, password);
      const hashedPass: string | null = await Hashing.hashPassword(password);

      if (hashedPass == null) {
        throw new Error("Internal logical error");
      }
      console.log("old password ", password);
      console.log("new password ", hashedPass);

      const isMatchedPassword: boolean = await Hashing.comparePassword(
        password,
        hashedPass
      );
      console.log("password is same: ", isMatchedPassword);
      response.statusCode = responseCodes.userCreated;

      // return response;
    } catch (err: any) {
      if (err instanceof ValidationError) {
        console.log("validation err");
        response.message = err.message;
        response.statusCode = responseCodes.partialContent;
      } else {
        response.message = err.message || "Internal occurred";
        response.statusCode = responseCodes.internalError;
      }
    } finally {
      return response;
    }

    // password encryption
  },

  // loginUser: (
  //   parent: any,
  //   args: { username: string; password: string },
  //   context: any,
  //   info: any
  // ) => {},
};

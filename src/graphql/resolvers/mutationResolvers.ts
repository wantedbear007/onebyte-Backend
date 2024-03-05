import InputValidation from "../../middleware/inputValidation";
import { userRegistrationModel } from "../models/userRegistrationModel";
import { ValidationError } from "apollo-server-core";
import responseCodes from "../../utils/statusCode";
import Hashing from "../../services/passwordHashing";
import DatabaseOperations, { DatabaseResponse } from "../../prisma/operations";

// user registration error
export interface userRegistrationResponse {
  message: string;
  statusCode?: number;
}

export const mutationsResolvers = {
  // user registration endpoint
  registerUser: async (
    parent: any,
    args: userRegistrationModel,
    context: any,
    info: any
  ) => {
    const { username, bio, email, name, password } = args;
    // response from the server
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
      const hashedPassword: string | null = await Hashing.hashPassword(
        password
      );
      if (hashedPassword === null) {
        throw new Error("Internal logical error");
      }

      const parameters: userRegistrationModel = {
        password: hashedPassword,
        username,
        bio,
        name,
        email,
      };

      const databaseResponse: DatabaseResponse =
        await DatabaseOperations.registerUser(parameters);

      if (databaseResponse === DatabaseResponse.alreadyRegistered) {
        response.message = "username or email already registered !";
        response.statusCode = responseCodes.unauthorized;
        return;
      }
      response.statusCode = responseCodes.userCreated;
    } catch (err: any) {
      if (err instanceof ValidationError) {
        response.message = err.message;
        response.statusCode = responseCodes.partialContent;
      } else {
        response.message = err.message || "Internal occurred";
        response.statusCode = responseCodes.internalError;
      }
    } finally {
      return response;
    }
  },

  // loginUser: (
  //   parent: any,
  //   args: { username: string; password: string },
  //   context: any,
  //   info: any
  // ) => {},
};

import { ValidationError } from "apollo-server-core";

// user defined
import {
  userLoginModel,
  userRegistrationModel,
} from "../graphql/models/userModel";
import InputValidation from "../middleware/inputValidation";
import Hashing from "./passwordHashing";
import DatabaseOperations, { DatabaseResponse } from "../prisma/operations";
import responseCodes from "../utils/statusCode";
import { prismaInstance } from "..";

// to return back response to front-end
export interface userServicesResponse {
  message: string;
  statusCode?: number;
}

class UserServices {
  // to register users
  async userRegistration(
    args: userRegistrationModel
  ): Promise<userServicesResponse> {
    const { username, bio, email, name, password } = args;

    // response from the server
    let response: userServicesResponse = {
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
      } else {
        response.statusCode = responseCodes.userCreated;
      }
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
  }

  // to login users
  async userLogin(args: userLoginModel): Promise<userServicesResponse> {
    const { username, password } = args;

    //  response
    let response: userServicesResponse = {
      message: "Login Successful",
    };

    try {
      if (!(username || password)) {
        throw new ValidationError("all fields are required ");
      }
      if (!InputValidation.login(args)) {
        throw new ValidationError("invalid input format");
      }

      // const response: boolean = await comp

      const res = await prismaInstance.user.findUnique({
        where: {
          username: username,
        },
      });
      if (res == null) {
        response.message = "no records found ";
        response.statusCode = responseCodes.notFound;
        return response;
      }

      const passwordVerification: boolean = await Hashing.comparePassword(
        password,
        res?.password
      );
      console.log("is password verified ", passwordVerification);

      console.log("Welcome: ", res?.name);
    } catch (err: any) {
      if (err instanceof ValidationError) {
        response.message = err.message;
        response.statusCode = responseCodes.partialContent;
      }
    } finally {
      return response;
    }
  }
}

export default UserServices;

// username letxbebhanu
// password 9907224577

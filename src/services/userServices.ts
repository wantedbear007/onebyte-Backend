import { ValidationError } from "apollo-server-core";
import * as jwt from "jsonwebtoken";

// user defined
import {
  userLoginModel,
  userRegistrationModel,
} from "../graphql/models/userModel";
import InputValidation from "../middleware/inputValidation";
import Hashing from "./passwordHashing";
import DatabaseOperations, { DatabaseResponse } from "../prisma/operations";
import responseCodes from "../utils/responseCodes";
import { prismaInstance } from "..";
import { jwt_secret } from "../utils/constants";

// to return back response to front-end
export interface userServicesResponse {
  message?: string;
  statusCode?: number;
  token?: string;
}

class UserServices {
  // to register users
  async userRegistration(
    args: userRegistrationModel,
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
      const hashedPassword: string | null =
        await Hashing.hashPassword(password);
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

      const res: userRegistrationModel | null =
        await prismaInstance.user.findUnique({
          where: {
            username: username,
          },
        });

      if (res == null) {
        throw new Error("Unauthorized access");
      }

      const passwordVerification: boolean = await Hashing.comparePassword(
        password,
        res?.password,
      );

      if (!passwordVerification) {
        throw new Error("Username or Password is incorrect");
      }

      const jwtToken = jwt.sign({ username: username }, jwt_secret, {
        // expiresIn: "2h",
      });

      await DatabaseOperations.updateLastLogin(username);

      // console.log("Your jwt is ", jwtToken);
      // const jwt_response = jwt.verify(jwtToken, "jwt_secret")

      response.token = jwtToken;
      response.statusCode = responseCodes.authenticated;
    } catch (err: any) {
      if (err instanceof ValidationError) {
        response.message = err.message;
        response.statusCode = responseCodes.partialContent;
      } else {
        response.message = err.message;
        response.statusCode = responseCodes.unauthorized;
      }
    } finally {
      return response;
    }
  }

  static async userVerify(token: string): Promise<userServicesResponse> {
    let response: userServicesResponse = {
      message: "JWT verified",
    };
    try {
      const isVerified: DatabaseResponse =
        await DatabaseOperations.verifyUser(token);

      if (isVerified === DatabaseResponse.tokenVerified) {
        response.statusCode = responseCodes.authenticated;
      }

      if (isVerified === DatabaseResponse.tokenExpired) {
        throw new jwt.TokenExpiredError("Token expired", new Date());
      }
    } catch (err: any) {
      if (err instanceof jwt.TokenExpiredError) {
        response.message = "JWT token expired !";
        response.statusCode = responseCodes.unauthorized;
      } else {
        response.message = "Internal error";
        response.statusCode = responseCodes.internalError;
      }
    } finally {
      return response;
    }
  }
}

export default UserServices;

// username letxbebhanu
// password 9907224577

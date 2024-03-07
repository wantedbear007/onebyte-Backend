import * as jwt from "jsonwebtoken";
import { AuthenticationError, ValidationError } from "apollo-server-core";

// user defined
import { noteCreateModel } from "../graphql/models/noteModel";
import InputValidation from "../middleware/inputValidation";
import responseCodes from "../utils/responseCodes";
import UserServices, { userServicesResponse } from "./userServices";
import DatabaseOperations from "../prisma/operations";

export interface noteServiceResponse {
  message: string;
  statusCode?: number;
}

class NoteServices {
  // to create note
  static async createNote(args: noteCreateModel): Promise<noteServiceResponse> {
    const { token } = args;

    // response
    let response: noteServiceResponse = {
      message: "Note created successfully",
    };

    try {
      if (!InputValidation.note(args)) {
        throw new ValidationError("invalid data. Try again");
      }

      const verifyUser: userServicesResponse = await UserServices.userVerify(
        token!
      );
      if (verifyUser.statusCode != responseCodes.authenticated) {
        throw new AuthenticationError("token is invalid");
      }

      console.log(verifyUser);
      const decodedToken: jwt.JwtPayload | null = jwt.decode(token!, {
        complete: true,
      });

      if (!decodedToken) {
        throw new Error("Internal error");
      }

      const { username } = decodedToken.payload;

      console.log("decoded token ", decodedToken);



      DatabaseOperations.createNote(args, username);
      response.statusCode = responseCodes.userCreated
    } catch (err: any) {
      if (err instanceof ValidationError) {
        response.message = err.message;
        response.statusCode = responseCodes.partialContent;
      } else if (err instanceof AuthenticationError) {
        response.message = err.message;
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

export default NoteServices;

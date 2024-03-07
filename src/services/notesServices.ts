import * as jwt from "jsonwebtoken";
import { AuthenticationError, ValidationError } from "apollo-server-core";

// user defined
import { noteModel } from "../graphql/models/noteModel";
import InputValidation from "../middleware/inputValidation";
import responseCodes from "../utils/responseCodes";
import UserServices, { userServicesResponse } from "./userServices";
import DatabaseOperations, { DatabaseResponse } from "../prisma/operations";

export interface noteServiceResponse {
  message: string;
  statusCode?: number;
  notes?: noteModel[];
}

class NoteServices {
  // to create note
  static async createNote(args: noteModel): Promise<noteServiceResponse> {
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
        token!,
      );
      if (verifyUser.statusCode != responseCodes.authenticated) {
        throw new AuthenticationError("token is invalid");
      }

      // console.log(verifyUser);
      const decodedToken: jwt.JwtPayload | null = jwt.decode(token!, {
        complete: true,
      });

      if (!decodedToken) {
        throw new Error("Internal error");
      }

      const { username } = decodedToken.payload;

      console.log("decoded token ", decodedToken);

      DatabaseOperations.createNote(args, username);
      response.statusCode = responseCodes.userCreated;
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

  // to get all notes of specific user
  static async getNotes(token: string): Promise<noteServiceResponse> {
    const response: noteServiceResponse = {
      message: "Notes received!",
    };
    try {
      const notes: noteModel[] = await DatabaseOperations.getNotes(token);
      response.notes = notes;
      response.statusCode = responseCodes.authenticated;

      return response;
    } catch (err: any) {
    } finally {
      return response;
    }
  }
}

export default NoteServices;

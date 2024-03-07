// user defined
import { userLoginModel, userRegistrationModel } from "../models/userModel";
import UserServices, {
  userServicesResponse,
} from "../../services/userServices";
import { noteCreateModel } from "../models/noteModel";
import NoteServices from "../../services/notesServices";

// user registration error
export interface userRegistrationResponse {
  message: string;
  statusCode?: number;
}

export interface userLoginResponse {
  message: string;
  statusCode?: number;
}

interface userVerifyResponse {
  message: string;
  statusCode: number;
  token: String;
}

const userServices: UserServices = new UserServices();

export const mutationsResolvers = {
  // user registration endpoint
  registerUser: async (
    parent: any,
    args: userRegistrationModel,
    context: any,
    info: any
  ) => {
    return await userServices.userRegistration(args);
  },

  // user login endpoint
  loginUser: async (
    parent: any,
    args: userLoginModel,
    context: any,
    info: any
  ) => {
    return await userServices.userLogin(args);
  },

  verifyUser: async (
    parent: any,
    args: { token: string },
    context: any,
    info: any
  ) => {
    const verificationResults: userServicesResponse =
    await UserServices.userVerify(args.token);

    const response: userVerifyResponse = {
      message: verificationResults.message!,
      statusCode: verificationResults.statusCode!,
      token: args.token,
    };

    return response;
  },

  createNote: async (
    parent: any,
    args: noteCreateModel,
    context: any,
    info: any
  ) => {
    const { title, body, token } = args;
    console.log("inside create note endpoint");
    console.log("data ", args);
    return await NoteServices.createNote(args);
    // console.log(res)
    // return "hello bhanu";
  },
};

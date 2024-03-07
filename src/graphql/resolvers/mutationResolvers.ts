// user defined
import { userLoginModel, userRegistrationModel } from "../models/userModel";
import UserServices from "../../services/userServices";

// user registration error
export interface userRegistrationResponse {
  message: string;
  statusCode?: number;
}

export interface userLoginResponse {
  message: string;
  statusCode?: number;
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
    args: {token: string},
    context: any,
    info: any
  ) => {
    
    await userServices.userVerify(args.token);
    return "hello from bhanu"
  }
};

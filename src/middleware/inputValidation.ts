import * as Z from "zod";
import {
  userLoginModel,
  userRegistrationModel,
} from "../graphql/models/userModel";

const registrationSchema = Z.object({
  name: Z.string(),
  email: Z.string().email(),
  password: Z.string(),
  bio: Z.string(),
  username: Z.string(),
});

const loginSchema = Z.object({
  username: Z.string(),
  password: Z.string(),
});

export default class InputValidation {
  // registration validation
  static registration(userDetails: userRegistrationModel): boolean {
    const results = registrationSchema.safeParse(userDetails);

    if (results.success) {
      return true;
    } else {
      return false;
    }
  }

  // login validation
  static login(userDetails: userLoginModel): boolean {
    const results = loginSchema.safeParse(userDetails);
    return results.success ? true : false;
  }
}

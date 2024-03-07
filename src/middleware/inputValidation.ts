import * as Z from "zod";
import {
  userLoginModel,
  userRegistrationModel,
} from "../graphql/models/userModel";
import { noteCreateModel } from "../graphql/models/noteModel";

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

const notesSchema = Z.object({
  token: Z.string(),
  title: Z.string(),
  body: Z.string(),
});

export default class InputValidation {
  // registration validation
  static registration(userDetails: userRegistrationModel): boolean {
    const results = registrationSchema.safeParse(userDetails);
    return results.success ? true : false;
  }

  // login validation
  static login(userDetails: userLoginModel): boolean {
    const results = loginSchema.safeParse(userDetails);
    return results.success ? true : false;
  }

  // notes validation
  static note(noteDetails: noteCreateModel): boolean {
    const results = notesSchema.safeParse(noteDetails);
    return results.success ? true : false;
  }
}

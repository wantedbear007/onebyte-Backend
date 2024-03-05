import * as Z from "zod";
import { userRegistrationModel } from "../graphql/models/userRegistrationModel";

const registrationSchema = Z.object({
  name: Z.string(),
  email: Z.string().email(),
  password: Z.string(),
  bio: Z.string(),
  username: Z.string(),
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
}

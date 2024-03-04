import { prismaInstance } from "../index";
import { userRegistrationModel } from "../graphql/models/userRegistrationModel";
import { v4 as uniqueId } from "uuid";
import { profilePictureUrl } from "../utils/constants";

// error responses
export enum DatabaseResponse {
  operationFailed,
  operationSuccess,
}

export default class DatabaseOperations {
  // user registration
  static async registerUser(
    userDetails: userRegistrationModel
  ): Promise<DatabaseResponse> {
    try {
      await prismaInstance.user.create({
        data: {
          userId: uniqueId(),
          picture: profilePictureUrl,
          ...userDetails,
        },
      });
      return DatabaseResponse.operationSuccess;
    } catch (err) {
      return DatabaseResponse.operationFailed;
    } finally {
      prismaInstance.$disconnect();
    }
  }

  // user login
  async loginUser(): Promise<void> {
    // to login
  }
}

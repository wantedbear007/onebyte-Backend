import { prismaInstance } from "../index";
import { userRegistrationModel } from "../graphql/models/userModel";
import { v4 as uniqueId } from "uuid";
import { profilePictureUrl } from "../utils/constants";
import { Prisma } from "@prisma/client";

// error responses
export enum DatabaseResponse {
  operationFailed,
  operationSuccess,
  alreadyRegistered,
}

export default class DatabaseOperations {
  // user registration
  static async registerUser(
    userDetails: userRegistrationModel
  ): Promise<DatabaseResponse> {
    try {
      const res = await prismaInstance.user.create({
        data: {
          userId: uniqueId(),
          picture: profilePictureUrl,
          ...userDetails,
        },
      });
      return DatabaseResponse.operationSuccess;
    } catch (err: any) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code == "P2002") {
          return DatabaseResponse.alreadyRegistered;
        }
      }
      // console.log(err.message)
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

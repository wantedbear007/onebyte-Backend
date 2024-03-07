import { v4 as uniqueId } from "uuid";
import { Prisma } from "@prisma/client";
import * as jwt from "jsonwebtoken";

// user defined
import { prismaInstance } from "../index";
import {
  userLoginModel,
  userRegistrationModel,
} from "../graphql/models/userModel";
import { jwt_secret, profilePictureUrl } from "../utils/constants";
import { noteCreateModel } from "../graphql/models/noteModel";

// error responses
export enum DatabaseResponse {
  operationFailed,
  operationSuccess,
  alreadyRegistered,
  tokenExpired,
  tokenVerified,
}

export default class DatabaseOperations {
  // user registration
  static async registerUser(
    userDetails: userRegistrationModel,
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
  async loginUser(userDetails: userLoginModel): Promise<void> {
    try {
      const { username, password } = userDetails;

      const res: userRegistrationModel | null =
        await prismaInstance.user.findUnique({
          where: {
            username: username,
          },
        });

      // if (res == null) {
      //   return new Error("Unauthorized access");
      // }
    } catch (err: any) {
    } finally {
      prismaInstance.$disconnect();
    }
  }

  // to update user last login
  static async updateLastLogin(username: string): Promise<boolean> {
    try {
      const res = await prismaInstance.user.update({
        where: {
          username: username,
        },
        data: {
          lastLogin: new Date(),
        },
      });

      return res == null ? false : true;
    } catch (err: any) {
      return false;
    }
  }

  // to verify user
  static async verifyUser(token: string): Promise<DatabaseResponse> {
    try {
      const verification = jwt.verify(token, jwt_secret);
      if (!verification) {
        throw new Error("Internal error");
      }

      return DatabaseResponse.tokenVerified;
    } catch (err: any) {
      if (err instanceof jwt.TokenExpiredError) {
       // console.log("token expired ");
        return DatabaseResponse.tokenExpired;
      } else {
        return DatabaseResponse.operationFailed;
      }
    } 
  }

  // create note
  static async createNote(args: noteCreateModel): Promise<void> {
      try {
        // prismaInstance.user.create(
        //   {
        //     data: {
        //       notes
        //     }
        //   }
        // )

      } catch (err: any) {
        console.log("erro in create note operation")
        console.log(err)
      }
  }
}

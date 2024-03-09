import { v4 as uniqueId } from "uuid";
import { Prisma } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

// user defined
import { prismaInstance } from "../index";
import {
  userLoginModel,
  userRegistrationModel,
} from "../graphql/models/userModel";
import { jwt_secret, profilePictureUrl } from "../utils/constants";
import { noteModel } from "../graphql/models/noteModel";

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
      if (err instanceof PrismaClientKnownRequestError) {
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
      const { username } = userDetails;

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
  static async createNote(
    args: noteModel,
    username: string
  ): Promise<DatabaseResponse> {
    const { title, body, color } = args;
    try {
      const userInstance = await prismaInstance.user.findUnique({
        where: {
          username: username,
        },
      });

      if (!userInstance) {
        throw new Error("user not found");
      }

      await prismaInstance.note.create({
        data: {
          backgroundColor: color,
          title: title,
          body: body,
          authorId: userInstance.userId,
        },
      });

      return DatabaseResponse.operationSuccess;
    } catch (err: any) {
      return DatabaseResponse.operationFailed;
    } finally {
      prismaInstance.$disconnect();
    }
  }

  // get specific user notes
  static async getNotes(token: string): Promise<noteModel[]> {
    let allUserNotes: noteModel[] = [];
    try {
      const res: DatabaseResponse = await this.verifyUser(token);
      if (res === DatabaseResponse.tokenVerified) {
        const data: jwt.JwtPayload | null = jwt.decode(token, {
          complete: true,
        });

        if (data?.payload) {
          const { username } = data.payload;

          const res = await prismaInstance.user.findUnique({
            where: {
              username: username,
            },
            include: {
              notes: true,
            },
          });

          if (!res) {
            throw new Error("hello");
          }

          allUserNotes = res.notes.map((note: noteModel) => ({
            id: note.id,
            title: note.title,
            body: note.body,
            createdAt: note.createdAt,
            updatedAt: note.updatedAt,
            backgroundColor: note.backgroundColor,
          }));
        }
      } else {
        throw new Error("something wrong with token. login again");
      }
    } catch (err: any) {
      return allUserNotes;
    } finally {
      prismaInstance.$disconnect();
      return allUserNotes;
    }
  }

  // delete note
  static async deleteNote(noteId: number): Promise<DatabaseResponse> {
    try {
      await prismaInstance.note.delete({
        where: {
          id: noteId,
        },
      });

      return DatabaseResponse.operationSuccess;
    } catch (err: any) {
      return DatabaseResponse.operationFailed;
    } finally {
      prismaInstance.$disconnect();
    }
  }
}

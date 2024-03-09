import { number } from "zod";

export interface noteModel {
  title: string;
  body: string;
  token?: string;
  color?: string;
  username?: string;
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  authorId?: string;
  backgroundColor?: string;
}

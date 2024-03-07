/*
  Warnings:

  - You are about to drop the column `noteId` on the `Note` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Note_noteId_key";

-- AlterTable
ALTER TABLE "Note" DROP COLUMN "noteId";

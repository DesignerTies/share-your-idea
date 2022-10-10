/*
  Warnings:

  - You are about to drop the column `ideas` on the `User` table. All the data in the column will be lost.
  - Added the required column `auth0Id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "ideas",
ADD COLUMN     "auth0Id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Idea" ADD CONSTRAINT "Idea_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

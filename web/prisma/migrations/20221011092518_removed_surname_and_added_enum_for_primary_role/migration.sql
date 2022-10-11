/*
  Warnings:

  - You are about to drop the column `surName` on the `User` table. All the data in the column will be lost.
  - Changed the type of `primaryRole` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('StartUp', 'Investor');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "surName",
DROP COLUMN "primaryRole",
ADD COLUMN     "primaryRole" "Role" NOT NULL;

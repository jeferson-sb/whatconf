/*
  Warnings:

  - The `refresh_token_expires_in` column on the `Account` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Example` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "refresh_token_expires_in",
ADD COLUMN     "refresh_token_expires_in" INTEGER;

-- DropTable
DROP TABLE "Example";

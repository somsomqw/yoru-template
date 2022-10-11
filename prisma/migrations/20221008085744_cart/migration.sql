-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_userEmail_fkey";

-- AlterTable
ALTER TABLE "Cart" ALTER COLUMN "userEmail" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

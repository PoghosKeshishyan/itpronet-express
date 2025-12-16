-- AlterTable
ALTER TABLE "ServiceSection" ADD COLUMN     "authorId" TEXT;

-- AddForeignKey
ALTER TABLE "ServiceSection" ADD CONSTRAINT "ServiceSection_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

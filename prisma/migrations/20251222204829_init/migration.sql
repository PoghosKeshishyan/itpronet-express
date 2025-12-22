-- AlterTable
ALTER TABLE "Contact_page" ADD COLUMN     "authorId" TEXT;

-- AddForeignKey
ALTER TABLE "Contact_page" ADD CONSTRAINT "Contact_page_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

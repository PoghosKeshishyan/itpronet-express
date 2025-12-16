-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_sectionId_fkey";

-- DropForeignKey
ALTER TABLE "ServiceType" DROP CONSTRAINT "ServiceType_serviceId_fkey";

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "ServiceSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceType" ADD CONSTRAINT "ServiceType_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

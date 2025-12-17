-- CreateTable
CREATE TABLE "Footer" (
    "id" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "authorId" TEXT,

    CONSTRAINT "Footer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Working_hour" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "weekdays" TEXT NOT NULL,
    "saturday" TEXT NOT NULL,
    "footerId" TEXT,

    CONSTRAINT "Working_hour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quick_link" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "footerId" TEXT,

    CONSTRAINT "Quick_link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quick_link_item" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "quick_linkId" TEXT,

    CONSTRAINT "Quick_link_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service_link" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "footerId" TEXT,

    CONSTRAINT "Service_link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service_link_item" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "service_linkId" TEXT,

    CONSTRAINT "Service_link_item_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Footer" ADD CONSTRAINT "Footer_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Working_hour" ADD CONSTRAINT "Working_hour_footerId_fkey" FOREIGN KEY ("footerId") REFERENCES "Footer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quick_link" ADD CONSTRAINT "Quick_link_footerId_fkey" FOREIGN KEY ("footerId") REFERENCES "Footer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quick_link_item" ADD CONSTRAINT "Quick_link_item_quick_linkId_fkey" FOREIGN KEY ("quick_linkId") REFERENCES "Quick_link"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service_link" ADD CONSTRAINT "Service_link_footerId_fkey" FOREIGN KEY ("footerId") REFERENCES "Footer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service_link_item" ADD CONSTRAINT "Service_link_item_service_linkId_fkey" FOREIGN KEY ("service_linkId") REFERENCES "Service_link"("id") ON DELETE SET NULL ON UPDATE CASCADE;

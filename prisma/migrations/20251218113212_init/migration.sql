-- CreateTable
CREATE TABLE "Service_page" (
    "id" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "social" TEXT NOT NULL,
    "list" TEXT NOT NULL,
    "authorId" TEXT,

    CONSTRAINT "Service_page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Servive_list" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "service_pageId" TEXT,

    CONSTRAINT "Servive_list_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Service_page" ADD CONSTRAINT "Service_page_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Servive_list" ADD CONSTRAINT "Servive_list_service_pageId_fkey" FOREIGN KEY ("service_pageId") REFERENCES "Service_page"("id") ON DELETE SET NULL ON UPDATE CASCADE;

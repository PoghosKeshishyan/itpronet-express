-- CreateTable
CREATE TABLE "About_page" (
    "id" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "btn_text" TEXT NOT NULL,
    "hero_text" TEXT NOT NULL,
    "authorId" TEXT,

    CONSTRAINT "About_page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "About_block" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "about_pageId" TEXT,

    CONSTRAINT "About_block_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "About_device_block" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "about_pageId" TEXT,

    CONSTRAINT "About_device_block_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "About_page" ADD CONSTRAINT "About_page_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "About_block" ADD CONSTRAINT "About_block_about_pageId_fkey" FOREIGN KEY ("about_pageId") REFERENCES "About_page"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "About_device_block" ADD CONSTRAINT "About_device_block_about_pageId_fkey" FOREIGN KEY ("about_pageId") REFERENCES "About_page"("id") ON DELETE SET NULL ON UPDATE CASCADE;

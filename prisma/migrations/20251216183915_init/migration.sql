-- CreateTable
CREATE TABLE "Slider" (
    "id" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "authorId" TEXT,

    CONSTRAINT "Slider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Slide" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "sliderId" TEXT,

    CONSTRAINT "Slide_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Slider" ADD CONSTRAINT "Slider_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Slide" ADD CONSTRAINT "Slide_sliderId_fkey" FOREIGN KEY ("sliderId") REFERENCES "Slider"("id") ON DELETE SET NULL ON UPDATE CASCADE;

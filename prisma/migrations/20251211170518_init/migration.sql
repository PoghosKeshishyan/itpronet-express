/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Header_info" (
    "id" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "welcomeText" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "authorId" TEXT,

    CONSTRAINT "Header_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Navbar" (
    "id" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "navbar_contactId" TEXT NOT NULL,
    "authorId" TEXT,

    CONSTRAINT "Navbar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Navbar_menu" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "navbarId" TEXT,

    CONSTRAINT "Navbar_menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Navbar_contact" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "Navbar_contact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Header_info" ADD CONSTRAINT "Header_info_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Navbar" ADD CONSTRAINT "Navbar_navbar_contactId_fkey" FOREIGN KEY ("navbar_contactId") REFERENCES "Navbar_contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Navbar" ADD CONSTRAINT "Navbar_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Navbar_menu" ADD CONSTRAINT "Navbar_menu_navbarId_fkey" FOREIGN KEY ("navbarId") REFERENCES "Navbar"("id") ON DELETE SET NULL ON UPDATE CASCADE;

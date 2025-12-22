-- CreateTable
CREATE TABLE "Contact_page" (
    "id" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "phone_number_one" TEXT NOT NULL,
    "phone_number_two" TEXT NOT NULL,
    "phone_decr" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "email_decr" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "work_location" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "name_label" TEXT NOT NULL,
    "name_placeholder" TEXT NOT NULL,
    "phone_label" TEXT NOT NULL,
    "phone_placeholder" TEXT NOT NULL,
    "message_placeholder" TEXT NOT NULL,
    "button" TEXT NOT NULL,

    CONSTRAINT "Contact_page_pkey" PRIMARY KEY ("id")
);

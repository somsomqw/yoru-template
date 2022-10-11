-- CreateTable
CREATE TABLE "Campagign" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,

    CONSTRAINT "Campagign_pkey" PRIMARY KEY ("id")
);

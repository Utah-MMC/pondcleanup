-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "pondType" TEXT,
    "service" TEXT,
    "pondSize" TEXT,
    "description" TEXT,
    "contactMethod" TEXT,
    "source" TEXT,
    "referrer" TEXT,
    "userAgent" TEXT
);

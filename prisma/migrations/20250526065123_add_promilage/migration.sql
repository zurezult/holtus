-- CreateTable
CREATE TABLE "Promilage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Promilage" REAL NOT NULL,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Promilage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

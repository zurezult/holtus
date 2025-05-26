/*
  Warnings:

  - You are about to drop the column `Promilage` on the `Promilage` table. All the data in the column will be lost.
  - Added the required column `promilage` to the `Promilage` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Promilage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "promilage" REAL NOT NULL,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Promilage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Promilage" ("created", "id", "userId") SELECT "created", "id", "userId" FROM "Promilage";
DROP TABLE "Promilage";
ALTER TABLE "new_Promilage" RENAME TO "Promilage";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

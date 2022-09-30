/*
  Warnings:

  - You are about to drop the column `logoSvg` on the `Establishment` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Establishment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Establishment" ("id", "name") SELECT "id", "name" FROM "Establishment";
DROP TABLE "Establishment";
ALTER TABLE "new_Establishment" RENAME TO "Establishment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

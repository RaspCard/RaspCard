/*
  Warnings:

  - You are about to drop the `Data` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `isSeller` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Data_userId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Data";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "pin" INTEGER NOT NULL,
    "establishmentId" INTEGER NOT NULL,
    CONSTRAINT "Admin_establishmentId_fkey" FOREIGN KEY ("establishmentId") REFERENCES "Establishment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "surname" TEXT,
    "phoneNumber" INTEGER,
    "balance" REAL NOT NULL DEFAULT 0,
    "func" TEXT,
    "establishmentId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "User_establishmentId_fkey" FOREIGN KEY ("establishmentId") REFERENCES "Establishment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("createdAt", "establishmentId", "id", "name", "phoneNumber", "surname", "updatedAt") SELECT "createdAt", "establishmentId", "id", "name", "phoneNumber", "surname", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "surname" TEXT,
    "phoneNumber" INTEGER,
    "isSeller" BOOLEAN NOT NULL,
    "establishmentId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "User_establishmentId_fkey" FOREIGN KEY ("establishmentId") REFERENCES "Establishment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Establishment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "logoSvg" BLOB NOT NULL
);

-- CreateTable
CREATE TABLE "Data" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "balance" REAL NOT NULL DEFAULT 0,
    "func" TEXT,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Data_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Data_userId_key" ON "Data"("userId");

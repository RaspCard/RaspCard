-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Establishment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "logoSvg" TEXT NOT NULL
);
INSERT INTO "new_Establishment" ("id", "logoSvg", "name") SELECT "id", "logoSvg", "name" FROM "Establishment";
DROP TABLE "Establishment";
ALTER TABLE "new_Establishment" RENAME TO "Establishment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

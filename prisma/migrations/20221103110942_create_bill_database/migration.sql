-- CreateTable
CREATE TABLE "Bill" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expireDate" TEXT NOT NULL,
    "daysBeforeExpireDateToRemember" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Bill_id_key" ON "Bill"("id");

-- CreateTable
CREATE TABLE "UsageLog" (
    "id" SERIAL NOT NULL,
    "user" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "fields" TEXT,
    "timeElapsed" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UsageLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pro" (
    "id" SERIAL NOT NULL,
    "user" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pro_pkey" PRIMARY KEY ("id")
);

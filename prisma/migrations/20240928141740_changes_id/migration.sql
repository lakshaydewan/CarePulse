/*
  Warnings:

  - The primary key for the `MedicalDetails` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "MedicalDetails" DROP CONSTRAINT "MedicalDetails_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "MedicalDetails_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "MedicalDetails_id_seq";

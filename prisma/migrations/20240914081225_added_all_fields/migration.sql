/*
  Warnings:

  - You are about to drop the column `description` on the `MedicalDetails` table. All the data in the column will be lost.
  - You are about to drop the column `fileUrl` on the `MedicalDetails` table. All the data in the column will be lost.
  - The primary key for the `Patient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `fullname` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `telephone` on the `Patient` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `MedicalDetails` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[identificationNumber]` on the table `MedicalDetails` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `MedicalDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthDate` to the `MedicalDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `MedicalDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emergencyContactName` to the `MedicalDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emergencyPhoneNumber` to the `MedicalDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `MedicalDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `MedicalDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identificationNumber` to the `MedicalDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identificationType` to the `MedicalDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `insurancePolicyNumber` to the `MedicalDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `insuranceProvider` to the `MedicalDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `occupation` to the `MedicalDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `MedicalDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `primaryCarePhysician` to the `MedicalDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verificationUrl` to the `MedicalDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_patientId_fkey";

-- DropForeignKey
ALTER TABLE "MedicalDetails" DROP CONSTRAINT "MedicalDetails_patientId_fkey";

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "additionalNotes" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending',
ALTER COLUMN "patientId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "MedicalDetails" DROP COLUMN "description",
DROP COLUMN "fileUrl",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "allergies" TEXT,
ADD COLUMN     "birthDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "currentMedication" TEXT,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "emergencyContactName" TEXT NOT NULL,
ADD COLUMN     "emergencyPhoneNumber" TEXT NOT NULL,
ADD COLUMN     "familyMedicalHistory" TEXT,
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "identificationNumber" TEXT NOT NULL,
ADD COLUMN     "identificationType" TEXT NOT NULL,
ADD COLUMN     "insurancePolicyNumber" TEXT NOT NULL,
ADD COLUMN     "insuranceProvider" TEXT NOT NULL,
ADD COLUMN     "occupation" TEXT NOT NULL,
ADD COLUMN     "pastMedicalHistory" TEXT,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "primaryCarePhysician" TEXT NOT NULL,
ADD COLUMN     "verificationUrl" TEXT NOT NULL,
ALTER COLUMN "patientId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_pkey",
DROP COLUMN "fullname",
DROP COLUMN "telephone",
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Patient_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Patient_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "MedicalDetails_email_key" ON "MedicalDetails"("email");

-- CreateIndex
CREATE UNIQUE INDEX "MedicalDetails_identificationNumber_key" ON "MedicalDetails"("identificationNumber");

-- AddForeignKey
ALTER TABLE "MedicalDetails" ADD CONSTRAINT "MedicalDetails_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

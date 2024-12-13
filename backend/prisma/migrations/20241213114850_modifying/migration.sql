-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_id_fkey";

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

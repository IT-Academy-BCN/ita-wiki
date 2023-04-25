-- CreateTable
CREATE TABLE "viewed_resource" (
    "user_id" TEXT NOT NULL,
    "resource_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "viewed_resource_pkey" PRIMARY KEY ("user_id","resource_id")
);

-- AddForeignKey
ALTER TABLE "viewed_resource" ADD CONSTRAINT "viewed_resource_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "viewed_resource" ADD CONSTRAINT "viewed_resource_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

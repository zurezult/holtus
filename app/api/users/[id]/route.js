import prisma from "@/Lib/prisma";

export async function DELETE(request, { params }) {
  const {id} = await params;
  console.log("delete record");
  await prisma.user.delete({ where: { id : Number(id) } });
  return new Response(null, { status: 204 });
}

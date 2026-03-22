import { updateNumberOfLikes } from "../../lib/prisma-db";

export async function PUT(request) {
  const { mediaId, change } = await request.json();

  console.log("API radi:", mediaId, change);

  await updateNumberOfLikes(mediaId, change);

  return Response.json({ success: true });
}

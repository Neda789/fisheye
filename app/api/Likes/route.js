import { updateNumberOfLikes } from '../../lib/prisma-db';

export async function PUT(request) {
  const { mediaId, likes } = await request.json();
  await updateNumberOfLikes(mediaId, likes);
  return Response.json({ success: true });
}
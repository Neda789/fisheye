import { updateNumberOfLikes } from "../../lib/prisma-db";

export async function PUT(request) {
  try {
    const { mediaId, change } = await request.json();

    console.log("API work:", mediaId, change);

   
    if (!mediaId || !change) {
      return Response.json(
        { error: "Missing mediaId or change" },
        { status: 400 }
      );
    }

    const updated = await updateNumberOfLikes(mediaId, change);

    return Response.json({ success: true, data: updated }, { status: 200 });
  } catch (error) {
    console.error("API ERROR:", error);

    return Response.json(
      { error: "Server error while updating likes" },
      { status: 500 }
    );
  }
}
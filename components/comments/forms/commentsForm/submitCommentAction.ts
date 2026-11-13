import { createComment } from "@/lib/api/comments";
import type { CommentFormState } from "./commentFormTypes";

export async function submitCommentAction(
  prevState: CommentFormState,
  formData: FormData,
): Promise<CommentFormState> {
  const postsId = String(formData.get("postsId") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();

  if (!postsId || !name || !email || !body) {
    return {
      ok: false,
      message: "",
      error: "All fields are required",
    };
  }

  try {
    const res = await createComment(Number(postsId), {
      name,
      email,
      body,
    });
    return {
      ok: true,
      message: `Comment ${res.id} submitted successfully`,
      error: undefined,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: "",
      error: "Error submitting comment",
    };
  }
}

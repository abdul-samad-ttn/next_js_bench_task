"use client";

import {useFormStatus} from "react-dom";

const CommentFormSubmitButton = () => {
    const { pending} = useFormStatus();
    return (
        <button type="submit" disabled={pending} className="w-full rounded-md bg-blue-500 p-2 text-white disabled:opacity-60">
            {pending ? "Submitting..." : "Submit"}
        </button>
    )
}

export default CommentFormSubmitButton;
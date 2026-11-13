"use client";

import { useActionState, useRef, useMemo } from "react";
import {initialCommentFormState} from "./commentFormTypes";
import CommentFormSubmitButton from "./CommentFormSubmitButton";
import { createCommentFormAction } from "./createCommentFormAction";

interface CommentsFormProps {
    postsId: string;
    onSuccess?: () => void;
}

const CommentsForm = ({postsId, onSuccess}: CommentsFormProps) => {
    const formAction = useMemo(
        () => createCommentFormAction(onSuccess),
        [onSuccess],
      );
      const [state, boundFormAction, isPending] = useActionState(
        formAction,
        initialCommentFormState,
      );
    const formRef = useRef<HTMLFormElement>(null);

    return (
        <div className="flex w-full max-w-md flex-col gap-3">
            <h2 className="text-xl font-bold text-gray-800">Add a new comment</h2>

            <form action={boundFormAction} ref={formRef} className="flex flex-col gap-3">
                <input type="hidden" name="postsId" value={postsId} />
                
                <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" name="name" id="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" disabled={isPending} required />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" name="email" id="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" disabled={isPending} required />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="body" className="block text-sm font-medium text-gray-700">Comment</label>
                    <textarea name="body" id="body" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" disabled={isPending} required />
                </div>
                <CommentFormSubmitButton />
            </form>

            {state.error ? <p className="text-sm text-red-500">{state.error}</p> : null}
        </div>
    )
}

export default CommentsForm;
import { useState } from "react";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";

import { Comment } from "../types";

interface Props {
    commentId: string;
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
    oldComment: string;
    parentCommentId?: string;
    replyId?: string;
    commentObject?: {
        content: string;
        createdAt: string;
        replies: Comment[];
        score: number;
        owner: {
            username: string;
            profileImageUrl: string;
        };
    };
}

const EditComment = ({
    commentId,
    setEditMode,
    oldComment,
    parentCommentId,
    replyId,
    commentObject,
}: Props) => {
    const [comment, setComment] = useState(oldComment);

    const handleCancel = () => {
        setEditMode(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const updatedComment = {
            content: comment,
            updatedAt: new Date().toISOString(),
        };

        // If replyId exists, it's a reply and as such, we need to update the parent comment's replies array with the new reply content
        if (replyId && parentCommentId) {
            // Add unique id to reply, this will be used to identify the reply in the UI, and also to identify the reply in the database since the reply will be stored in the replies array of the parent comment as a string

            // Seach for parent comment in firebase
            const docRef = doc(db, "comments", parentCommentId);

            try {

                // Get doc content from doc ref
                const docSnap = await getDoc(docRef);

                // Get replies array from doc snap
                const repliesArray = docSnap.data()?.replies;

                // Find reply in replies array
                const replyIndex = repliesArray.findIndex(
                    (reply: Comment) => reply.replyId === replyId
                );

                // Update reply in replies array
                repliesArray[replyIndex] = {
                    ...repliesArray[replyIndex],
                    content: comment,
                    updatedAt: new Date().toISOString(),
                };

                // Update replies array in firestore
                await updateDoc(docRef, {
                    replies: repliesArray,
                });
            }catch (err) {
                console.error(err);
            }

        } else {
            const docRef = doc(db, "comments", commentId);

            // Update comment in firestore

            try {
                await updateDoc(docRef, updatedComment);
            } catch (err) {
                console.error(err);
            }
        }

        alert("Comment updated successfully");
        setEditMode(false);
    };

    return (
        <div className="bg-white rounded-lg w-full mt-4 mx-auto text-grayish-blue pb-6">
            <form
                onSubmit={handleSubmit}
                className="flex gap-3 flex-col items-end"
            >
                <textarea
                    placeholder="Add a comment..."
                    className="rounded-md pl-4 w-full h-24 border-2 border-light-gray bg-white"
                    onChange={handleChange}
                    value={comment}
                    name="comment"
                    id=""
                />
                <div className="flex gap-1">
                    <button
                        className="hover:opacity-70 transition-all px-2 py-2 text-white bg-moderated-blue rounded-md"
                        type="submit"
                    >
                        UPDATE
                    </button>
                </div>
            </form>
            <button
                onClick={handleCancel}
                className="hover:opacity-70 transition-all px-2 py-2 text-white bg-soft-red rounded-md"
            >
                CANCEL
            </button>
        </div>
    );
};

export default EditComment;

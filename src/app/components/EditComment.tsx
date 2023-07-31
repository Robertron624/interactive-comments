import { useState } from "react";
import { useCommentStore } from "../store/commentStore";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/utils/firebase";

interface Props {
    commentId: string;
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
    oldComment: string;
    parentCommentId?: number;
}

const EditComment = ({
    commentId,
    setEditMode,
    oldComment,
    parentCommentId,
}: Props) => {
    const [comment, setComment] = useState(oldComment);

    const handleCancel = () => {
        setEditMode(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
    };

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const docRef = doc(db, "comments", commentId);

        // Update comment in firestore
        const updatedComment = {
            content: comment,
            updatedAt: serverTimestamp(),
        };

        await updateDoc(docRef, updatedComment);
        alert("Comment updated successfully");

        // // if parentCommentId is defined, then we are editing a reply
        // if (parentCommentId) {
        //     setEditMode(false);
        //     return;
        // }

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

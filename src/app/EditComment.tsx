import { useState } from "react";
import { useCommentStore } from "./store/commentStore";

interface Props {
    commentId: number;
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
    oldComment: string;
    parentCommentId?: number;
}

const EditComment = (
    { commentId, setEditMode, oldComment, parentCommentId }: Props
) => {


    const [comment, setComment] = useState(oldComment);

    const editComment = useCommentStore((state) => state.updateComment);
    const editReply = useCommentStore((state) => state.updateReply);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // if parentCommentId is defined, then we are editing a reply
        if (parentCommentId) {
            editReply(parentCommentId, commentId, comment);
            setEditMode(false);
            return;
        }
        editComment(commentId, comment);
        setEditMode(false);
    };

    return (
        <div className="bg-white rounded-lg w-full mt-4 mx-auto text-grayish-blue pb-6">
                            <form
                    onSubmit={handleSubmit}
                    className="flex gap-3 flex-col items-end"
                >
                    <input
                        placeholder="Add a comment..."
                        className="rounded-md pl-4 w-full h-24 border-2 border-light-gray bg-white"
                        onChange={handleChange}
                        value={comment}
                        type="text"
                        name="comment"
                        id=""
                    />
                    <div className="flex flex-col gap-1">
                        <button
                            className="hover:opacity-70 transition-all px-2 py-2 text-white bg-moderated-blue rounded-md"
                            type="submit"
                        >
                            UPDATE
                        </button>
                    </div>
                </form>
        </div>
    );
};

export default EditComment;

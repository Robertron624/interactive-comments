import React from "react";
import cn from "classnames";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { Comment } from "../types";
import { toast } from "react-toastify";

interface Props {
    commentId: string;
    setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isDeleteModalOpen: boolean;
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

const RemoveCommentModal = (
    { commentId, setIsDeleteModalOpen, isDeleteModalOpen, parentCommentId, replyId, commentObject }: Props
) => {

    const handleRemove = async() => {
        
        // If there is a parentCommentId, it's a reply, so we need to remove the reply from the replies array of the parent comment
        if(replyId && parentCommentId) {
            // Seach for parent comment in firebase
            const docRef = doc(db, "comments", parentCommentId);

            try {
                // Remove reply from replies array of parent comment, it has to be removed as an object since the arrayRemove method will search for the exact object in the array and remove it
                await updateDoc(docRef, {
                    replies: arrayRemove({
                        content: commentObject?.content,
                        createdAt: commentObject?.createdAt,
                        replyId: replyId,
                        replies: commentObject?.replies,
                        score: commentObject?.score,
                        owner: commentObject?.owner,
                    })
                })
            }
            catch (error) {
                console.error("Error removing document: ", error);
            }
        }
        else {
            const docRef = doc(db, "comments", commentId);
            try {
                await deleteDoc(docRef);
            }
            catch (error) {
                console.error("Error removing document: ", error);
            }
        }
        toast.success("Comment removed successfully", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
        })
        setIsDeleteModalOpen(!isDeleteModalOpen);
    };

    const handleCancel = () => {
        setIsDeleteModalOpen(!isDeleteModalOpen);
    };

    const modalClass = cn({
        'modal modal-bottom sm:modal-center': true,
        'modal-open': isDeleteModalOpen,
    })

    return (
        <div className={`${modalClass} items-center`}>
            <div className="modal-box fixed left-0 right-0 bg-white rounded-lg w-80 mx-auto text-grayish-blue p-6">
                <h2 className="text-lg font-bold  mb-6">Delete comment</h2>
                <p className="text-sm">
                    Are you sure you want to delete this comment? This will
                    remove the coment and cannot be undone.
                </p>
                <div className="buttons flex gap-2 w-full mt-4">
                    <button onClick={handleCancel} className="cancel w-32 py-1 rounded-md text-white bg-grayish-blue">NO, CANCEL</button>
                    <button onClick={handleRemove} className="delete rounded-md bg-soft-red text-white w-32 py-1">
                        YES, DELETE
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RemoveCommentModal;

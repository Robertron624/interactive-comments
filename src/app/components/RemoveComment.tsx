import React from "react";
import cn from "classnames";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/utils/firebase";

interface Props {
    commentId: string;
    setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isDeleteModalOpen: boolean;
    parentCommentId?: number;
}

const RemoveCommentModal = (
    { commentId, setIsDeleteModalOpen, isDeleteModalOpen, parentCommentId }: Props
) => {
    const handleRemove = async() => {
        const docRef = doc(db, "comments", commentId);
        await deleteDoc(docRef);
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

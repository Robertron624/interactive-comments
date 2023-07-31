"use client";
import { useState } from "react";
import Image from "next/image";
import { Owner, Comment } from "../types";
import { useCommentStore } from "../store/commentStore";

import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/utils/firebase";


interface Props {
    profileImageUrl: string | null;
    username: Owner["username"] | null;
    parentCommentId?: number;
    parentCommentUsername?: string;
    setAddReplyMode?: React.Dispatch<React.SetStateAction<boolean>>;
    isReply?: boolean;
    originalCommentId?: number;
}

const AddComment = ({
    profileImageUrl,
    username,
    parentCommentId,
    parentCommentUsername,
    setAddReplyMode,
    isReply,
    originalCommentId,
}: Props) => {
    const [comment, setComment] = useState("");

    const addComment = useCommentStore((state) => state.addComment);
    const addReply = useCommentStore((state) => state.addReply);

    const addReplyToReply = useCommentStore((state) => state.addReplyToReply);

    const comments = useCommentStore((state) => state.comments);
    

    // firebase auth

    const [user, loading] = useAuthState(auth);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Check if comment is empty

        if (!comment) {
            alert("Comment cannot be empty") 
            return;
        }

        const collectionRef = collection(db, "comments");

        // Get length of comments array and its replies
        const commentsLength =
            comments.length +
            comments.reduce((acc, comment) => acc + comment.replies.length, 0);

        // new date in format YYYY-MM-DD-T-HH-MM-SS
        const date = new Date().toISOString()

        const commentToAdd = {
            owner: {
                username: user?.displayName,
                profileImageUrl: user?.photoURL,
            },
            content: comment,
            score: 0,
            createdAt: date,
            replies: [],
        };

        await addDoc(collectionRef, commentToAdd);

        setComment("");

        alert("Comment added successfully")

        // if (parentCommentId && setAddReplyMode) {
        //     // Add replyingTo

        //     commentToAdd.replyingTo = parentCommentUsername;

        //     if (isReply && originalCommentId) {
        //         commentToAdd.parentCommentId = originalCommentId;
        //         addReplyToReply(originalCommentId, commentToAdd);
        //     } else {
        //         // Add parent comment id to commentToAdd
        //         commentToAdd.parentCommentId = parentCommentId;
        //         addReply(parentCommentId, commentToAdd);
        //     }
        //     setAddReplyMode(false);
        // } else {
        //     // Is an original comment
        //     addComment(commentToAdd);
        // }
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
    };

    const handleCancel = () => {
        setComment("");

        if (parentCommentId && setAddReplyMode) setAddReplyMode(false);
    };

    return (
        <div className={`bg-white rounded-lg  md:w-144 mt-4 mx-auto text-grayish-blue p-6 ${setAddReplyMode ? 'w-[21rem]' : 'w-[22rem]'}`}>
            <div className={`h-full flex gap-4 justify-center`}>
                <div className="hidden md:block flex-none">
                    <Image
                        src={profileImageUrl || "/images/user.svg"}
                        alt={`${user?.displayName}'s profile picture`}
                        width={20}
                        height={20}
                        className="w-8 h-8 rounded-full"
                    />
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col md:flex-row gap-3 items-start w-full"
                >
                    <textarea
                        placeholder="Add a comment..."
                        className="rounded-md pl-4 w-full md:w-96 h-24 border-2 border-light-gray bg-white"
                        onChange={handleChange}
                        name="comment"
                        value={comment}
                    />
                    <div className="flex flex-row justify-between md:flex-col gap-1 w-full md:w-auto">
                    <Image
                        src={profileImageUrl || "/images/user.svg"}
                        alt={`${user?.displayName}'s profile picture`}
                        width={20}
                        height={20}
                        className="w-8 h-8 rounded-full md:hidden"
                    />
                    <div className="flex gap-2">
                        <button
                            className="hover:opacity-70 transition-all w-[5rem] py-2     text-white bg-moderated-blue rounded-md"
                            type="submit"
                        >
                            {parentCommentId ? "REPLY" : "SEND"}
                        </button>

                        {parentCommentId && setAddReplyMode && (
                            <button
                                onClick={handleCancel}
                                className="px-2 py-1 text-white bg-soft-red rounded-md"
                                type="button"
                            >
                                CANCEL
                            </button>
                        )}
                    </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddComment;

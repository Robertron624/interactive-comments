"use client";
import { useState } from "react";
import Image from "next/image";
import { Owner, Comment } from "./types";
import { useCommentStore } from "./store/commentStore";

const AddComment = ({ username, profileImageUrl }: Owner) => {
    const [comment, setComment] = useState("");

    const addComment = useCommentStore((state) => state.addComment);
    
    const comments = useCommentStore((state) => state.comments);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const commentToAdd: Comment = {
            id: 99,
            owner: {
                username,
                profileImageUrl,
            },
            content: comment,
            score: 0,
            createdAt: 'a few seconds ago',
            replies: [],
        };

        addComment(commentToAdd);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value);
    };

    return (
        <div className="bg-white rounded-lg w-144 mt-4 mx-auto text-grayish-blue p-6">
            <div className="h-full flex gap-4 justify-center">
                <div>
                    <Image
                        src={profileImageUrl.png}
                        alt={`${username}'s profile picture`}
                        width={20}
                        height={20}
                        className="w-8 h-8 rounded-full"
                    />
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="flex gap-3 items-start"
                >
                    <input
                        placeholder="Add a comment..."
                        className="rounded-md pl-4 w-96 h-24 border-2 border-light-gray"
                        onChange={handleChange}
                        type="text"
                        name="comment"
                        id=""
                    />
                    <button
                        className="px-2 py-1 text-white bg-moderated-blue rounded-md"
                        type="submit"
                    >
                        SEND
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddComment;

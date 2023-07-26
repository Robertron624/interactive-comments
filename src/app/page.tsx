"use client";
import { useCommentStore } from "./store/commentStore";
import { useState, useEffect } from "react";
import Comment from "./components/Comment";
import AddComment from "./components/AddComment";
import { Comment as CommentType } from "./types";

import { db, auth } from "@/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import GoogleLogin from "./components/GoogleLogin";

const currentUser = {
    profileImageUrl: {
        png: "/avatars/image-juliusomo.png",
        webp: "/avatars/image-juliusomo.webp",
    },
    username: "juliusomo",
};

export default function Home() {
    const [user, loading] = useAuthState(auth);

    const comments = useCommentStore((state) => state.comments);

    const setAllComments = useCommentStore((state) => state.setAllComments);

    const [myComments, setMyComments] = useState<CommentType[]>(comments);

    // Save comments to local storage when user leaves page
    useEffect(() => {
        window.addEventListener("beforeunload", () => {
            localStorage.setItem("comments", JSON.stringify(comments));
        });
    }, [comments]);

    // Get comments from local storage if they exist
    useEffect(() => {
        const comments = localStorage.getItem("comments");
        if (comments) {
            setAllComments(JSON.parse(comments));
        }
    }, [setAllComments]);

    // Re render when comments in store changes
    useEffect(() => {
        setMyComments(comments);
    }, [comments]);

    return (
        <main className="py-6 flex min-h-screen flex-col items-center">
            <h1 className="sr-only">Interactive Comments</h1>
            <div className="comments flex flex-col gap-6 max-w-[22rem] md:max-w-xl mx-auto">
                {myComments.map((comment: CommentType) => (
                    <Comment key={comment.id} {...comment} />
                ))}
            </div>
            {user ? (
                <AddComment
                    profileImageUrl={currentUser.profileImageUrl}
                    username={currentUser.username}
                />
            ): <GoogleLogin />}
        </main>
    );
}

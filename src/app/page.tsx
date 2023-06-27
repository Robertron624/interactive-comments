"use client"
import { useCommentStore } from "./store/commentStore";
import { useState, useEffect } from "react";
import Comment from "./Comment";
import AddComment from "./AddComment";
import { Comment as CommentType } from "./types";
// import { comments } from "./mockData";

const currentUser = {
    profileImageUrl: {
        png: "/avatars/image-juliusomo.png",
        webp: "/avatars/image-juliusomo.webp",
    },
    username: "juliusomo",
};

export default function Home() {

    const comments = useCommentStore(state => state.comments);

    const [myComments, setMyComments] = useState<CommentType[]>(comments);

    // Re render when comments in store changes
    useEffect(() => {
        setMyComments(comments);
    }, [comments]);

    return (
        <main className="my-6 flex min-h-screen flex-col items-center justify-between">
            <div className="comments flex flex-col gap-6 max-w-xl mx-auto">
                {myComments.map((comment: CommentType) => (
                    <Comment key={comment.id} {...comment} />
                ))}
            </div>
            <AddComment
                profileImageUrl={currentUser.profileImageUrl}
                username={currentUser.username}
            />
        </main>
    );
}

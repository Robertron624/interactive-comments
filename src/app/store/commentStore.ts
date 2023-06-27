import { create } from "zustand";
import { Comment } from "../types";
import { comments } from "../mockData";

interface CommentState {
    comments: Comment[];
    addComment: (comment: Comment) => void;
    removeComment: (commentId: number) => void;
    removeAllComments: () => void;
    removeReply: (commentId: number, replyId: number) => void;
    updateComment: (commentId: number, content: string) => void;
    upVoteComment: (commentId: number) => void;
    upVoteReply: (commentId: number, replyId: number) => void;
    downVoteComment: (commentId: number) => void;
    downVoteReply: (commentId: number, replyId: number) => void;
}

export const useCommentStore = create<CommentState>()((set) => ({
    comments: comments,
    addComment: (comment: Comment) =>
        set((state: { comments: Comment[] }) => ({
            comments: [...state.comments, comment],
        })),
    removeComment: (commentId: number) =>
        set((state: { comments: Comment[] }) => ({
            comments: state.comments.filter((c) => c.id !== commentId),
        })),
    removeReply: (commentId: number, replyId: number) =>
        set((state: { comments: Comment[] }) => ({
            comments: state.comments.map((c) => {
                if (c.id === commentId) {
                    return {
                        ...c,
                        replies: c.replies.filter((r) => r.id !== replyId),
                    };
                }
                return c;
            }),
        })),
    removeAllComments: () => set({ comments: [] }),
    updateComment: (commentId: number, content: string) =>
        set((state: { comments: Comment[] }) => ({
            comments: state.comments.map((c) => {
                if (c.id === commentId) {
                    return { ...c, content: content };
                }
                return c;
            }),
        })),
    upVoteComment: (commentId: number) =>
        set((state: { comments: Comment[] }) => ({
            comments: state.comments.map((c) => {
                if (c.id === commentId) {
                    return { ...c, score: c.score + 1 };
                }
                return c;
            }
            ),
        })),
    upVoteReply: (commentId: number, replyId: number) =>
        set((state: { comments: Comment[] }) => ({
            comments: state.comments.map((c) => {
                if (c.id === commentId) {
                    return {
                        ...c,
                        replies: c.replies.map((r) => {
                            if (r.id === replyId) {
                                return { ...r, score: r.score + 1 };
                            }
                            return r;
                        }),
                    };
                }
                return c;
            }
            ),
        })),
    downVoteComment: (commentId: number) =>
        set((state: { comments: Comment[] }) => ({
            comments: state.comments.map((c) => {
                if (c.id === commentId) {
                    return { ...c, score: c.score - 1 };
                }
                return c;
            }
            ),
        })),
    downVoteReply: (commentId: number, replyId: number) =>
        set((state: { comments: Comment[] }) => ({
            comments: state.comments.map((c) => {
                if (c.id === commentId) {
                    return {
                        ...c,
                        replies: c.replies.map((r) => {
                            if (r.id === replyId) {
                                return { ...r, score: r.score - 1 };
                            }
                            return r;
                        }),
                    };
                }
                return c;
            }
            ),
        })),
}));

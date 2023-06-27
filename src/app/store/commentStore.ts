import { create } from "zustand";
import { Comment } from "../types";
import { comments } from "../mockData";

interface CommentState {
    comments: Comment[];
    addComment: (comment: Comment) => void;
    removeComment: (commentId: number) => void;
    removeAllComments: () => void;
    updateComment: (commentId: number, content: string) => void;
    upVoteComment: (commentId: number) => void;
    downVoteComment: (commentId: number) => void;
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
}));

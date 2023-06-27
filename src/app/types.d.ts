export interface Comment {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    owner: Owner;
    replyingTo?: string;
    parentCommentId?: number;
    replies: Comment[];
}

export interface Owner {
    username: string;
    profileImageUrl: {
        png: string;
        webp: string;
    };
}
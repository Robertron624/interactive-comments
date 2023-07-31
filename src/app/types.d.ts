export interface Comment {
    id: string;
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
    profileImageUrl: string;
}
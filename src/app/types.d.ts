export interface Comment {
    id: string;
    content: string;
    createdAt: string;
    score: number;
    owner: Owner;
    replyingTo?: string;
    replyId?: string;
    parentCommentId?: string;
    replies: Comment[];
}

export interface Owner {
    username: string;
    profileImageUrl: string;
}
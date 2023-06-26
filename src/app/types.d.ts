export interface Comment {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    owner: Owner;
    replyingTo?: string;
    replies: Comment[];
}

export interface Owner {
    username: string;
    profileImageUrl: {
        png: string;
        webp: string;
    };
}
export interface Comment {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    owner: Owner;
    replies: Reply[];
}

interface Reply {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    owner: Owner;
    replyingTo: string;
}

interface Owner {
    username: string;
    profileImageUrl: {
        png: string;
        webp: string;
    };
}
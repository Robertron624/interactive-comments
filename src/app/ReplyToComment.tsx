import AddComment from "@/app/AddComment";

interface Props {
    addReplyMode: boolean;
    setAddReplyMode: React.Dispatch<React.SetStateAction<boolean>>;
    parentCommentId?: number;
    originalCommentId?: number;
    parentCommentUsername?: string;
    isReply: boolean;
}

const currentUser = {
    profileImageUrl: {
        png: "/avatars/image-juliusomo.png",
        webp: "/avatars/image-juliusomo.webp",
    },
    username: "juliusomo",
};


const ReplyToComment = (
    { addReplyMode, parentCommentId, setAddReplyMode, parentCommentUsername, isReply, originalCommentId}: Props
) => {

  return (
    <div className={`items-center`}>
    <div className={`left-0 right-0 bg-white ${isReply ? 'w-auto': 'w-fit'} rounded-lg mx-auto text-grayish-blue p-0 md:p-6`}>
        <AddComment
            profileImageUrl={currentUser.profileImageUrl}
            username={currentUser.username}
            parentCommentId={parentCommentId}
            parentCommentUsername={parentCommentUsername}
            setAddReplyMode={setAddReplyMode}
            isReply={isReply}
            originalCommentId={originalCommentId}
        />
    </div>
</div>
  )
}

export default ReplyToComment
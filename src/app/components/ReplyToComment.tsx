import AddComment from "@/app/components/AddComment";

interface Props {
    addReplyMode: boolean;
    setAddReplyMode: React.Dispatch<React.SetStateAction<boolean>>;
    parentCommentId?: string;
    originalCommentId?: string;
    parentCommentUsername?: string;
    isReply: boolean;
}

const ReplyToComment = (
    { parentCommentId, setAddReplyMode, isReply, originalCommentId}: Props
) => {

  return (
    <div className={`items-center`}>
    <div className={`left-0 right-0 bg-white ${isReply ? 'w-auto': 'w-fit'} rounded-lg mx-auto text-grayish-blue p-0 md:p-6`}>
        <AddComment
            parentCommentId={parentCommentId}
            setAddReplyMode={setAddReplyMode}
            originalCommentId={originalCommentId}
        />
    </div>
</div>
  )
}

export default ReplyToComment
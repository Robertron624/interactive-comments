import cn from "classnames";
import AddComment from "@/app/AddComment";

interface Props {
    setIsReplyModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isReplyModalOpen: boolean;
    parentCommentId?: number;
}

const currentUser = {
    profileImageUrl: {
        png: "/avatars/image-juliusomo.png",
        webp: "/avatars/image-juliusomo.webp",
    },
    username: "juliusomo",
};


const ReplyToComment = (
    {setIsReplyModalOpen, isReplyModalOpen, parentCommentId }: Props
) => {

    const modalClass = cn({
        'modal modal-bottom sm:modal-center': true,
        'modal-open': isReplyModalOpen,
    })

  return (
    <div className={`${modalClass} items-center`}>
    <div className="modal-box fixed left-0 right-0 bg-white w-fit rounded-lg mx-auto text-grayish-blue p-6">
        <AddComment
            profileImageUrl={currentUser.profileImageUrl}
            username={currentUser.username}
            parentCommentId={parentCommentId}
            setIsReplyModalOpen={setIsReplyModalOpen}
        />
    </div>
</div>
  )
}

export default ReplyToComment
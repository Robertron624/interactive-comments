"use client";

import { Comment } from "./types";
import { useState } from "react";
import Image from "next/image";
import { useCommentStore } from "./store/commentStore";
import RemoveCommentModal from "./RemoveComment";
import ReplyToComment from "./ReplyToComment";
import EditComment from "./EditComment";

const Comment = ({
    id,
    owner,
    content,
    createdAt,
    replies,
    score,
    replyingTo,
    parentCommentId,
}: Comment) => {
    const isReply = replyingTo !== undefined;

    const isCurrentUser = owner.username === "juliusomo";

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    // const [isReplyModalOpen, setIsReplyModalOpen] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [addReplyMode, setAddReplyMode] = useState<boolean>(false);

    const handleDelete = () => {
        setIsDeleteModalOpen(!isDeleteModalOpen);
    };

    //TODO
    const updateComment = useCommentStore((state) => state.updateComment);
    const handleEdit = () => {
        updateComment(id, "This is the updated comment");
    };

    const upVoteComment = useCommentStore((state) => state.upVoteComment);
    const upVoteReply = useCommentStore((state) => state.upVoteReply);
    const handleUpvote = () => {
        if (parentCommentId) {
            upVoteReply(parentCommentId, id);
        } else {
            upVoteComment(id);
        }
    };

    const downVoteComment = useCommentStore((state) => state.downVoteComment);
    const downVoteReply = useCommentStore((state) => state.downVoteReply);
    const handleDownvote = () => {
        if (parentCommentId) {
            downVoteReply(parentCommentId, id);
        } else {
            downVoteComment(id);
        }
    };

    const handleReply = () => {
        setAddReplyMode(!addReplyMode);
    };

    return (
        <div>
            <div className="bg-white rounded-lg w-500 text-grayish-blue p-6">
                {/* Main comment */}
                <div className="h-full flex gap-4">
                    {/*score and plus minus buttons*/}
                    <div className="h-24 rounded-lg px-1 py-3 flex items-center gap-2 flex-col bg-light-gray">
                        <button
                            onClick={handleUpvote}
                            className="hover:text-moderated-blue transition-all w-6 h-6 font-bold flex justify-center items-center"
                        >
                            <svg
                                width="11"
                                height="11"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                                    fill="currentcolor"
                                />
                            </svg>
                        </button>
                        <span className="text-xl font-bold text-moderated-blue">
                            {score}
                        </span>
                        <button
                            onClick={handleDownvote}
                            className="hover:text-moderated-blue transition-all w-6 h-6 font-bold flex justify-center items-center"
                        >
                            <svg
                                width="11"
                                height="3"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
                                    fill="currentcolor"
                                />
                            </svg>
                        </button>
                    </div>
                    {/*comment content and info*/}
                    <div className="flex flex-col gap-4 w-11/12">
                        {/* Comment top */}
                        <div className="flex justify-between">
                            <div className="flex gap-4 items-center">
                                <Image
                                    width={20}
                                    height={20}
                                    className="w-8 h-8 rounded-full"
                                    src={owner.profileImageUrl.png}
                                    alt={`${owner.username}'s profile image`}
                                />
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-1">
                                        <span className="text-sm font-bold text-dark-blue">
                                            {owner.username}
                                            {isCurrentUser && (
                                                <span className="text-xs bg-moderated-blue text-white font-bold ml-2 px-2 py-1">
                                                    you
                                                </span>
                                            )}
                                        </span>
                                        <span className="text-sm text-grayish-blue">
                                            {createdAt}
                                        </span>
                                    </div>{" "}
                                </div>
                            </div>
                            {/* Comment edit/delete if its current user, if not a reply btn */}
                            {isCurrentUser ? (
                                <div className="flex gap-3">
                                    <RemoveCommentModal
                                        commentId={id}
                                        setIsDeleteModalOpen={
                                            setIsDeleteModalOpen
                                        }
                                        isDeleteModalOpen={isDeleteModalOpen}
                                        parentCommentId={parentCommentId}
                                    />
                                    <button
                                        onClick={handleDelete}
                                        className="hover:opacity-70 transition-all text-sm text-soft-red font-bold flex items-center gap-2"
                                    >
                                        <svg
                                            width="12"
                                            height="14"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
                                                fill="currentcolor"
                                            />
                                        </svg>
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => setEditMode(true)}
                                        className="hover:opacity-70 transition-all text-sm text-moderated-blue font-bold flex items-center gap-2"
                                    >
                                        <svg
                                            width="14"
                                            height="14"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
                                                fill="currentcolor"
                                            />
                                        </svg>
                                        Edit
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <button
                                        onClick={handleReply}
                                        className="hover:opacity-70 transition-all transit text-sm text-moderated-blue font-bold flex items-center gap-2"
                                    >
                                        <svg
                                            width="14"
                                            height="13"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
                                                fill="#5357B6"
                                            />
                                        </svg>
                                        Reply
                                    </button>
                                </div>
                            )}
                        </div>
                        {/* Comment content */}
                        <div className="text-sm text-dark-grayish-blue">
                            {isReply ? (
                                <span>
                                    <span className="font-bold text-moderated-blue mr-1">
                                        @{replyingTo}
                                    </span>
                                </span>
                            ) : null}
                            {editMode ? (
                                <EditComment
                                    commentId={id}
                                    setEditMode={setEditMode}
                                    oldComment={content}
                                    parentCommentId={parentCommentId}
                                />
                            ) : (
                                content
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* show reply component if addReply mode is true and there are not replies */}
            {addReplyMode && replies.length === 0 && (
                    <div className="flex flex-col gap-4 mt-4 ml-7 pl-7 border-l-2 border-light-gray">
                        <ReplyToComment
                            setAddReplyMode={setAddReplyMode}
                            addReplyMode={addReplyMode}
                            parentCommentId={id}
                        />
                </div>
            )}


            {/* Replies section if there is any */}
            {replies.length > 0 && (
                <div className="flex">
                    <div className="flex flex-col gap-4 mt-4 ml-7 pl-7 border-l-2 border-light-gray">
                        {/* Add adding comment section if addReplyMode is true */}
                        {addReplyMode && (
                            <ReplyToComment
                                setAddReplyMode={setAddReplyMode}
                                addReplyMode={addReplyMode}
                                parentCommentId={id}
                            />
                        )}
                        {replies.map((reply: Comment) => (
                            <Comment key={reply.id} {...reply} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Comment;

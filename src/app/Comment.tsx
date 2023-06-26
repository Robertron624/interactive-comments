import { Comment } from "./types";
import Image from "next/image";

const Comment = ({
    id,
    owner,
    content,
    createdAt,
    replies,
    score,
}: Comment) => {
    return (
        <div className="bg-white rounded-lg w-500 text-grayish-blue p-6">
            <div className="h-full flex gap-4">
                {/*score and plus minus buttons*/}
                <div className="h-24 rounded-lg px-1 py-3 flex items-center gap-2 flex-col bg-light-gray">
                    <button className="w-6 h-6 font-bold flex justify-center items-center">
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
                    <button className="w-6 h-6 font-bold flex justify-center items-center">
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
                <div className="flex flex-col gap-4">
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
                                </span>
                                <span className="text-sm text-grayish-blue">
                                    {createdAt}
                                </span>
                            </div>{" "}
                        </div>
                      </div>
                      {/* Comment reply button */}
                      <button className="text-sm text-moderated-blue font-bold flex items-center gap-2">
                      <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/></svg>
                        Reply
                      </button>
                    </div>
                    {/* Comment content */}
                    <div className="text-sm text-dark-grayish-blue">
                        {content}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comment;

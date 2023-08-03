import { useState } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

import { addDoc, collection, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/utils/firebase";

import { toast } from "react-toastify";


interface Props {
    parentCommentId?: string;
    setAddReplyMode?: React.Dispatch<React.SetStateAction<boolean>>;
    originalCommentId?: string;
}

const AddComment = ({
    parentCommentId,
    setAddReplyMode,
    originalCommentId,
}: Props) => {
    const [comment, setComment] = useState("");
    

    // firebase auth

    const [user, loading] = useAuthState(auth);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Check if comment is empty

        if (!comment) {
            toast.error("Comment cannot be empty", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            })
            return;
        }

        const collectionRef = collection(db, "comments");

        // new date in format YYYY-MM-DD-T-HH-MM-SS
        const date = new Date().toISOString()

        // If parentCommentId exists, it's a reply and as such, add the reply to comment replies array
        if(parentCommentId) {

            let commentToAdd = {
                replyId: uuidv4(),
                owner: {
                    username: user?.displayName,
                    profileImageUrl: user?.photoURL,
                },
                content: comment,
                score: 0,
                createdAt: date,
                replies: [],
            };

            // Add unique id to reply, this will be used to identify the reply in the UI, and also to identify the reply in the database since the reply will be stored in the replies array of the parent comment as a string

            // Search for parent comment in comments array
        
            const docRef = doc(db, "comments", parentCommentId);

            // Add reply to replies array
            try {
                // Add reply to replies array leaving the old replies array intact
                await updateDoc(docRef, {
                    replies: arrayUnion(commentToAdd)
                });
                
            }
            catch(err) {
                console.error(err)
            }
            finally {
                if (setAddReplyMode) setAddReplyMode(false);
            }
        }
        else {
            let commentToAdd = {
                owner: {
                    username: user?.displayName,
                    profileImageUrl: user?.photoURL,
                },
                content: comment,
                score: 0,
                createdAt: date,
                replies: [],
            };
            try{
                await addDoc(collectionRef, commentToAdd);
            }
            catch(err) {
                console.error(err)
            }
        }
        setComment("");

        toast.success("Comment added successfully", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
        })
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
    };

    const handleCancel = () => {
        setComment("");

        if (parentCommentId && setAddReplyMode) setAddReplyMode(false);
    };

    return (
        <div className={`bg-white rounded-lg mt-4 mx-auto text-grayish-blue p-6 ${parentCommentId ? 'w-[21rem] md:w-[29.5rem]' : 'w-[22rem] md:w-144'}`}>
            <div className={`h-full flex gap-4 justify-center`}>
                <div className="hidden md:block flex-none">
                    <Image
                        src={user?.photoURL || "/images/user.svg"}
                        alt={`${user?.displayName}'s profile picture`}
                        width={20}
                        height={20}
                        className="w-8 h-8 rounded-full"
                    />
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col md:flex-row gap-3 items-start w-full"
                >
                    <textarea
                        placeholder="Add a comment..."
                        className="rounded-md pl-4 w-full md:w-96 h-24 border-2 border-light-gray bg-white"
                        onChange={handleChange}
                        name="comment"
                        value={comment}
                    />
                    <div className="flex flex-row justify-between md:flex-col gap-1 w-full md:w-auto">
                    <Image
                        src={user?.photoURL || "/images/user.svg"}
                        alt={`${user?.displayName}'s profile picture`}
                        width={20}
                        height={20}
                        className="w-8 h-8 rounded-full md:hidden"
                    />
                    <div className="flex gap-2 flex-col">
                        <button
                            className="hover:opacity-70 transition-all w-[5rem] py-2     text-white bg-moderated-blue rounded-md"
                            type="submit"
                        >
                            {parentCommentId ? "REPLY" : "SEND"}
                        </button>

                        {parentCommentId && setAddReplyMode && (
                            <button
                                onClick={handleCancel}
                                className="px-2 py-1 text-white bg-soft-red rounded-md"
                                type="button"
                            >
                                CANCEL
                            </button>
                        )}
                    </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddComment;

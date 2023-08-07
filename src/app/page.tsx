"use client";
import { useState, useEffect } from "react";
import Comment from "./components/Comment";
import AddComment from "./components/AddComment";
import { Comment as CommentType } from "./types";

import { db, auth } from "@/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

import GoogleLogin from "./components/GoogleLogin";
import RootLayout from "./layout";
import Header from "@/Header";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import { NextSeo } from 'next-seo';

export default function Home() {
    const [user, loading] = useAuthState(auth);

    const [myComments, setMyComments] = useState<CommentType[]>([]);

    // Get comments from firestore

    const getCommentsFromFirestore = async () => {
        const collectionRef = collection(db, "comments");
        const q = query(collectionRef, orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {

            const comments = querySnapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data(),
                } as CommentType;
            });

            setMyComments(comments);
        });

        return unsubscribe;
    };

    useEffect(() => {
        getCommentsFromFirestore();
    }, []);

    return (
        <RootLayout>
            <NextSeo
                title="Interactive Comments Section"
                description="A simple comment system built with Next.js, Firebase and Tailwind CSS"
                canonical="https://fullstack-version--melodic-lamington-1297e9.netlify.app/"
                openGraph={{
                    url: 'https://fullstack-version--melodic-lamington-1297e9.netlify.app/',
                    title: 'Interactive Comments Section',
                    description: 'A simple comment system built with Next.js, Firebase and Tailwind CSS',
                }}
            />
    
            <ToastContainer limit={1}/>
            <Header />
            <main className="py-6 flex min-h-screen flex-col items-center">
                <h1 className="sr-only">Interactive Comments</h1>
                <div className="comments flex flex-col gap-6 w-[22rem] md:w-[36rem] mx-auto mb-8">
                    {myComments.map((comment: CommentType) => {
                        return <Comment key={comment.id} {...comment} />;
                    })}
                </div>
                {user ? (
                    <AddComment
                    />
                ) : (
                    <GoogleLogin />
                )}
            </main>
        </RootLayout>
    );
}
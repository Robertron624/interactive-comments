import Image from 'next/image';
import Comment from './Comment';
import { Comment as CommentType } from './types';
import { comments } from './mockData';


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="comments flex flex-col gap-6 max-w-xl mx-auto">
        {comments.map((comment: CommentType) => (
          <Comment key={comment.id} {...comment} />
        ))}
      </div>
    </main>
  )
}
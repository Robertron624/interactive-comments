import { Comment } from "./types"

const Comment = ({id, owner, content, createdAt, replies, score}:Comment) => {
  return (
    <div className="bg-white w-500 text-grayish-blue">Comment</div>
  )
}

export default Comment
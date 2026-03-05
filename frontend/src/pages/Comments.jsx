import { useState, useEffect } from "react";
import Axios from "../utils/axiox.utils";
import Comment from "../components/Comment";

const Comments = ({ postId, refresh }) => {
  const [commentData, setCommentData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);

        const { data } = await Axios.get(`/comment/${postId}`);

        if (!data.status) {
          alert(data.message);
          return;
        }
        setCommentData(data.data || []);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchComments();
    }
  }, [postId, refresh]);

  if (loading) {
    return <div className="mt-4 text-center">Loading comments...</div>;
  }

  if (!commentData.length) {
    return (
      <div className="mt-4 text-center text-zinc-500">No comments yet.</div>
    );
  }

  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {commentData.map((comment) => (
        <Comment key={comment.commentId} comment={comment} />
      ))}
    </div>
  );
};

export default Comments;

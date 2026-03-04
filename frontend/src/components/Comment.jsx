import PersonIcon from "@mui/icons-material/Person";

const Comment = ({ comment }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition duration-300 border border-zinc-200">
      {/* Top Section */}
      <div className="flex items-center gap-3 mb-2">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
          <PersonIcon fontSize="small" />
        </div>

        {/* User Info */}
        <div className="flex flex-col">
          <span className="font-semibold text-zinc-800 capitalize">
            {comment?.User?.name || "Anonymous"}
          </span>
          <span className="text-xs text-zinc-500">
            {new Date(comment.createdAt).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Comment Text */}
      <div className="text-zinc-700 text-sm leading-relaxed">
        {comment.comment}
      </div>
    </div>
  );
};

export default Comment;

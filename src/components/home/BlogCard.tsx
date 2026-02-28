import { Link } from "react-router-dom";
import { type Blog } from "../../stores/useBlogStore";

interface BlogCardProps {
  post: Blog;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <Link
      to={`/feeds/${post.objectId}`}
      key={post.objectId}
      className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all"
    >
      <div className="card-body">
        {/* Meta: Date & Category */}
        <div className="flex gap-2">
          <div className="badge badge-secondary badge-outline text-xs">
            {new Date(post.publishedDate).toLocaleDateString("id-ID")}
          </div>
          <div className="badge badge-ghost text-xs">Article</div>
        </div>

        {/* Body: Title & Excerpt */}
        <h2 className="card-title text-2xl mt-2 hover:text-primary cursor-pointer">
          {post.title}
        </h2>
        <p className="text-sm text-base-content/60 line-clamp-3 my-2">
          {post.content}
        </p>

        {/* Footer: Author & Link */}
        <div className="card-actions justify-between items-center mt-4 border-t border-base-200 pt-4">
          <span className="text-xs font-semibold opacity-70">
            By {post.author}
          </span>
          <button className="btn btn-primary btn-sm btn-ghost normal-case group">
            Read Detail{" "}
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;

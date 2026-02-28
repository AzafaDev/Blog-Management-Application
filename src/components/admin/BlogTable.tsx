import { Calendar, Edit3, Trash2, User } from "lucide-react";
import type { Blog } from "../../stores/useBlogStore";

interface BlogTableProps {
  currentPosts: Blog[];
  OpenModal: (modal: string, post: Blog) => void;
}

const BlogTable = ({ currentPosts, OpenModal }: BlogTableProps) => {
  return (
    <table className="table table-lg w-full">
      <thead className="bg-gray-50/50">
        <tr className="text-gray-400 uppercase text-[11px] font-black tracking-widest">
          <th className="py-6 pl-8">Blog Details</th>
          <th>Author</th>
          <th>Published Date</th>
          <th className="text-center pr-8">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-50">
        {currentPosts.map((post: Blog) => (
          <tr
            key={post.objectId}
            className="hover:bg-indigo-50/30 transition-colors group"
          >
            <td className="py-6 pl-8">
              <div className="font-bold text-gray-800 text-lg group-hover:text-indigo-600">
                {post.title}
              </div>
              <div className="text-xs text-gray-400 mt-1 line-clamp-1 max-w-xs">
                {post.content.slice(0, 50)}...
              </div>
            </td>
            <td>
              <div className="flex items-center gap-2 font-medium text-gray-600">
                <User size={14} className="text-indigo-600" />
                {post.author}
              </div>
            </td>
            <td>
              <div className="flex items-center gap-2 text-gray-500">
                <Calendar size={14} />
                {new Date(post.publishedDate).toLocaleDateString("id-ID")}
              </div>
            </td>
            <td className="pr-8 text-center">
              <div className="flex justify-center gap-2">
                <button
                  className="text-indigo-500"
                  onClick={() => OpenModal("edit_modal", post)}
                >
                  <Edit3 size={18} />
                </button>
                <button
                  className="text-red-500"
                  onClick={() => OpenModal("delete_modal", post)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BlogTable;

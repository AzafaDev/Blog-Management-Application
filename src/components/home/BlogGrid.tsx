import BlogCard from "./BlogCard";
import type { Blog } from "../../stores/useBlogStore";

interface BlogGridProps {
  filteredBlogs: Blog[];
}

const BlogGrid = ({ filteredBlogs }: BlogGridProps) => {
  return (
    <main className="max-w-7xl mx-auto px-4 md:px-6 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {filteredBlogs?.map((post) => (
          <BlogCard post={post} key={post.objectId}/>
        ))}
      </div>
    </main>
  );
};

export default BlogGrid;

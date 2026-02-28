import { useEffect, useState } from "react";
import { useBlogStore } from "../../stores/useBlogStore";
import SearchBar from "../../components/admin/SearchBar";
import BlogGrid from "../../components/home/BlogGrid";

const HomePage = () => {
  // --- 1. DATA & SEARCH STATE ---
  const { currentBlogs, fetchBlogs } = useBlogStore();
  const [searchQuery, setSearchQuery] = useState("");

  // --- 2. SEARCH LOGIC ---
  const filteredBlogs = currentBlogs?.filter((post) => {
    return post.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // --- 3. FETCH DATA ---
  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-base-200">
      {/* --- HERO SECTION --- */}
      <div className="hero bg-base-100 py-16 border-b border-base-300">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold text-primary">
              My Creative Blog
            </h1>
            <p className="py-6 text-base-content/70">
              Temukan artikel menarik seputar teknologi dan web.
            </p>
          </div>
        </div>
      </div>

      {/* --- SEARCH COMPONENT --- */}
      <div className="w-full max-w-2xl mx-auto px-4 -mt-8 relative z-10">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      {/* --- GRID SECTION --- */}
      {filteredBlogs && <BlogGrid filteredBlogs={filteredBlogs} />}

      {/* --- FOOTER SECTION --- */}
      <footer className="footer footer-center p-10 bg-base-100 text-base-content border-t border-base-300">
        <div>
          <p className="font-bold uppercase tracking-widest text-primary">
            DevBlog Management
          </p>
          <p>Copyright © 2024 - All right reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

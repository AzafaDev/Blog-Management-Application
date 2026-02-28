import { useEffect, useState } from "react";
import { useBlogStore, type Blog } from "../../stores/useBlogStore";
import PostModal from "../../components/admin/PostModal";
import EditModal from "../../components/admin/EditModal";
import DeleteModal from "../../components/admin/DeleteModal";
import Pagination from "../../components/admin/Pagination";
import BlogTable from "../../components/admin/BlogTable";
import SearchBar from "../../components/admin/SearchBar";
import AdminHeader from "../../components/admin/AdminHeader";
import usePagination from "../../hooks/usePagination";

const AdminPage = () => {
  // --- STATE & STORE ---
  const { currentBlogs, fetchBlogs, deleteBlog } = useBlogStore();
  const [selectedPost, setSelectedPost] = useState<Blog | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 5;

  // --- DATA FETCHING ---
  useEffect(() => {
    fetchBlogs();
  }, []);

  // --- SEARCH SYNC ---
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // --- LOGIC: FILTER & PAGINATION ---
  const filteredBlogs =
    currentBlogs?.filter((post) => {
      const search = searchQuery.toLowerCase();
      return (
        post.title.toLowerCase().includes(search) ||
        post.author.toLowerCase().includes(search)
      );
    }) || [];

  const { currentPosts, totalPages, indexOfFirstPost, indexOfLastPost } =
    usePagination({ currentPage, POSTS_PER_PAGE, filteredBlogs });

  // --- INTERACTION HANDLERS ---
  const openModal = (modalId: string, post: Blog) => {
    setSelectedPost(post);
    setTimeout(() => {
      const modal = document.getElementById(modalId) as HTMLDialogElement;
      modal?.showModal();
    }, 0);
  };

  const handleConfirmDelete = async () => {
    if (selectedPost) {
      await deleteBlog(selectedPost.objectId);
      (document.getElementById("delete_modal") as HTMLDialogElement)?.close();
      setSelectedPost(null);
    }
  };

  return (
    <div className="p-6 md:p-12 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <AdminHeader />

        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <BlogTable currentPosts={currentPosts} OpenModal={openModal} />
          </div>

          {/* FOOTER: INFO & PAGINATION */}
          {currentPosts.length > 0 && (
            <div className="p-6 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-500">
                Showing {indexOfFirstPost + 1} to{" "}
                {Math.min(indexOfLastPost, filteredBlogs.length)} of{" "}
                {filteredBlogs.length}
              </p>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>

      {/* --- MODAL OVERLAYS --- */}
      <PostModal />

      <EditModal
        key={`edit-${selectedPost?.objectId}`}
        objectId={selectedPost?.objectId ?? ""}
        content={selectedPost?.content ?? ""}
        author={selectedPost?.author ?? ""}
        title={selectedPost?.title ?? ""}
        publishedDate={selectedPost?.publishedDate ?? Date.now()}
      />

      <DeleteModal
        key={`del-${selectedPost?.objectId}`}
        title={selectedPost?.title ?? ""}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default AdminPage;

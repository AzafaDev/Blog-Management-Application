import type { Blog } from "../stores/useBlogStore";

interface UsePaginationProps {
  currentPage: number;
  POSTS_PER_PAGE: number;
  filteredBlogs: Blog[];
}
const usePagination = ({
  currentPage,
  POSTS_PER_PAGE,
  filteredBlogs,
}: UsePaginationProps) => {
  // Hitung "pintu keluar" (Index Terakhir)
  const indexOfLastPost = currentPage * POSTS_PER_PAGE;

  // Hitung "pintu masuk" (Index Pertama)
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;

  // LEARNING POINT: Memotong data asli menjadi potongan kecil sesuai halaman
  const currentPosts = filteredBlogs.slice(indexOfFirstPost, indexOfLastPost);

  // LEARNING POINT: Hitung total halaman (Membulatkan ke atas dengan Math.ceil)
  const totalPages = Math.ceil(filteredBlogs.length / POSTS_PER_PAGE);
  return {currentPosts, totalPages, indexOfFirstPost, indexOfLastPost}
};

export default usePagination;

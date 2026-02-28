import { Link, useParams } from "react-router-dom";
import { useBlogStore } from "../../stores/useBlogStore";
import { ArrowLeft, User, Calendar } from "lucide-react";
import { useEffect } from "react";

const FeedsPage = () => {
  const { getCurrentBlog, currentBlog } = useBlogStore();
  const {id} = useParams();
  useEffect(() => {
    getCurrentBlog(id);
  }, []);

  // --- 1. GUARD CLAUSE (Jika data kosong) ---
  if (!currentBlog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h2 className="text-xl font-bold">Post tidak ditemukan</h2>
        <Link to="/" className="btn btn-primary">
          Kembali ke Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* --- 2. TOMBOL KEMBALI --- */}
        <Link to="/" className="btn btn-ghost mb-6 gap-2">
          <ArrowLeft size={18} /> Kembali
        </Link>

        {/* --- 3. MAIN ARTICLE --- */}
        <article className="card bg-base-100 shadow-xl overflow-hidden">
          <div className="card-body p-8 md:p-12">
            {/* Meta Data */}
            <div className="flex flex-wrap gap-4 text-sm text-base-content/60 mb-6">
              <span className="flex items-center gap-1">
                <User size={14} /> {currentBlog.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {new Date(currentBlog.publishedDate).toLocaleDateString(
                  "id-ID",
                )}
              </span>
            </div>

            {/* Judul */}
            <h1 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
              {currentBlog.title}
            </h1>

            {/* Isi Konten */}
            <div className="text-lg leading-relaxed text-base-content/80 whitespace-pre-line">
              {currentBlog.content}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default FeedsPage;

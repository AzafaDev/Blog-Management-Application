import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({currentPage, setCurrentPage, totalPages}:any) => {
  return (
    <div className="join shadow-sm ring-1 ring-gray-200 rounded-xl overflow-hidden">
      <button
        className="join-item btn btn-white bg-white border-none hover:bg-gray-50 disabled:bg-gray-50"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        <ChevronLeft size={18} />
      </button>

      <button className="join-item btn btn-white bg-white border-none pointer-events-none text-gray-700 font-bold px-6">
        Page {currentPage} of {totalPages}
      </button>

      <button
        className="join-item btn btn-white bg-white border-none hover:bg-gray-50 disabled:bg-gray-50"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;

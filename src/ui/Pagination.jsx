import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex justify-between items-center mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2 py-1 border rounded-md bg-gray-50 hover:bg-gray-200 disabled:opacity-50 flex items-center gap-2"
      >
        <HiArrowLeft />
        Previous
      </button>
      <div className="flex gap-2">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => onPageChange(index + 1)}
            className={`px-3 py-1 text-sm font-medium border rounded-md ${
              currentPage === index + 1 ? "bg-gray-300" : "hover:bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-2 py-1 border rounded-md bg-gray-50 hover:bg-gray-200 disabled:opacity-50 flex items-center gap-2"
      >
        Next
        <HiArrowRight />
      </button>
    </div>
  );
}

export default Pagination;

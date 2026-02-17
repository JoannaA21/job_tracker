import ReactPaginate from "react-paginate";

const Pagination = ({ pageCount, onPageChange }) => {
  return (
    <div className="mt-4 flex justify-center">
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={onPageChange}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< prev"
        renderOnZeroPageCount={null}
        containerClassName="flex items-center gap-2 text-sm"
        pageClassName="px-2 py-1 border rounded"
        activeClassName="bg-tangerine text-white border-tangerine"
        previousClassName="px-2 py-1 border rounded"
        nextClassName="px-2 py-1 border rounded"
        disabledClassName="opacity-50 cursor-not-allowed"
      />
    </div>
  );
};

export default Pagination;

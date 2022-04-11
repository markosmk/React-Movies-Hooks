import ReactPaginate from 'react-paginate';

export default function Pagination({ currentPage, setPage, totalPages, type }) {
  const handlePageClick = (event) => {
    const page = event.selected;
    setPage(page + 1, type || '');
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="my-10">
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"
        containerClassName="border-t border-slate-200 dark:border-slate-600 px-4 flex items-center justify-between sm:px-0"
        previousClassName="-mt-px w-0 flex-1 flex"
        previousLinkClassName="border-t-4 border-transparent py-4 pr-1 inline-flex items-center text-sm font-medium text-slate-400 hover:text-slate-700 hover:border-slate-300 transition-colors"
        pageLinkClassName="border-transparent text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:bg-slate-700 border-t-4 py-4 px-4 inline-flex items-center text-sm font-medium transition-colors"
        nextClassName="-mt-px w-0 flex-1 flex justify-end"
        nextLinkClassName="border-t-4 border-transparent py-4 pl-1 inline-flex items-center text-sm font-medium text-slate-400 hover:text-slate-700 hover:border-slate-300 transition-colors"
        breakLinkClassName="border-transparent text-slate-500 border-t-4 pt-4 px-4 inline-flex items-center text-sm font-medium"
        activeLinkClassName="border-cyan-500 text-cyan-600 border-t-4 py-4 px-4 inline-flex items-center text-sm font-medium hover:border-cyan-500"
        renderOnZeroPageCount={null}
        forcePage={currentPage - 1}
      />
    </div>
  );
}

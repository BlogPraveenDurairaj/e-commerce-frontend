import React from 'react';
import cx from 'classnames';

const Pagination = (props) => {
    const { pageRange, page, handlePage } = props
    return (
        <div className="flex items-center justify-center gap-2 mt-6">
            <button
                disabled={page === 1}
                onClick={() => handlePage(page - 1)}
                className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-600 
               hover:border-[#259417] hover:text-[#259417]
               disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
            >
                Back
            </button>

            {Array.from({ length: pageRange }).map((_, index) => {
                const pageNumber = index + 1;

                return (
                    <button
                        key={pageNumber}
                        onClick={() => handlePage(pageNumber)}
                        className={cx(
                            "w-10 h-10 rounded-lg border text-sm font-medium transition cursor-pointer",
                            page === pageNumber
                                ? "bg-[#259417] text-white border-[#259417] shadow-sm"
                                : "bg-white text-gray-600 border-gray-200 hover:border-[#259417] hover:text-[#259417]"
                        )}
                    >
                        {pageNumber}
                    </button>
                );
            })}

            <button
                disabled={page === pageRange}
                onClick={() => handlePage(page + 1)}
                className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-600 
               hover:border-[#259417] hover:text-[#259417] cursor-pointer
               disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
                Next
            </button>
        </div>
    )
}

export default Pagination
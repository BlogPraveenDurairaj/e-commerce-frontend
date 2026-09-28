import React from 'react';
import cx from 'classnames';
import TableSkeleton from '../skeleton/TableSkeleton';

const CustomTable = (props) => {
    const { loading, emptyMessage = "No data", data, columns, pagination } = props
    const { page, setPage, total } = pagination
    const pageRange = Math.ceil(total / 10)

    return (
        <>
            <div className="h-full w-full overflow-y-auto max-h-[650px] border border-gray-200 rounded-md">
                <table className="w-full min-w-max table-auto text-left rounded-md relative">
                    <thead className="sticky top-0">
                        <tr className="leading-none font-medium text-sm border-b border-gray-200 p- bg-gray-100  min-w-[120px]">
                            {columns?.map((item) => <th key={item.key} className='p-2 py-3'>{item.name}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {loading && <TableSkeleton titleLength={columns.length} />}
                        {!loading && data?.length > 0 ?
                            data?.map((row) => {
                                return (
                                    <tr className="border-b border-gray-200 last:border-0 bg-white" key={row.id}>
                                        {columns.map((col) => {
                                            return (
                                                <td className="p-2 text-sm" key={col.key}>
                                                    {col?.render ? col?.render(row) : row[col.key]}
                                                </td>
                                            )
                                        })}
                                    </tr>
                                )
                            }) : <tr><td colSpan={columns?.length}>{emptyMessage}</td></tr>}
                    </tbody>
                </table>
            </div>
            {/* pagination */}
           {pageRange > 1 &&  <div className="flex items-center justify-center gap-2 mt-6">
                <button
                    disabled={page === 1}
                    onClick={() => setPage((pre) => pre - 1)}
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
                            onClick={() => setPage(pageNumber)}
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
                    onClick={() => setPage((pre) => pre + 1)}
                    className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-600 
               hover:border-[#259417] hover:text-[#259417]
               disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                    Next
                </button>
            </div>}
        </>

    )
}

export default CustomTable
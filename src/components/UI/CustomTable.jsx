import React from 'react';
import TableSkeleton from '../skeleton/TableSkeleton';
import { PaginationLimit } from '../../static';
import Pagination from './Pagination';

const CustomTable = (props) => {
    const { loading, emptyMessage = "No data", data, columns, pagination } = props
    const { page, setPage, total } = pagination
    const pageRange = Math.ceil(total / PaginationLimit)

    const handlePage = (pageNo)=>{
        setPage(pageNo)
    }

    return (
        <>
            <div className="h-full w-full overflow-y-auto max-h-[650px] border border-gray-200 rounded-md">
                <table className="w-full min-w-max table-auto text-left rounded-md relative">
                    <thead className="sticky top-0">
                        <tr className="leading-none font-medium text-sm border-b border-gray-200 p- bg-gray-100  min-w-[120px]">
                            {columns?.map((item) => <th key={item.key} className='p-3'>{item.name}</th>)}
                        </tr>
                    </thead>
                    <tbody className='bg-white'>
                        {loading && <TableSkeleton titleLength={columns.length} />}
                        {!loading && data?.length > 0 &&
                            data?.map((row) => {
                                return (
                                    <tr className="border-b border-gray-200 last:border-0" key={row.id}>
                                        {columns.map((col) => {
                                            return (
                                                <td className="p-4 text-sm" key={col.key}>
                                                    {col?.render ? col?.render(row) : row[col.key]}
                                                </td>
                                            )
                                        })}
                                    </tr>
                                )
                            })}
                        {!loading && data?.length === 0 && <tr><td className='p-4 text-center text-xl' colSpan={columns?.length}>{emptyMessage}</td></tr>}
                    </tbody>
                </table>
            </div>
            {/* pagination */}
            {pageRange > 1 && <Pagination
                pageRange={pageRange}
                page={page}
                handlePage={handlePage}
                />}
        </>

    )
}

export default CustomTable
import React from 'react'
import { PaginationLimit } from '../../static'

const TableSkeleton = ({titleLength ,customSkeletonLength}) => {
    return (
        <>
            {
                Array.from({ length: customSkeletonLength ?? PaginationLimit },
                    (_, index) => (
                        <tr key={index} className="border-b border-gray-200 last:border-0 bg-white">
                            {
                                Array.from({ length: titleLength },
                                    (_, index) => (
                                        <td key={index + 1} className="animate-pulse p-4 text-sm">
                                            <span className='h-[20px]  w-[80px] rounded-md bg-gray-300 inline-block' />
                                        </td>
                                    )
                                )
                            }
                        </tr>
                    )
                )
            }
        </>

    )
}

export default TableSkeleton
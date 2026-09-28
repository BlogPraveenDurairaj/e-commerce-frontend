import React from 'react'

const TableSkeleton = ({titleLength}) => {
    return (
        <>
            {
                Array.from({ length: 10 },
                    (_, index) => (
                        <tr key={index} className="border-b border-gray-400 last:border-0">
                            {
                                Array.from({ length: titleLength },
                                    (_, index) => (
                                        <td key={index + 1} className="animate-pulse p-2 text-sm">
                                            <span className='h-[28px]  w-[80px] rounded-md bg-gray-300 inline-block' />
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
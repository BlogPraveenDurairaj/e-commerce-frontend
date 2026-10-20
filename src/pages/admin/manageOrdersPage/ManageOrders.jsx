import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../components/layout/AdminLayout'
import CustomTable from '../../../components/UI/CustomTable'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersByAdminData, updateOrderStatusData } from '../../../slice/orderSlice'
import { formatOrderDate } from '../../../helper/formatOrderDate'
import { PaginationLimit } from '../../../static'
import toast from 'react-hot-toast'
import Select from '../../../components/UI/Select'
import Button from '../../../components/UI/Button'

const ManageOrders = () => {
    const dispatch = useDispatch();
    const { totalOrders, totalOrdersCount, loading } = useSelector((state) => state.orders)
    const [page, setPage] = useState(1)
    const [status, setStatus] = useState('')
    const pagination = {
        page,
        setPage,
        total: totalOrdersCount
    }
    const orderStatus = ["Shipped", "Placed", "Out for delivery", "Delivered"]

    const handleStatus = async (e, id) => {
        const { value } = e.target
        setStatus(value)
        if (value !== "") {
            await dispatch(updateOrderStatusData({ orderId: id, status: value })).unwrap()
            toast.success('Order status updated')
        }
    }
    const columns = [
        {
            key: 'id',
            name: 'ID'
        },
        {
            key: 'created_at',
            name: 'Date',
            render: (row) => {
                return <>{formatOrderDate(row?.created_at)}</>
            }
        },
        {
            key: 'shipping_name',
            name: 'User name'
        },
        {
            key: 'total_amount',
            name: "Total amount",
            render: (row) => {
                return `$${row.total_amount}`
            }
        },
        {
            key: "payment_method",
            name: 'Payment type',
        },
        {
            key: 'status',
            name: 'Status',
            render: (row) => {
                return row.status === "Delivered" ? <span className='w-fit px-4 py-1 rounded-full text-sm font-medium bg-green-50 text-green-600'>{row.status}</span> :
                    <Select
                        defaultValue={row.status}
                        onChange={(e) => handleStatus(e, row.id)}
                        options={orderStatus}
                    />

            }
        },
        {
            key: 'action',
            name: 'Action',
            render: (row) => {
                return (
                    <div>
                        <Button containerClass={'inline-flex'} target={'_blank'} type='link' style='gray' to={`/orders/${row.id}`} label={'View'} />
                    </div>
                )

            }
        }
    ]

    useEffect(() => {
        dispatch(getAllOrdersByAdminData(page))
    }, [dispatch, page])
    return (
        <AdminLayout title={'Manage Orders'}>
            <CustomTable
                columns={columns}
                data={totalOrders}
                loading={loading}
                pagination={pagination}
            />
        </AdminLayout>
    )
}

export default ManageOrders
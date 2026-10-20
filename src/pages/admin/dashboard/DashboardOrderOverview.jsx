
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { useMemo, useState } from "react";
import cx from 'classnames';

export default function DashboardOrderOverview({ orderData }) {
    const [range, setRange] = useState(1)
    const transformData = useMemo(() => {
        const timeRange = 24 * 60 * 60 * 1000 * range
        const now = Date.now()
        const filteredData = orderData.filter((order) => {
            const orderTime = new Date(order.created_at).getTime()
            return now - orderTime <= timeRange
        })

        let res = filteredData.reduce((acc, item) => {
            const orderTimeInMints = new Date(item.created_at).toLocaleString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            })
            if (!acc[orderTimeInMints]) {
                acc[orderTimeInMints] = {
                    time: orderTimeInMints,
                    orders: 1,
                     timestamp: new Date(item.created_at).getTime()
                }
            } else {
                acc[orderTimeInMints] = {
                    time: orderTimeInMints,
                    orders: acc[orderTimeInMints].orders + 1,
                     timestamp: new Date(item.created_at).getTime()
                }
            }
            return acc
        }, {})


        if (range === 7 || range === 30) {
            res = filteredData.reduce((acc, item) => {
                const orderTimeInDays = new Date(item.created_at).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                })
                if (!acc[orderTimeInDays]) {
                    acc[orderTimeInDays] = {
                        date: orderTimeInDays,
                        orders: 1,
                        timestamp: new Date(item.created_at).getTime()
                    }
                } else {
                    acc[orderTimeInDays] = {
                        date: orderTimeInDays,
                        orders: acc[orderTimeInDays].orders + 1,
                        timestamp: new Date(item.created_at).getTime()
                    }
                }
                return acc
            }, {})
        }
        return Object.values(res).sort((a,b)=> a.timestamp - b.timestamp)
    }, [range,orderData])


    const tabData = [
        {
            value: 1,
            label: 'Last 24 Hours'
        },
        {
            value: 7,
            label: 'Last 7 Days'
        },
        {
            value: 30,
            label: 'Last Month'
        }
    ]

    return (
        <div className="bg-white rounded-2xl p-4 border border-gray-200 overflow-hidden">
            <div className='flex justify-between gap-2 flex-wrap items-start mb-3'>
                <div>
                    <p className='text-sm font-bold mb-1'>Orders Overview</p>
                    <p className='text-xs mb-2 font-medium text-gray-500'>based on the time duriation</p>
                </div>
                <div className="flex gap-2 flex-wrap">
                    {tabData.map((item) => {
                        const { value, label } = item
                        const isActive = value === range
                        return (
                            <button
                                onClick={() => setRange(value)}
                                className={cx(isActive ? 'bg-green-600 text-white' : 'bg-white', ' rounded-md shadow p-1 px-2 text-sm border border-gray-100')}>{label}</button>
                        )
                    })}
                </div>
            </div>


            <div className="h-[300px] w-full">
                {transformData?.length > 0  ? 
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={transformData}
                        margin={{ top: 10, right: 8, left: -20, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient
                                id="ordersGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="#10b981"
                                    stopOpacity={0.3}
                                />
                                <stop
                                    offset="100%"
                                    stopColor="#10b981"
                                    stopOpacity={0.02}
                                />
                            </linearGradient>
                        </defs>

                        <CartesianGrid
                            stroke="#e2e8f0"
                            strokeDasharray="3 3"
                            vertical={false}
                        />

                        <XAxis
                            dataKey={range === 1 ? "time" : "date"}
                            tick={{ fontSize: 11, fill: "#64748b" }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <YAxis
                            tick={{ fontSize: 11, fill: "#64748b" }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <Tooltip />

                        <Area
                            type="monotone"
                            dataKey="orders"
                            stroke="#059669"
                            strokeWidth={2}
                            fill="url(#ordersGradient)"
                            dot={{ r: 3, fill: "#059669" }}
                            activeDot={{ r: 5 }}
                        />
                    </AreaChart>
                </ResponsiveContainer> : <div className="h-full flex justify-center items-center text-md font-semibold">No Orders</div>}
            </div>
        </div>
    );
}

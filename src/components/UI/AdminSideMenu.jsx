import React from 'react'
import { Link } from 'react-router-dom'

const AdminSideMenu = ({ data }) => {

    return (
        <aside className="w-64 min-h-screen border-r border-gray-200 bg-white  fixed left-0">
            {/* Logo */}
            <div className="flex items-center gap-3 border-b p-4 border-gray-200">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-600 text-white">
                    <span className="text-lg font-bold">S</span>
                </div>
                <div>
                    <h1 className="text-lg font-bold text-green-600">
                        ShopEasy
                    </h1>
                </div>
            </div>

            {/* Menu */}
            <nav className="space-y-2 px-4 py-5">
                {data?.map((item) => {
                    const Icon = item.Icon;
                    const isActive = location.pathname.startsWith(item.link)

                    return (
                        <Link
                            key={item.link}
                            to={item.link}
                            className={`group flex items-center gap-3 rounded-xl px-3 py-3 transition-all
            ${isActive ? "bg-green-600 text-white" : "text-gray-600 hover:bg-green-50 hover:text-green-600"}
          `}
                        >
                            {/* Icon */}
                            <div
                                className={`flex h-9 w-9 items-center justify-center rounded-lg
              ${isActive ? "bg-green-700 text-white" : "text-gray-500 group-hover:text-green-600"}
            `}
                            >
                                <Icon size={20} />
                            </div>

                            {/* Label + Description */}
                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-semibold">
                                    {item.label}
                                </p>

                                {item.description && (
                                    <p
                                        className={`truncate text-[11px]
                  ${isActive ? "text-green-100" : "text-gray-400"
                                            }
                `}
                                    >
                                        {item.description}
                                    </p>
                                )}
                            </div>

                            {/* Badge */}
                            {item.count && (
                                <span
                                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold
                ${isActive ? "bg-white text-green-600" : "bg-gray-100 text-gray-500"}`}
                                >
                                    {item.count}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    )
}

export default AdminSideMenu
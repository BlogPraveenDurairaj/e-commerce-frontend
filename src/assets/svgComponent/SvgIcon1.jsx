export const HearSvgIcon = ({ className }) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M20.84 4.61C20.3292 4.09917 19.7227 3.69408 19.0548 3.41787C18.3869 3.14167 17.6711 2.99976 16.948 2.99976C16.2249 2.99976 15.5091 3.14167 14.8412 3.41787C14.1733 3.69408 13.5668 4.09917 13.056 4.61L12 5.67L10.944 4.61C9.91131 3.57731 8.51042 2.99724 7.05 2.99724C5.58958 2.99724 4.18869 3.57731 3.156 4.61C2.12331 5.64269 1.54324 7.04358 1.54324 8.504C1.54324 9.96442 2.12331 11.3653 3.156 12.398L4.216 13.458L12 21.242L19.784 13.458L20.844 12.398C21.3548 11.8872 21.7599 11.2807 22.0361 10.6128C22.3123 9.94491 22.4542 9.22909 22.4542 8.506C22.4542 7.78291 22.3123 7.06709 22.0361 6.3992C21.7599 5.73131 21.3548 5.12483 20.844 4.614L20.84 4.61Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export const ProductCartSvgIcon = ({ className, size = 24 }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M3 3H5L7.4 14.4C7.5 14.9 7.8 15.2 8.3 15.2H18.5C19 15.2 19.4 14.9 19.5 14.5L21 8H6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle cx="9" cy="20" r="1.5" fill="currentColor" />
            <circle cx="18" cy="20" r="1.5" fill="currentColor" />
        </svg>
    )
}

export const SearchSvgIcon = ({ className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-4-4" />
        </svg>
    )
}

export const StarSvgIcon = ({ className }) => {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className={className}

        >
            <path d="M12 2.5l2.94 5.95 6.56.95-4.75 4.63 1.12 6.54L12 17.48l-5.87 3.09 1.12-6.54L2.5 9.4l6.56-.95L12 2.5z" />
        </svg>
    )
}

export const PlusIconSvg = ({ className }) => {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className={className}
        >
            <path d="M12 5v14M5 12h14" />
        </svg>
    )
}

export const MinusIconSvg = ({ className }) => {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className={className}
        >
            <path d="M5 12h14" />
        </svg>
    )
}

export const DeleteIconSvg = () => {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 6h18" />
            <path d="M8 6V4h8v2" />
            <path d="M19 6l-1 14H6L5 6" />
            <path d="M10 11v5M14 11v5" />
        </svg>
    )
}

export const MenuSvgIcon = ({className}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" className={className}>
            <path d="M4 6H20M4 12H14M4 18H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )

}
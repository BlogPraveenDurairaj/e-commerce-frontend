import React from 'react';
import { createPortal } from 'react-dom';
import { CloseIconSvg } from '../../assets/svgComponent/SvgIcon1';

const Modal = ({ children, isShow, handleClose, title }) => {
    return createPortal(
        isShow && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
                    <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
                        {title ? (
                            <h5 className="text-lg font-semibold text-gray-900">
                                {title}
                            </h5>
                        ) : (
                            <div />
                        )}

                        <button
                            onClick={handleClose}
                            className="flex h-8 w-8 items-center justify-center rounded-md text-xl text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                        >
                            <CloseIconSvg />
                        </button>
                    </div>
                    <div className="max-h-[80vh] overflow-y-auto px-6 py-6">
                        {children}
                    </div>
                </div>
            </div>
        ),
        document.getElementById('modal-root')
    );
};

export default Modal;
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleCartAdd, handleCartDelete, handleCartMinus, handleRemoveAllCart } from '../../slice/productSlice'
import { DeleteIconSvg, MinusIconSvg, PlusIconSvg } from '../../assets/svgComponent/SvgIcon1';
import Modal from '../../components/UI/Modal';
import Button from '../../components/UI/Button';

const ClearModalBody = ({ handleConfirm }) => {
  return (
    <div>
      <p>Are you sure want to clear all items</p>
      <div className='flex justify-end gap-3 mt-2'>
        <Button buttonAction={handleConfirm} label={"Confirm"} style={'black'} />
      </div>
    </div>
  )
}

const CartList = ({ cartData }) => {
  const dispatch = useDispatch()
  const [clearModal, setClearModal] = useState(false)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartData))
  }, [cartData])

  const handleClearModal = () => {
    dispatch(handleRemoveAllCart())
    setClearModal(false)
  }



  return (
    <div>
      <Modal isShow={clearModal} handleClose={() => setClearModal(false)} title={"Clear all cart items"}>
        <ClearModalBody handleConfirm={handleClearModal}/>
      </Modal>
      <div className='flex justify-between items-center gap-3 flex-wrap mb-6'>
        <h1 className='text-2xl font-bold text-gray-800'>Your Cart <span className='text-base text-gray-500 font-normal ml-1'>({cartData?.length} Items)</span></h1>
    <Button label={'Clear All'} style='black' buttonAction={()=>setClearModal(true)}/>
      </div>
      <div className='grid gap-3'>
        {
          cartData.map((item) => {
            const { id, title, price, image, quantity, category } = item
            return (
              <div className='flex flex-col min-[400px]:flex-row gap-4 items-start p-3 bg-[#f5f5f5] rounded-xl' key={id}>
                <div className='w-20 h-20 min-[400px]:w-[100px] min-[400px]:h-[100px] rounded-xl shrink-0'>
                  <img src={image} alt={title} className='w-full h-full rounded-xl object-contain bg-white p-1' />
                </div>
                <div className='w-full'>
                  <div className='flex flex-col sm:flex-row justify-between w-full items-start gap-2 sm:gap-3 mb-4'>
                    <div>
                      <p className='px-4 py-1 bg-emerald-100 inline-block rounded-md text-emerald-700 text-xs font-medium mb-1.5'>{category}</p>
                      <p className='text-base sm:text-lg font-semibold text-gray-800'>{title}</p>
                    </div>
                    <div className='text-left sm:text-right'>
                      <p className='text-base font-semibold mb-1 sm:mb-0 text-gray-900'>${quantity * price}</p>
                      <p className='text-xs font-medium text-gray-500'>(${price} each)</p>
                    </div>
                  </div>
                  <div className='flex justify-between gap-3 items-end'>
                    <div className='bg-white p-0.5 rounded-lg flex items-center gap-1.5 text-xs font-semibold text-gray-700 border border-gray-200'>
                      <button className='border-0 bg-transparent flex items-center justify-center rounded-md p-1 cursor-pointer hover:bg-gray-100 disabled:opacity-40' disabled={quantity == 1} onClick={() => dispatch(handleCartMinus(item))}><MinusIconSvg /></button>
                      <span>{quantity}</span>
                      <button className='border-0 bg-transparent flex items-center justify-center rounded-md p-1 cursor-pointer hover:bg-gray-100' onClick={() => dispatch(handleCartAdd({ id }))}><PlusIconSvg /></button>
                    </div>
                    <button className='bg-white border-0 flex px-3 py-2 rounded-lg gap-1.5 items-center text-xs cursor-pointer text-gray-600 hover:text-red-600 transition-colors' onClick={() => dispatch(handleCartDelete(id))}><DeleteIconSvg /><span>Remove</span></button>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default CartList
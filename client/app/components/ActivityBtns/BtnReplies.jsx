import usersStore from '@/app/zustand/users/usersStore'
import React from 'react'

function BtnReplies() {
  const {setReplies} = usersStore()
  const handleClick = () => {
    setReplies()
  }
  return (
    <>
    <button className="min-w-[100px] py-2 border rounded-lg active:scale-95 brounded-lg border-white border-opacity-20  flex justify-center items-center active:bg-white active:text-black"
    onClick={handleClick}
    >  Replies </button>
    </>
  )
}

export default BtnReplies

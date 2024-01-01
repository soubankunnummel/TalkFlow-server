import usersStore from '@/app/zustand/users/usersStore'
import React from 'react'

function BtnMention() {
  const {setMentions} = usersStore()

  const handleClick = async () => {
    setMentions()
    try {
      
    } catch (error) {
      
    }
  }
  return (
    <><button className="min-w-[100px] py-2 border rounded-lg active:scale-95 brounded-lg border-white border-opacity-20  flex justify-center items-center active:bg-white active:text-black"
    onClick={handleClick}
    >Mention </button> </>
  )
}

export default BtnMention

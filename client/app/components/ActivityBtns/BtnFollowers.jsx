import { followers } from '@/app/service/users'
import usersStore from '@/app/zustand/users/usersStore'
import React, { useEffect } from 'react'

function BtnFollowers() { 

 

  const {setFollowers, setFollowerss} = usersStore()

  const handleClick = async () => {
    setFollowers()
    try {
      const response = await followers()
      if(response){
        setFollowerss(response)
      }
    } catch (error) {
      console.log(error)
    }
  }
  // useEffect(() => [setFollowerss])
  return (
    <>
    <button className="min-w-[100px] py-2 border rounded-lg active:scale-95 brounded-lg border-white border-opacity-20  flex justify-center items-center active:bg-white active:text-black"
    onClick={handleClick}
    > Followers </button>
    </>
  )
}

export default BtnFollowers

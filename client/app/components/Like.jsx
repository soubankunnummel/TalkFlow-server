import { GoHeart } from "react-icons/go";

import React from 'react'

function Like() {
  return (
    <div className="w-9 h-9 bg-transparent hover:bg-stone-900 rounded-full flex justify-center items-center">
        <GoHeart className="text-2xl" />
    </div>
  )
}

export default Like
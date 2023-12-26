"use client";
import { useEffect, useState } from "react";

function ForYou({ isActive, setActiveComponent }) {
  useEffect(() => {
    handlForYou();
  }, [])

  const handlForYou = async () => {
    if (!isActive) {
      setActiveComponent("ForYou");
    }
    try {
    } catch (error) {}
  };

  // fech getFedPost here and pass the value to redux state

  return (
    <>
      <div
        className={`w-1/2  flex justify-center items-center border-stone-800   text-xs text-white text-opacity-40 hover:text-white ${
          isActive ? "border-b-[1px]" : "border-none"
        } `}
        onClick={handlForYou}
      >
        <button>For you </button>
      </div>
    </>
  );
}
export default ForYou;

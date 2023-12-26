import { useEffect, useState } from "react";

function FolloWing({ isActive, setActiveComponent }) {
  useEffect(() => {
    handlFollwing();
  }, []);

  const handlFollwing = async () => {
    if (!isActive) {
      setActiveComponent("Following");
    }
    try {
    } catch (error) {}
  };
  return (
    <>
      <div
        className={`w-1/2  flex justify-center items-center border-stone-800   text-xs text-white text-opacity-40 hover:text-white ${
          isActive ? "border-b-[1px]" : "border-none"
        } `}
        onClick={handlFollwing}
      >
        <button>Following</button>
      </div>
    </>
  );
}

export default FolloWing;

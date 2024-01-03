import React, { useEffect, useState } from "react";
import { getAllUsers } from "../service/users";
import All from "./ActivityBtns/BtnAll";
import Allusers from "./Activitys/Allusers";
import usersStore from "../zustand/users/usersStore";
import BtnFollowers from "./ActivityBtns/BtnFollowers";
import BtnReplies from "./ActivityBtns/BtnReplies"; 
import BtnMention from "./ActivityBtns/BtnMention";
import BtnReposts from "./ActivityBtns/BtnReposts"; 
import Followers from "./Activitys/Followers";
import ActivityReplies from "./Activitys/ActivityReplies";
import Mention from "./Activitys/Mention";
import Quats from "./Activitys/Quats";
import BtnQuats from "./ActivityBtns/BtnQuats";
import Reposts from "./Activitys/Reposts";

function Activity() {
  const { selected } = usersStore();

  useEffect(() => {
    // setAll()
  }, []);

  return (
    <div className="w-full md:w-[768px]  h-[900px] md:p-2 p-3 flex flex-col relative justify-between items-center">
      <div className="h-auto w-full  bg-black border-white flex flex-col justify-center items-center border-opacity-30 p-2">
        <div className="w-full flex gap-1 justify-between overflow-x-scroll">
          <All />
          <BtnFollowers />
          <BtnReplies />
          <BtnMention />
          <BtnQuats />
          <BtnReposts />
        </div>

        {!selected && <Allusers />}
        {selected === 'followers' && <Followers />}
        {selected === "replies" && <ActivityReplies />}
        {selected === "mention" && <Mention />}
        {selected === "quats" && <Quats />}
        {selected === "repots" && <Reposts />}
      
      </div>
    </div>
  );
}

export default Activity;

import Image from "next/image";
import Navbar from "./components/navbar";
import BottomBar from "./components/BottomBar";
import Home from "./page/home/page";
import Login from "./page/login/page";
import Profile from "./page/profile/page";

export default function page() {
  return (
    <div className="bg-black w-full h-auto   flex flex-col ">

      <Navbar/>
      <Home />
     
      <BottomBar />
    </div>
  );
}

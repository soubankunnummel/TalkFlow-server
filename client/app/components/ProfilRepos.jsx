"use client"
import React, { useState } from 'react'
import Like from './Like'
import Coment from './Coment'
import Repost from './Repost'
import Share from './Share'
import { IoIosMore } from 'react-icons/io' 
import { MdAddCircle } from 'react-icons/md'
import Loading from './Loading'

function ProfilRepos() {

  const [loading, setLoading] = useState(true);
    const [post, setPost] = useState(false)
  return (
    < >
    
{loading ? (
        <Loading />
      ) : (
        <>
         
         
            
              {post.map((item) => (
                <div
                  className=" w-full md:w-[580px] h-auto  md:p-2 p-3 flex flex-col relative top-[-27px]  justify-between items-center mb-10 "
                  key={item._id}
                >
                  <div className="h-auto w-full bg-black border-t-[1px] border-white flex border-opacity-30 p-2">
                    <div className="h-ful w-fit">
                      <div className="w-fit h-full  flex flex-col items-center gap-3">
                        <div
                          className="h-10 w-10 rounded-full bg-white box-border "
                          style={{
                            backgroundImage: `url(${item.profilePic})`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                          }}
                        >
                          <button className=" relative top-5 left-5  ">
                            <MdAddCircle className="text-2xl hover:inset-5 " />
                          </button>
                        </div>
                        <div className="  h-fit md:h-[450px] w-[1px] bg-white bg-opacity-30 rounded-lg"></div>
                      </div>
                    </div>
                    <div className=" w-full h-full bg-black flex flex-col">
                      <div className="w-full flex m-3 justify-between gap-3 items-center">
                        <span className="font-medium text-white hover:underline">
                          {user.username}{" "}
                        </span>
                        <div className="flex justify-between gap-3 items-center ">
                          <span className="text-xs text-opacity-40 text-white">
                            14 h
                          </span>

                          <button className=" w-7 h-7 rounded-full hover:bg-stone-900 active:scale-[90%] flex justify-center items-center">
                        <IoIosMore className="text-white" />
                      </button>
                        </div>
                      </div>
                      <div className="h-fit w-auto md:h-[400px] m-2">
                        <p className="my-2 mx-2">{item.text}</p>
                        <div className=" w-fit h-fit md:h-full md:w-full rounded-xl ">
                          <img
                            className="rounded-xl  w-full h-full "
                            src={item.img}
                            alt="Post images"
                          />
                        </div>
                      </div>
                      <div className="flex gap-1 mx-2 mt-10 items-center">
                        <Like /> <Coment /> <Repost /> <Share />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
           
         

        
        </>
      )}
    </>
  )
}

export default ProfilRepos
"use client";

import { MdAddCircle } from "react-icons/md";
import { IoIosMore } from "react-icons/io";
import PostHead from "./PostHead";
import { useEffect, useState } from "react";
import { getPost } from "../service/post";
import Loading from "./Loading";
import Like from "./Like";
import Coment from "./Coment";
import Share from "./Share";
import Repost from "./Repost";
import FollowPost from "./FollowPost";
import useFolloPost from "../zustand/posts/followPost";
import ForuFollow from "./ForuFollow";
import UserModal from "./UserModal";
import { getPostuser, getProfielPost, getProfile } from "../service/users";
import useProfileStore from "../zustand/users/profileStore";
import useProfile from "../zustand/posts/profilePost";
import usePosts from "../zustand/posts/posts";
import Reply from "./Modals/Reply";

const Post = () => {
  const { feed } = useFolloPost();

  const { setProfile } = useProfileStore();
  const { setUserProfil } = useProfile();
  const { setPost, serUser, post } = usePosts();

  const hadleProfile = async (username) => {
    try {
      const response = await getProfile(username);
      const profilePost = await getProfielPost(username);
      const postUser = await getPostuser(username);

      if (response && profilePost && postUser) {
        await setProfile(response);
        await serUser(postUser);
        await setPost(profilePost);
        await setUserProfil();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPost();

        if (response) {
          setPost(response);
          setLoading(false);
        }
      } catch (error) {
        console.log("Erro in post componet fech post", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <PostHead />
          {!feed ? (
            <>
              {post.map((item, index) => (
                <div
                  className=" w-full md:w-[580px] h-auto  md:p-2 p-3 flex flex-col  justify-between items-center mb-10 "
                  key={index}
                >
                  <div className="h-auto w-full bg-black border-t-[1px] border-white flex border-opacity-30 p-2">
                    <div className="h-auto  w-fit">
                      <div className="w-fit h-full  flex flex-col items-center gap-3">
                        <div
                          className="h-10 w-10 rounded-full bg-white box-border "
                          style={{
                            backgroundImage: `url(${
                              item.postedBy && item.postedBy.profilePic
                                ? item.postedBy.profilePic
                                : "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
                            })`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                          }}
                        >
                          <button className=" relative top-5 left-5  ">
                            <MdAddCircle className="text-2xl hover:scale-110 " />
                          </button>
                        </div>
                        <div
                          className={` md:h-[450px] w-[1px] bg-white bg-opacity-30 rounded-lg cross-line `}
                        ></div>

                        <div className="w-10 h-10 relative flex justify-center">
                          {item.replies.slice(0, 3).map((reply, index) => (
                            <div
                              key={index}
                              className={`w-${5 - index} h-${
                                5 - index
                              } bg-black absolute ${
                                index === 0
                                  ? "top-0 right-0"
                                  : index === 1
                                  ? "top-2 left-1"
                                  : "bottom-1 left-4"
                              } rounded-full`}
                              style={{
                                backgroundImage: `url(${
                                  reply.userProfilePic
                                    ? reply.userProfilePic
                                    : "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
                                })`,
                                backgroundSize: "cover",
                              }}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className=" w-full h-full bg-black flex flex-col">
                      <div className="w-full flex m-3 justify-between gap-3 items-center">
                        <span
                          className="font-medium text-white hover:underline"
                          onClick={() => hadleProfile(item.postedBy.username)}
                        >
                          {item.postedBy && item.postedBy.username}{" "}
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
                        <div className=" w-auto h-auto md:h-full md:w-full rounded-xl ">
                          {item.img ? (
                            <img
                              className="rounded-xl w-auto h-full"
                              src={item.img}
                              alt="...."
                            /> 
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="flex gap-1 mx-2 mt-10 items-center">
                        <Like postId={item._id} index={index} username={item.postedBy.username}/>
                         <Coment postId={item._id} index={index}  />{" "} 
                        <Repost /> <Share />

                      </div>
                      <Reply />
                      <div className="w-auto h-3 text-white text-opacity-20 gap-2 flex ms-3">
                        <span>{item.replies.length} replies .</span>
                        <span>{item.likes.length} likes</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <FollowPost />
          )}


          <ForuFollow />
        </>
      )}
    </>
  );
};

export default Post;

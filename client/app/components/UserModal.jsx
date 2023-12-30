import React from 'react';

const UserModal = ({ username, followersCount, onClose ,index}) => {
  return (
    <div className="fixed w-auto pt-40    bg-opacity-50 flex items-center justify-center "  key={index}>
      <div className="bg-white text-black p-4 rounded-lg">
        <h2 className="text-xl font-bold">{username}</h2>
        <p>Followers: {followersCount}</p>
        <button className="bg-blue-500 text-white p-2 rounded" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default UserModal;

import React from 'react';

const UserModal = ({ username, followersCount, onClose }) => {
  return (
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg">
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

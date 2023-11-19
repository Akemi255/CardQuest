import React from 'react';

const Skeleton = ({ number }) => {
  return (
    Array(number)
      .fill(0)
      .map((_, index) => (
        <div key={index} className="mx-auto w-full p-4 bg-gray-700 shadow-md rounded-md">
          {/* Profile Banner Skeleton */}
          <div className="relative rounded-t-md">
            <div className="w-full h-80 bg-gray-300 animate-pulse"></div>
          </div>
          {/* User Info Skeleton */}
          <div className="p-4 flex flex-col items-center text-center">
            {/* Name Skeleton */}
            <div className="w-1/2 h-8 bg-gray-300 rounded-full animate-pulse"></div>
            {/* Nickname Skeleton */}
            <div className="w-1/3 mt-2 h-6 bg-gray-300 rounded-full animate-pulse"></div>
            {/* Bio Skeleton */}
            <div className="w-2/3 mt-2 h-6 bg-gray-300 rounded-full animate-pulse"></div>
          </div>
        </div>
      ))
  );
};

export default Skeleton;

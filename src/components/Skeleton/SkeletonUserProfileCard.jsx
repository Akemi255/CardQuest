// SkeletonUserProfileCard.jsx
import React from 'react';
import Skeleton from './Skeleton'; // Asegúrate de ajustar la ruta según la ubicación de tu componente Skeleton

const SkeletonUserProfileCard = () => {
    return (
      <div className="mx-auto w-5/5 mt-4 p-4 bg-gray-700 shadow-md rounded-md">
        {/* Profile Banner Skeleton */}
        <div className="relative rounded-t-md">
          <Skeleton number={1} />
        </div>
      
        
      </div>
    );
  };

export default SkeletonUserProfileCard;

// import { useScrollStore } from '@/app/store';
// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';

// export const useScroll = () => {
//   const location = useLocation();
//   const { pathname } = location;
//   const { lastScrollY, setLastScrollY } = useScrollStore((state) => state);
//   React.useEffect(() => {
//     if (lastScrollY) {
//       if (pathname !== 'grid-list') setLastScrollY(0);
//       if (pathname !== 'map-selected') setLastScrollY(0);
//       if (!pathname.includes('details')) setLastScrollY(0);
//     }

//     // console.log('scrollh');
//   }, [pathname]);

//   return {};
// };

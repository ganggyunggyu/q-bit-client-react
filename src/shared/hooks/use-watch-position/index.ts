// import React from 'react';
// import { useUserLocationStore } from '@/app/store';

// interface Position {
//   latitude: number;
//   longitude: number;
//   heading: number | null;
// }

// interface UseWatchPositionParams {
//   successCallback?: (pos: Position) => void;
//   errorCallback?: () => void;
// }

// export const useWatchPosition = ({
//   successCallback,
//   errorCallback,
// }: UseWatchPositionParams = {}) => {
//   const watchIdRef = React.useRef<number | null>(null);
//   const { setLocation, setIsLoading, setIsWatching } = useUserLocationStore();

//   const options: PositionOptions = {
//     enableHighAccuracy: true,
//     maximumAge: 0,
//   };

//   const onSuccess = (result: GeolocationPosition) => {
//     const coords = result.coords;
//     const pos = {
//       latitude: coords.latitude,
//       longitude: coords.longitude,
//       heading: coords.heading,
//     };
//     setLocation(pos.latitude, pos.longitude, pos.heading);
//     setIsLoading(false);
//     successCallback?.(pos);
//   };

//   const onError = (error: GeolocationPositionError) => {
//     errorCallback?.();
//     watchIdRef.current = null;

//     const errorMessages: Record<number, string> = {
//       1: '위치 정보를 허용해주세요',
//       2: '사용할 수 없는 위치입니다.',
//       3: '타임아웃이 발생하였습니다',
//     };
//     console.warn(errorMessages[error.code] || '오류가 발생하였습니다.');
//   };

//   const startWatchPosition = () => {
//     if (!watchIdRef.current) {
//       watchIdRef.current = navigator.geolocation.watchPosition(
//         onSuccess,
//         onError,
//         options,
//       );
//       setIsWatching(true);
//     }
//   };

//   const clearWatchPosition = () => {
//     if (watchIdRef.current !== null) {
//       navigator.geolocation.clearWatch(watchIdRef.current);
//       watchIdRef.current = null;
//       setIsWatching(false);
//     }
//   };

//   const setWatchState = (state: PermissionState) => {
//     if (state === 'granted' || state === 'prompt') {
//       setIsWatching(true);
//       startWatchPosition();
//     } else if (state === 'denied') {
//       setIsWatching(false);
//     }
//   };

//   const getWatchState = () => {
//     if ('permissions' in navigator) {
//       navigator.permissions.query({ name: 'geolocation' }).then((result) => {
//         setWatchState(result.state);
//         result.onchange = () => setWatchState(result.state);
//       });
//     } else {
//       alert('지원되지 않는 브라우저입니다.');
//     }
//   };

//   React.useEffect(() => {
//     getWatchState();

//     return () => {
//       clearWatchPosition();
//     };
//   }, []);

//   return {
//     startWatchPosition,
//     clearWatchPosition,
//     getWatchState,
//   };
// };

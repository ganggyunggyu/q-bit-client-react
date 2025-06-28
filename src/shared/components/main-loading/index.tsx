import React from 'react';
import Lottie from 'lottie-react';
import mainSceneJson from '@/assets/lottie/MainScene.json'; // 경로는 실제 위치에 맞게 수정

export const MainLoading = () => {
  return (
    <div style={{ width: 100, height: 100 }}>
      <Lottie animationData={mainSceneJson} loop={true} />
    </div>
  );
};

import React from 'react';
import { Drawer } from 'vaul';

type BottomSheetProps = {
  isBottomSheet: boolean;
  setIsBottomSheet: (isBottomSheet: boolean) => void;
  snapPoints?: (number | string)[];
  activeSnapPoint?: number | string | null;
  setActiveSnapPoint?: (snapPoint: number | string | null) => void;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * 드래그 가능한 바텀시트 컴포넌트 (Vaul 기반)
 *
 * @param isBottomSheet 바텀시트를 표시할지 여부
 * @param setIsBottomSheet 바텀시트 열림/닫힘 상태를 제어하는 setter
 * @param snapPoints 스냅 포인트 배열 (예: [0.5, 1])
 * @param children 바텀시트 내부에 보여줄 콘텐츠
 */
export const BottomSheet: React.FC<BottomSheetProps> = ({
  isBottomSheet,
  setIsBottomSheet,
  snapPoints,
  activeSnapPoint,
  setActiveSnapPoint,
  children,
}) => {
  return (
    <Drawer.Root
      open={isBottomSheet}
      onOpenChange={setIsBottomSheet}
      snapPoints={snapPoints}
      activeSnapPoint={activeSnapPoint}
      setActiveSnapPoint={setActiveSnapPoint}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-black/40" />
        <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-2xl bg-bg-primary outline-none">
          {/* 드래그 핸들 */}
          <div className="mx-auto mt-4 mb-2 h-1.5 w-12 shrink-0 rounded-full bg-text-tertiary/30" />

          {/* 컨텐츠 */}
          <div className="flex-1 overflow-y-auto p-6 pt-2">
            {children}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

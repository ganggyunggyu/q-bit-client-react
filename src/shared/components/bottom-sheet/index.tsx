import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

type BottomSheetProps = {
  isBottomSheet: boolean;
  title?: string;
  setIsBottomSheet: (isBottomSheet: boolean) => void;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * 화면 하단에서 슬라이드 형태로 나타나는 바텀시트 컴포넌트입니다.
 *
 * @param isBottomSheet 바텀시트를 표시할지 여부 (`true`면 열림)
 * @param title 상단에 보여질 제목 텍스트 (선택사항)
 * @param setIsBottomSheet 바텀시트 열림/닫힘 상태를 제어하는 setter 함수
 * @param children 바텀시트 내부에 보여줄 콘텐츠
 */
export const BottomSheet: React.FC<BottomSheetProps> = ({
  isBottomSheet,
  setIsBottomSheet,
  title,
  children,
}) => {
  if (typeof window === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isBottomSheet && (
        <main className="fixed inset-0 z-50 flex items-end justify-center">
          {/* 바텀시트의 배경입니다 */}
          <motion.div
            className="absolute inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsBottomSheet(false)}
          />

          {/* 바텀시트 본체입니다 */}
          <motion.div
            className="relative w-full max-w-md bg-white rounded-t-2xl p-6 shadow-xl"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <header className="flex justify-between items-center mb-4">
              <p className="text-lg font-semibold">{title}</p>
              <button className="" onClick={() => setIsBottomSheet(false)}>
                닫기
              </button>
            </header>

            {children}
          </motion.div>
        </main>
      )}
    </AnimatePresence>,
    document.body,
  );
};

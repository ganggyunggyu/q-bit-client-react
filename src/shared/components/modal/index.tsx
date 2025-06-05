import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

type ModalProps = {
  isOpen: boolean;
  title?: string;
  setIsOpen: (open: boolean) => void;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * 화면 중앙에 떠오르는 기본 모달 컴포넌트입니다.
 *
 * @param isOpen 모달의 열림 여부를 제어합니다. (`true`면 표시)
 * @param title 모달 상단에 노출될 제목 텍스트입니다. (선택사항)
 * @param setIsOpen 모달 열림/닫힘을 조절하는 함수입니다.
 * @param children 모달 내부에 들어갈 콘텐츠를 작성합니다.
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  title,
  children,
}) => {
  // SSR 환경 방지용: 브라우저 환경에서만 실행되도록 조건 처리
  if (typeof window === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* 배경 오버레이: 클릭 시 모달 닫힘 */}
          <motion.div
            className="absolute inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
          />

          {/* 모달 본체: scale 애니메이션을 사용해 자연스럽게 팝업 */}
          <motion.div
            className="relative w-full mx-2 max-w-md bg-white rounded-xl shadow-lg z-10"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <header className=" flex justify-center items-center py-6">
              {/* <div className="w-[24px]" /> */}
              <p className=" text-lg font-semibold">{title}</p>
              {/* <button onClick={() => setIsOpen(false)}>닫기</button> */}
            </header>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

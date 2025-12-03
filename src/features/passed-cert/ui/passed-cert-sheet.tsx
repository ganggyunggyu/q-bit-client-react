import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Calendar, Award, FileText, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

import { BottomSheet, Button, Input } from '@/shared';
import { useCreatePassedCert, PassedType, PASSED_TYPE_LABELS } from '@/entities/passed-cert';

interface PassedCertSheetProps {
  isOpen: boolean;
  onClose: () => void;
  certId: string;
  certName: string;
  onSuccess?: () => void;
}

const passedTypes: PassedType[] = ['written', 'practical', 'final'];

export const PassedCertSheet: React.FC<PassedCertSheetProps> = ({
  isOpen,
  onClose,
  certId,
  certName,
  onSuccess,
}) => {
  const [type, setType] = useState<PassedType>('final');
  const [passedDate, setPassedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [score, setScore] = useState('');
  const [memo, setMemo] = useState('');

  const { mutate: createPassedCert, isPending } = useCreatePassedCert();

  const handleSubmit = () => {
    if (!passedDate) {
      toast.error('합격일을 입력해주세요');
      return;
    }

    const scoreNum = score ? Number(score) : undefined;
    if (scoreNum !== undefined && (scoreNum < 0 || scoreNum > 100)) {
      toast.error('점수는 0~100 사이로 입력해주세요');
      return;
    }

    createPassedCert(
      {
        certId,
        passedDate,
        type,
        score: scoreNum,
        memo: memo || undefined,
      },
      {
        onSuccess: () => {
          toast.success('합격을 축하합니다! 🎉');
          onSuccess?.();
          handleClose();
        },
        onError: () => {
          toast.error('합격 등록에 실패했습니다');
        },
      },
    );
  };

  const handleClose = () => {
    setType('final');
    setPassedDate(new Date().toISOString().split('T')[0]);
    setScore('');
    setMemo('');
    onClose();
  };

  return (
    <BottomSheet isBottomSheet={isOpen} setIsBottomSheet={handleClose}>
      <div className="flex flex-col gap-5 pb-safe">
        {/* 헤더 */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-green/10">
            <Trophy className="text-green" size={24} />
          </div>
          <div>
            <h2 className="font-headline-sb text-text-primary">합격 등록</h2>
            <p className="font-caption-m text-text-tertiary">{certName}</p>
          </div>
        </div>

        {/* 합격 유형 */}
        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-medium text-text-secondary ml-1">
            합격 유형
          </label>
          <div className="flex gap-2">
            {passedTypes.map((t) => (
              <motion.button
                key={t}
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={() => setType(t)}
                className={`flex-1 py-3 rounded-lg font-body-sb transition-all ${
                  type === t
                    ? 'bg-primary text-white'
                    : 'bg-bg-secondary text-text-secondary hover:bg-bg-tertiary'
                }`}
              >
                {PASSED_TYPE_LABELS[t]}
              </motion.button>
            ))}
          </div>
        </div>

        {/* 합격일 */}
        <Input
          type="date"
          label="합격일"
          value={passedDate}
          onChange={(e) => setPassedDate(e.target.value)}
          leftIcon={<Calendar size={18} />}
        />

        {/* 점수 (선택) */}
        <Input
          type="number"
          label="점수 (선택)"
          placeholder="0 ~ 100"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          min={0}
          max={100}
          leftIcon={<Award size={18} />}
          helperMessage="점수를 입력하면 합격 기록에 함께 저장돼요"
        />

        {/* 메모 (선택) */}
        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-medium text-text-secondary ml-1">
            메모 (선택)
          </label>
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="합격 소감이나 공부 팁을 남겨보세요"
            maxLength={500}
            rows={3}
            className="w-full px-4 py-3 text-[15px] text-text-primary placeholder:text-text-tertiary bg-bg-secondary rounded-lg border-2 border-transparent focus:bg-bg-primary focus:border-primary outline-none resize-none transition-all"
          />
          <p className="text-[12px] text-text-tertiary text-right">
            {memo.length}/500
          </p>
        </div>

        {/* 버튼 */}
        <div className="flex gap-3 pt-2">
          <Button
            variant="secondary"
            size="lg"
            onClick={handleClose}
            className="flex-1"
          >
            취소
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={handleSubmit}
            disabled={isPending}
            className="flex-[2]"
          >
            {isPending ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              '합격 등록하기'
            )}
          </Button>
        </div>
      </div>
    </BottomSheet>
  );
};

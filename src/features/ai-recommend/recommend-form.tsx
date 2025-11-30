import React from 'react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import {
  AiRecommendRequest,
  RECOMMEND_STEPS,
  useGetAiRecommendations,
  useAiRecommendStore,
} from '@/entities/ai-recommend';
import { Button, Input } from '@/shared';

const LOADING_MESSAGES = [
  '정보를 분석하고 있어요',
  '최적의 자격증을 찾고 있어요',
  '맞춤 추천을 준비하고 있어요',
  '거의 다 됐어요!',
];

const AnalyzingOverlay = () => {
  const [messageIndex, setMessageIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg-primary/95 backdrop-blur-sm"
    >
      <div className="relative flex flex-col items-center gap-8">
        <div className="relative">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-full bg-primary/20 blur-xl"
            style={{ width: 120, height: 120 }}
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="relative flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary-dark"
          >
            <Sparkles size={40} className="text-white" />
          </motion.div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <h3 className="font-title-l text-text-primary">AI가 분석 중이에요</h3>
          <AnimatePresence mode="wait">
            <motion.p
              key={messageIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="font-body-m text-text-secondary"
            >
              {LOADING_MESSAGES[messageIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-2 h-2 rounded-full bg-primary"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const RecommendForm = () => {
  const { setResult } = useAiRecommendStore();
  const { mutate: getRecommendations, isPending: isLoading } =
    useGetAiRecommendations();
  const [currentStep, setCurrentStep] = React.useState(0);
  const [formData, setFormData] = React.useState<AiRecommendRequest>({});

  const step = RECOMMEND_STEPS[currentStep];
  const isLastStep = currentStep === RECOMMEND_STEPS.length - 1;
  const isFirstStep = currentStep === 0;

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStep((prev) => prev + 1);
    } else {
      getRecommendations(formData, {
        onSuccess: (response) => {
          setResult(response);
          toast.success('AI 추천이 완료되었습니다!');
        },
        onError: (error) => {
          console.error('AI 추천 실패:', error);
          toast.error('AI 추천에 실패했습니다. 다시 시도해주세요.');
        },
      });
    }
  };

  const handlePrev = () => {
    if (!isFirstStep) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleInputChange = (value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [step.field]: value,
    }));
  };

  const canProceed = () => {
    const value = formData[step.field];
    if (step.field === 'additionalInfo') return true;
    return value !== undefined && value !== '';
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && canProceed() && !isLoading) {
      e.preventDefault();
      handleNext();
    }
  };

  return (
    <div className="flex flex-col h-full px-(--layout-page-px) py-(--layout-section-gap)">
      <div className="mb-(--layout-section-gap)">
        <div className="flex gap-1.5 p-1 bg-bg-tertiary rounded-full">
          {RECOMMEND_STEPS.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 flex-1 rounded-full transition-all duration-slow ${
                idx <= currentStep
                  ? 'bg-primary'
                  : 'bg-border-gray'
              }`}
            />
          ))}
        </div>
        <p className="font-caption-m text-text-tertiary mt-2 text-center">
          {currentStep + 1} / {RECOMMEND_STEPS.length}
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="flex-1"
        >
          <h3 className="font-title-m text-text-primary mb-6">
            {step.question}
          </h3>

          {step.type === 'select' && step.options && (
            <div className="flex flex-col gap-3">
              {step.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    handleInputChange(option.value);
                    if (!isLastStep) {
                      setTimeout(() => setCurrentStep((prev) => prev + 1), 150);
                    }
                  }}
                  className={`p-4 rounded-md transition-all duration-normal text-left active:scale-[0.98] ${
                    formData[step.field] === option.value
                      ? 'bg-primary/10 border-2 border-primary shadow-primary'
                      : 'bg-bg-primary border-2 border-transparent shadow-xs hover:shadow-sm'
                  }`}
                >
                  <span className="font-body-sb text-text-primary">
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          )}

          {step.type === 'text' && (
            <Input
              type="text"
              variant="outlined"
              value={(formData[step.field] as string) || ''}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={step.placeholder}
            />
          )}

          {step.type === 'number' && (
            <Input
              type="number"
              variant="outlined"
              value={(formData[step.field] as number) || ''}
              onChange={(e) => handleInputChange(Number(e.target.value))}
              onKeyDown={handleKeyDown}
              placeholder={step.placeholder}
              min={1}
              max={100}
            />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-3 mt-(--layout-section-gap)">
        {!isFirstStep && (
          <Button onClick={handlePrev} variant="secondary" disabled={isLoading}>
            <ChevronLeft size={20} />
            이전
          </Button>
        )}
        <Button
          onClick={handleNext}
          disabled={!canProceed() || isLoading}
          className="flex-1 gap-2"
          size="lg"
        >
          {isLastStep ? (
            '추천 받기'
          ) : (
            <>
              다음
              <ChevronRight size={20} />
            </>
          )}
        </Button>
      </div>

      <AnimatePresence>{isLoading && <AnalyzingOverlay />}</AnimatePresence>
    </div>
  );
};

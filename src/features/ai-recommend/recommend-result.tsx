import { motion } from 'framer-motion';
import { Sparkles, Clock, TrendingUp } from 'lucide-react';
import { RecommendedCert, useAiRecommendStore } from '@/entities/ai-recommend';
import { Button, useRouter } from '@/shared';

const DifficultyBadge: React.FC<{ difficulty: RecommendedCert['difficulty'] }> = ({
  difficulty,
}) => {
  const config = {
    easy: { label: '쉬움', color: 'bg-green/10 text-green' },
    medium: { label: '보통', color: 'bg-accent/10 text-navy' },
    hard: { label: '어려움', color: 'bg-urgent/10 text-urgent' },
  };

  const { label, color } = config[difficulty];

  return (
    <span
      className={`px-3 py-1 rounded-full text-caption-sb ${color}`}
    >
      {label}
    </span>
  );
};

const CertCard: React.FC<{ cert: RecommendedCert; index: number }> = ({
  cert,
  index,
}) => {
  const { navigate } = useRouter();

  const handleClick = () => {
    navigate(`/cert-detail/${cert.certId}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.15 }}
      onClick={handleClick}
      className="relative p-5 rounded-xl bg-bg-primary/90 backdrop-blur-sm cursor-pointer active:scale-[0.98] transition-all duration-normal shadow-md hover:shadow-lg border border-primary/10"
    >
      <div className="absolute top-3 right-3">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-linear-to-r from-accent to-accent/80 text-text-primary shadow-sm">
          <TrendingUp size={14} />
          <span className="font-caption-sb">{cert.matchScore}%</span>
        </div>
      </div>

      <div className="pr-16">
        <h3 className="font-headline-sb text-navy mb-3">{cert.name}</h3>
        <div className="flex items-center gap-2 mb-3">
          <DifficultyBadge difficulty={cert.difficulty} />
          <div className="flex items-center gap-1.5 text-neutral bg-bg-gray px-2.5 py-1 rounded-full">
            <Clock size={14} />
            <span className="font-caption-m">{cert.expectedPeriod}</span>
          </div>
        </div>
      </div>

      <p className="font-body-m text-neutral line-clamp-2 leading-relaxed">
        {cert.reason}
      </p>
    </motion.div>
  );
};

export const RecommendResult = () => {
  const { result, reset } = useAiRecommendStore();

  if (!result) return null;
  return (
    <div className="flex flex-col h-full px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-accent blur-lg opacity-50 animate-pulse" />
            <Sparkles className="relative text-accent drop-shadow-sm" size={28} />
          </div>
          <h2 className="font-title-sb text-navy">
            AI 추천 결과
          </h2>
        </div>

        <div className="p-5 rounded-3xl bg-linear-to-br from-bg-primary to-white border border-primary/20 shadow-lg shadow-primary/10">
          <p className="font-body-m text-navy leading-relaxed">
            {result.summary}
          </p>
          {result.aiMessage && (
            <div className="flex items-start gap-2 mt-4 p-3 rounded-2xl bg-accent/10">
              <span className="text-lg">💡</span>
              <p className="font-body-sb text-navy">
                {result.aiMessage}
              </p>
            </div>
          )}
        </div>
      </motion.div>

      <div className="flex-1 overflow-y-auto pb-4">
        <h3 className="text-title-m text-navy mb-4">
          추천 자격증 ({result.recommendations.length}개)
        </h3>

        <div className="flex flex-col gap-4">
          {result.recommendations.map((cert, index) => (
            <CertCard key={cert.certId} cert={cert} index={index} />
          ))}
        </div>
      </div>

      <div className="mt-4">
        <Button onClick={reset} variant="outline" size="lg">
          다시 추천 받기
        </Button>
      </div>
    </div>
  );
};

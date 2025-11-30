import { AnimatePresence, motion } from 'framer-motion';
import { AppBar } from '@/widgets';
import { RecommendForm, RecommendResult } from '@/features/ai-recommend';
import { useAiRecommendStore } from '@/entities/ai-recommend';

export const AiRecommendPage = () => {
  const { result } = useAiRecommendStore();

  return (
    <main className="relative min-h-screen flex flex-col bg-bg-secondary pt-(--layout-page-pt)">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(98,194,176,0.08),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(243,201,105,0.05),transparent_60%)]" />
      <div className="relative z-10 flex flex-col flex-1">
        <AppBar variant="titleBack" title="AI 추천" />

        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 overflow-y-auto"
            >
              <RecommendForm />
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 overflow-y-auto"
            >
              <RecommendResult />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default AiRecommendPage;

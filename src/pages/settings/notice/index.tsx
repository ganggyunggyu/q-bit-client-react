import { AppBar } from '@/widgets';
import { ChevronRight, Megaphone } from 'lucide-react';
import { motion } from 'framer-motion';

interface Notice {
  id: string;
  title: string;
  date: string;
  isNew: boolean;
}

const MOCK_NOTICES: Notice[] = [
  {
    id: '1',
    title: '자박 서비스 오픈 안내',
    date: '2024.12.01',
    isNew: true,
  },
  {
    id: '2',
    title: '개인정보처리방침 변경 안내',
    date: '2024.11.28',
    isNew: false,
  },
  {
    id: '3',
    title: '시스템 점검 안내 (12/5 02:00-04:00)',
    date: '2024.11.25',
    isNew: false,
  },
];

const NoticePage = () => {
  const handleNoticeClick = (id: string) => {
    // TODO: 공지사항 상세 페이지로 이동
    console.log('공지사항 클릭:', id);
  };

  return (
    <main className="min-h-screen bg-bg-secondary">
      <AppBar variant="titleBack" title="공지사항" />

      <section className="p-4">
        {MOCK_NOTICES.length > 0 ? (
          <div className="bg-bg-primary rounded-xl overflow-hidden">
            {MOCK_NOTICES.map((notice, index) => (
              <motion.button
                key={notice.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleNoticeClick(notice.id)}
                className={`w-full flex items-center gap-3 p-4 text-left active:bg-bg-secondary transition-colors ${
                  index !== MOCK_NOTICES.length - 1 ? 'border-b border-divide' : ''
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {notice.isNew && (
                      <span className="px-2 py-0.5 bg-primary text-white text-xs rounded-full">
                        NEW
                      </span>
                    )}
                    <p className="font-body-m text-text-primary line-clamp-1">
                      {notice.title}
                    </p>
                  </div>
                  <p className="font-caption-m text-text-tertiary">
                    {notice.date}
                  </p>
                </div>
                <ChevronRight size={20} className="text-text-tertiary" />
              </motion.button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <Megaphone size={48} className="text-text-tertiary mb-4" />
            <p className="font-body-m text-text-tertiary">
              등록된 공지사항이 없습니다
            </p>
          </div>
        )}
      </section>
    </main>
  );
};

export default NoticePage;

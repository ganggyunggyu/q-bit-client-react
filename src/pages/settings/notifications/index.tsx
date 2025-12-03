import { AppBar } from '@/widgets';
import { Bell, Calendar, Clock } from 'lucide-react';
import React from 'react';

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

const ToggleSwitch = ({ enabled, onChange }: ToggleSwitchProps) => (
  <button
    onClick={() => onChange(!enabled)}
    className={`relative w-12 h-7 rounded-full transition-colors ${
      enabled ? 'bg-primary' : 'bg-bg-tertiary'
    }`}
  >
    <div
      className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${
        enabled ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </button>
);

interface NotificationItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

const NotificationItem = ({
  icon,
  title,
  description,
  enabled,
  onChange,
}: NotificationItemProps) => (
  <div className="flex items-center gap-4 p-4 bg-bg-primary rounded-xl">
    <div className="w-10 h-10 rounded-full bg-bg-secondary flex items-center justify-center text-text-secondary">
      {icon}
    </div>
    <div className="flex-1">
      <p className="font-body-sb text-text-primary">{title}</p>
      <p className="font-caption-m text-text-tertiary">{description}</p>
    </div>
    <ToggleSwitch enabled={enabled} onChange={onChange} />
  </div>
);

const NotificationsPage = () => {
  const [settings, setSettings] = React.useState({
    all: true,
    examReminder: true,
    studyReminder: false,
  });

  const handleChange = (key: keyof typeof settings) => (enabled: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: enabled }));
    // TODO: 설정 저장 API 호출
  };

  return (
    <main className="min-h-screen bg-bg-secondary">
      <AppBar variant="titleBack" title="푸시 알림" />

      <section className="p-4 flex flex-col gap-3">
        <NotificationItem
          icon={<Bell size={20} />}
          title="전체 알림"
          description="모든 푸시 알림을 받습니다"
          enabled={settings.all}
          onChange={handleChange('all')}
        />

        <NotificationItem
          icon={<Calendar size={20} />}
          title="시험 리마인더"
          description="시험 일정 3일 전 알림"
          enabled={settings.examReminder}
          onChange={handleChange('examReminder')}
        />

        <NotificationItem
          icon={<Clock size={20} />}
          title="학습 리마인더"
          description="매일 설정한 시간에 알림"
          enabled={settings.studyReminder}
          onChange={handleChange('studyReminder')}
        />
      </section>
    </main>
  );
};

export default NotificationsPage;

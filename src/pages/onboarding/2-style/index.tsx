import React from 'react';
import { cn } from '@/shared/lib/cn';
import { useRouter } from '@/shared';
import { useSearchParams } from 'react-router';
import { useJoin } from '@/entities/auth/hooks/auth.hooks';
import { JoinUserRequest, RemindType } from '@/entities/auth/model/user.model';

interface NotificationOptionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  description: string;
  selected: boolean;
}

const OPTIONS = [
  {
    key: RemindType.OFTEN,
    title: '자주 알려줘야 까먹지 않아요.',
    description: '까먹지 않도록 아침 저녁으로 알려드릴게요.',
  },
  {
    key: RemindType.DEFAULT,
    title: '기본적인 알림이면 충분해요.',
    description: '일정이 가까워지면 미리 알려드릴게요.',
  },
  {
    key: RemindType.MINIMAL,
    title: '너무 많은 알림은 싫어요.',
    description: '당일과 마감일 전에 중점적으로 알려드릴게요.',
  },
];

const NotificationOption: React.FC<NotificationOptionProps> = ({
  title,
  description,
  selected,
  className,
  ...props
}) => {
  return (
    <button
      type="button"
      className={cn(
        'w-full text-left p-4 rounded-xl transition cursor-pointer',
        selected
          ? 'border-2 border-blue-500 text-blue-600 bg-blue-50'
          : 'border border-gray-300 text-gray-800',
        className,
      )}
      {...props}
    >
      <p className="font-medium">{title}</p>
      <p
        className={cn(
          'text-sm mt-1',
          selected ? 'text-blue-500' : 'text-gray-500',
        )}
      >
        {description}
      </p>
    </button>
  );
};

export const Step2Style = () => {
  const [remindType, setRemindType] = React.useState<RemindType>(RemindType.DEFAULT);

  const [searchParams] = useSearchParams();

  const { navigate } = useRouter();

  const kakaoId = searchParams.get('kakaoId') ?? '';
  const email = searchParams.get('email') ?? '';
  const displayName = searchParams.get('displayName') ?? '';
  const interestedCertsRaw = searchParams.get('interestedCerts') ?? '[]';

  const interestedCerts = React.useMemo(() => {
    try {
      return JSON.parse(interestedCertsRaw);
    } catch {
      return [];
    }
  }, [interestedCertsRaw]);

  const handleSelect = (key: string) => {
    if (Object.values(RemindType).includes(key as RemindType)) {
      setRemindType(key as RemindType);
    } else {
      setRemindType(RemindType.DEFAULT);
    }
  };

  const { mutate: joinUser } = useJoin();

  const handleSubmit = () => {
    try {
      const params: JoinUserRequest = {
        kakaoId,
        email,
        displayName,
        interestedCerts,
        remindType,
      };
      console.log(params);
      joinUser(params);

      navigate('/?isAuth=true');
    } catch (err) {
      console.error('회원가입 실패', err);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-b from-white to-blue-50">
      <article className="w-full max-w-md text-center">
        <header className="mb-6">
          <h1 className="text-xl font-semibold text-gray-900 mb-2">
            사용자님은 어떤 스타일인가요?
          </h1>
          <p className="text-gray-600">
            스타일에 따라 알림이 달라져요. <br />
            추후에 수정할 수 있으니 걱정 마세요!
          </p>
        </header>

        <section className="flex flex-col gap-4 mb-6">
          {OPTIONS.map(({ key, title, description }) => (
            <NotificationOption
              key={key}
              title={title}
              description={description}
              selected={remindType === key}
              onClick={() => handleSelect(key)}
            />
          ))}
        </section>

        <footer>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-3 border border-blue-500 rounded-full text-blue-500 font-medium hover:bg-blue-50 transition"
          >
            선택완료
          </button>
        </footer>
      </article>
    </main>
  );
};

export default Step2Style;

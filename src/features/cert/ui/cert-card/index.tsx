import { Heart, ChevronRight, Clock, Calendar } from 'lucide-react';
import { Cert } from '@/entities';
import React from 'react';
import { cn, useRouter } from '@/shared';

interface CertCardProps {
  cert: Cert;
  dDay: number;
  isLiked?: boolean;
  variant?: 'default' | 'compact';
}

const getTypeStyle = (type: string) => {
  switch (type) {
    case '국가기술자격':
      return 'bg-gradient-to-r from-emerald-500/15 to-teal-500/15 text-emerald-600 border border-emerald-500/20';
    case '국가전문자격':
      return 'bg-gradient-to-r from-blue-500/15 to-indigo-500/15 text-blue-600 border border-blue-500/20';
    case '민간자격':
      return 'bg-gradient-to-r from-amber-500/15 to-orange-500/15 text-amber-600 border border-amber-500/20';
    default:
      return 'bg-[--color-bg-tertiary] text-[--color-text-secondary]';
  }
};

const getDDayConfig = (dDay: number) => {
  if (dDay === 0) {
    return {
      text: 'D-Day',
      bg: 'bg-gradient-to-br from-rose-500 to-pink-600',
      textColor: 'text-white',
      shadow: 'shadow-lg shadow-rose-500/30',
      pulse: true,
    };
  }
  if (dDay <= 3) {
    return {
      text: `D-${dDay}`,
      bg: 'bg-gradient-to-br from-rose-500 to-red-600',
      textColor: 'text-white',
      shadow: 'shadow-md shadow-rose-500/25',
      pulse: false,
    };
  }
  if (dDay <= 7) {
    return {
      text: `D-${dDay}`,
      bg: 'bg-gradient-to-br from-amber-400 to-orange-500',
      textColor: 'text-white',
      shadow: 'shadow-md shadow-amber-500/25',
      pulse: false,
    };
  }
  if (dDay <= 14) {
    return {
      text: `D-${dDay}`,
      bg: 'bg-gradient-to-br from-blue-400 to-indigo-500',
      textColor: 'text-white',
      shadow: 'shadow-md shadow-blue-500/20',
      pulse: false,
    };
  }
  return {
    text: `D-${dDay}`,
    bg: 'bg-gradient-to-br from-slate-100 to-slate-200',
    textColor: 'text-slate-600',
    shadow: 'shadow-sm',
    pulse: false,
  };
};

export const CertCard: React.FC<CertCardProps> = ({
  cert,
  dDay,
  isLiked,
  variant = 'default',
}) => {
  const [isLike, setIsLike] = React.useState(isLiked);
  const { navigate } = useRouter();
  const dDayConfig = getDDayConfig(dDay);

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLike(!isLike);
  };

  const handleCertClick = () => {
    navigate(`/search/${cert._id}`);
  };

  return (
    <article
      onClick={handleCertClick}
      className={cn(
        'group relative overflow-hidden',
        'flex gap-4 p-4 rounded-2xl',
        'bg-white',
        'border border-slate-200/60',
        'shadow-sm hover:shadow-xl hover:shadow-slate-200/50',
        'transition-all duration-300 ease-out',
        'hover:-translate-y-0.5 hover:border-slate-300/80',
        'active:scale-[0.98] cursor-pointer',
      )}
    >
      {/* 배경 그라데이션 효과 */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* D-Day 배지 */}
      <div
        className={cn(
          'relative shrink-0 flex flex-col items-center justify-center',
          'w-16 h-16 rounded-xl',
          dDayConfig.bg,
          dDayConfig.shadow,
          'transition-transform duration-300 group-hover:scale-105',
          dDayConfig.pulse && 'animate-pulse',
        )}
      >
        <span className={cn('font-bold text-sm tracking-tight', dDayConfig.textColor)}>
          {dDayConfig.text}
        </span>
        <div className={cn('flex items-center gap-0.5 mt-0.5', dDayConfig.textColor, 'opacity-80')}>
          <Clock size={10} />
          <span className="text-[10px] font-medium">접수</span>
        </div>
      </div>

      {/* 자격증 정보 */}
      <div className="relative flex-1 min-w-0 flex flex-col justify-center gap-1.5">
        <h3 className="font-bold text-slate-800 truncate pr-8 group-hover:text-slate-900 transition-colors">
          {cert.name}
        </h3>
        <p className="text-sm text-slate-500 truncate flex items-center gap-1">
          <Calendar size={12} className="shrink-0" />
          {cert.agency}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span
            className={cn(
              'inline-flex px-2.5 py-1 rounded-lg text-xs font-semibold',
              'transition-all duration-200',
              getTypeStyle(cert.type),
            )}
          >
            {cert.type}
          </span>
        </div>
      </div>

      {/* 액션 버튼 */}
      <div className="relative shrink-0 flex flex-col items-center justify-between py-1">
        <button
          type="button"
          className={cn(
            'w-9 h-9 rounded-xl flex items-center justify-center',
            'transition-all duration-200 ease-out',
            'hover:scale-110 active:scale-95',
            isLike
              ? 'bg-gradient-to-br from-rose-100 to-pink-100 shadow-sm'
              : 'bg-slate-100 hover:bg-slate-200',
          )}
          aria-label={isLike ? '찜 해제' : '찜하기'}
          onClick={toggleLike}
        >
          <Heart
            size={16}
            className={cn(
              'transition-all duration-200',
              isLike
                ? 'fill-rose-500 text-rose-500 scale-110'
                : 'text-slate-400 group-hover:text-slate-500',
            )}
          />
        </button>
        <div className="w-7 h-7 rounded-full flex items-center justify-center bg-slate-100 group-hover:bg-[--color-primary] transition-all duration-200">
          <ChevronRight
            size={16}
            className="text-slate-400 group-hover:text-white transition-colors duration-200"
          />
        </div>
      </div>
    </article>
  );
};

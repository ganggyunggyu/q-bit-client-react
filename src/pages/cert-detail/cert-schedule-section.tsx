import React from 'react';
import { CertSchedule } from '@/entities/cert/model/cert.model';

interface CertScheduleSectionProps {
  schedule?: CertSchedule[];
  hasSchedule: boolean;
}

const formatDate = (dateStr: string | undefined) => {
  if (!dateStr) return '-';
  return `${dateStr.slice(0, 4)}.${dateStr.slice(4, 6)}.${dateStr.slice(6, 8)}`;
};

export const CertScheduleSection: React.FC<CertScheduleSectionProps> = ({
  schedule,
  hasSchedule,
}) => {
  if (!hasSchedule) {
    return (
      <section className="p-4">
        <p className="text-body-m text-black-tertiary">
          일정 데이터를 준비중입니다.
        </p>
      </section>
    );
  }

  return (
    <section className="p-4 flex flex-col gap-6 overflow-y-auto pb-[120px]">
      {schedule && schedule.length > 0 ? (
        schedule.map((sch) => (
          <article
            key={sch.round}
            className="p-4 rounded-2xl border border-[--color-border-gray] bg-white flex flex-col gap-4"
          >
            <p className="font-headline-m text-[--color-primary]">{sch.round}</p>

            <ScheduleItem
              label="필기 접수"
              start={sch.writtenRegStart}
              end={sch.writtenRegEnd}
            />

            <ScheduleItem
              label="필기 시험"
              start={sch.writtenExamStart}
              end={sch.writtenExamEnd}
            />

            <ScheduleItem
              label="필기 발표"
              date={sch.writtenResultDate}
            />

            <ScheduleItem
              label="실기 접수"
              start={sch.practicalRegStart}
              end={sch.practicalRegEnd}
            />

            <ScheduleItem
              label="실기 시험"
              start={sch.practicalExamStart}
              end={sch.practicalExamEnd}
            />

            <ScheduleItem
              label="실기 발표"
              date={sch.practicalResultDate}
            />
          </article>
        ))
      ) : (
        <p className="text-body-m text-black-tertiary">
          등록된 일정이 없습니다.
        </p>
      )}
    </section>
  );
};

interface ScheduleItemProps {
  label: string;
  start?: string;
  end?: string;
  date?: string;
}

const ScheduleItem: React.FC<ScheduleItemProps> = ({ label, start, end, date }) => (
  <div className="flex flex-col gap-2">
    <p className="text-body-m text-[--color-navy]">{label}</p>
    <div className="bg-[--color-bg-gray] rounded-xl p-3 text-body-s text-[--color-neutral]">
      {date ? formatDate(date) : `${formatDate(start)} ~ ${formatDate(end)}`}
    </div>
  </div>
);

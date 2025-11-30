import React from 'react';
import { Award, ChevronDown, X } from 'lucide-react';
import { useGetMyRemindCerts } from '@/entities/cert/hooks/cert.hooks';
import { cn } from '@/shared';

interface CertSelectorProps {
  selectedCertId?: string;
  selectedCertName?: string;
  onSelect: (certId: string | undefined, certName: string | undefined) => void;
}

export const CertSelector: React.FC<CertSelectorProps> = ({
  selectedCertId,
  selectedCertName,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { data: remindCertsData } = useGetMyRemindCerts();
  const remindCerts = Array.isArray(remindCertsData) ? remindCertsData : [];

  if (!remindCerts.length) return null;

  const handleSelect = (certId: string, certName: string) => {
    if (selectedCertId === certId) {
      onSelect(undefined, undefined);
    } else {
      onSelect(certId, certName);
    }
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(undefined, undefined);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-full text-[--color-text-secondary] font-caption-m transition-all duration-[--transition-fast]',
          selectedCertId
            ? 'bg-[--color-primary]/10 text-[--color-primary]'
            : 'bg-[--color-bg-secondary] hover:bg-[--color-bg-tertiary]',
        )}
      >
        <Award size={14} />
        <span className="max-w-[120px] truncate">
          {selectedCertName || '자격증 선택'}
        </span>
        {selectedCertId ? (
          <X size={14} onClick={handleClear} className="hover:text-[--color-danger]" />
        ) : (
          <ChevronDown size={14} className={cn('transition-transform', isOpen && 'rotate-180')} />
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-0 top-full mt-2 z-50 min-w-[200px] max-w-[280px] py-2 bg-[--color-bg-primary] rounded-[--radius-md] shadow-[--shadow-md] border border-[--color-divide]">
            <p className="px-3 py-1.5 text-[--color-text-tertiary] font-caption-m">
              내 리마인드 자격증
            </p>
            {remindCerts.map((cert) => (
              <button
                key={cert._id}
                type="button"
                onClick={() => handleSelect(cert._id, cert.name)}
                className={cn(
                  'w-full px-3 py-2 text-left font-body-m transition-colors',
                  selectedCertId === cert._id
                    ? 'bg-[--color-primary]/10 text-[--color-primary]'
                    : 'text-[--color-text-primary] hover:bg-[--color-bg-secondary]',
                )}
              >
                {cert.name}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

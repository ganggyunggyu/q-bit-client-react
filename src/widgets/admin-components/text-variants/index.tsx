export const TextVariants = () => {
  const textClasses = [
    { className: 'font-display-1', label: 'Display 1' },
    { className: 'font-display-2', label: 'Display 2' },
    { className: 'font-title-sb', label: 'Title SB' },
    { className: 'font-title-m', label: 'Title M' },
    { className: 'font-headline-sb', label: 'Headline SB' },
    { className: 'font-headline-m', label: 'Headline M' },
    { className: 'font-body-sb', label: 'Body SB' },
    { className: 'font-body-m', label: 'Body M' },
    { className: 'font-caption-sb', label: 'Caption SB' },
    { className: 'font-caption-m', label: 'Caption M' },
  ];

  return (
    <section className="space-y-4">
      <h2 className="text-display-2">🖋 텍스트 스타일</h2>
      {textClasses.map(({ className, label }) => (
        <div key={className} className="flex items-center gap-6">
          <p className={`font-black-normal ${className}`}>{label}</p>
        </div>
      ))}
    </section>
  );
};

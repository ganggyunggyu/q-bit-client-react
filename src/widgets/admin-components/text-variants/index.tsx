export const TextVariants = () => {
  const textClasses = [
    { className: 'text-display-1', label: 'Display 1' },
    { className: 'text-display-2', label: 'Display 2' },
    { className: 'text-title-sb', label: 'Title SB' },
    { className: 'text-title-m', label: 'Title M' },
    { className: 'text-headline-sb', label: 'Headline SB' },
    { className: 'text-headline-m', label: 'Headline M' },
    { className: 'text-body-sb', label: 'Body SB' },
    { className: 'text-body-m', label: 'Body M' },
    { className: 'text-caption-sb', label: 'Caption SB' },
    { className: 'text-caption-m', label: 'Caption M' },
  ];

  return (
    <section className="space-y-4">
      <h2 className="text-display-2">🖋 텍스트 스타일</h2>
      {textClasses.map(({ className, label }) => (
        <div key={className} className="flex items-center gap-6">
          <p className={`text-black-normal ${className}`}>{label}</p>
        </div>
      ))}
    </section>
  );
};

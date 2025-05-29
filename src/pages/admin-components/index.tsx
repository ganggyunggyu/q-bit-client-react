import React from 'react';

export const AdminComponents = () => {
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

  const colorVars = [
    { label: '--color-primary', name: 'Primary' },
    { label: '--color-blue-good', name: 'Blue Good' },
    { label: '--color-urgent', name: 'Urgent' },
    { label: '--color-cautious', name: 'Cautious' },
    { label: '--color-purple', name: 'Purple' },
    { label: '--color-green', name: 'Green' },
    { label: '--color-black-normal', name: 'Black Normal' },
    { label: '--color-black-alternative', name: 'Black Alt' },
    { label: '--color-black-assistive', name: 'Black Assist' },
    { label: '--color-black-disabled', name: 'Black Disabled' },
    { label: '--color-black-primary', name: 'Black Primary' },
    { label: '--color-white', name: 'White' },
    { label: '--bg-normal', name: 'BG Normal' },
    { label: '--bg-alternative', name: 'BG Alt' },
    { label: '--bg-divide', name: 'BG Divide' },
    { label: '--bg-primary', name: 'BG Primary' },
  ];

  return (
    <main className="p-10 space-y-16 bg-[var(--bg-alternative)] min-h-screen">
      <section className="space-y-4">
        <h2 className="text-display-2">🖋 텍스트 스타일</h2>
        {textClasses.map(({ className, label }) => (
          <div key={className} className="flex items-center gap-6">
            <p className={`text-black-normal ${className}`}>
              The quick brown fox jumps over the lazy dog
            </p>
            <span className="text-caption-m text-black-disabled">{label}</span>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="text-display-2">🎨 컬러 팔레트</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {colorVars.map(({ label, name }) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg shadow-md border bg-white"
            >
              <div
                className="w-16 h-16 rounded-md border"
                style={{ backgroundColor: `var(${label})` }}
              />
              <span className="text-caption-sb text-black-normal">{name}</span>
              <code className="text-caption-m text-black-disabled">
                {label}
              </code>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

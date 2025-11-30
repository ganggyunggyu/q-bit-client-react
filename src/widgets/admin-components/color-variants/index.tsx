export const ColorVariants = () => {
  const brandColors = [
    { label: '--color-primary', name: 'Deep Calm Mint (메인)', group: '브랜드' },
    { label: '--color-accent', name: 'Golden Step (강조)', group: '브랜드' },
    { label: '--color-neutral', name: 'Soft Teal Gray (중립)', group: '브랜드' },
    { label: '--color-navy', name: 'Ink Navy (대비)', group: '브랜드' },
    { label: '--color-bg-mint', name: 'Pale Mist Mint (배경)', group: '브랜드' },
  ];

  const systemColors = [
    { label: '--color-urgent', name: 'Urgent', group: '시스템' },
    { label: '--color-cautious', name: 'Cautious', group: '시스템' },
    { label: '--color-purple', name: 'Purple', group: '시스템' },
    { label: '--color-green', name: 'Green', group: '시스템' },
    { label: '--color-kakao', name: 'Kakao Yellow', group: '외부' },
  ];

  const textColors = [
    { label: '--color-black-normal', name: 'Black Normal (Ink Navy)', group: '텍스트' },
    { label: '--color-black-alternative', name: 'Black Alt', group: '텍스트' },
    { label: '--color-black-assistive', name: 'Black Assist', group: '텍스트' },
    { label: '--color-black-disabled', name: 'Black Disabled', group: '텍스트' },
    { label: '--color-black-primary', name: 'Black Primary (Mint)', group: '텍스트' },
    { label: '--color-white', name: 'White', group: '텍스트' },
  ];

  const bgColors = [
    { label: '--color-normal', name: 'Normal', group: '배경' },
    { label: '--color-alternative', name: 'Alternative', group: '배경' },
    { label: '--color-divide', name: 'Divide', group: '배경' },
    { label: '--color-bg-primary', name: 'BG Primary (Mint)', group: '배경' },
    { label: '--color-bg-gray', name: 'BG Gray', group: '배경' },
    { label: '--color-border-gray', name: 'Border Gray', group: '배경' },
  ];

  const colorVars = [...brandColors, ...systemColors, ...textColors, ...bgColors];
  const renderColorGroup = (colors: typeof colorVars, title: string) => (
    <div key={title} className="mb-6">
      <h3 className="text-headline-sb mb-3 text-[--color-navy]">{title}</h3>
      <div className="flex flex-col gap-3">
        {colors.map(({ label, name }) => (
          <div
            key={label}
            className="flex items-center gap-4 p-4 rounded-xl shadow-md bg-white border border-[--color-border-gray]"
          >
            <div
              className="w-16 h-16 rounded-lg border-2 border-[--color-neutral]/30"
              style={{ backgroundColor: `var(${label})` }}
            />
            <div className="flex flex-col">
              <span className="text-body-sb text-[--color-navy]">{name}</span>
              <span className="text-caption-m text-[--color-neutral]">{label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="space-y-6 pb-10">
      <h2 className="text-display-2 text-[--color-navy]">자박 컬러 시스템</h2>
      {renderColorGroup(brandColors, '브랜드 컬러')}
      {renderColorGroup(systemColors, '시스템 컬러')}
      {renderColorGroup(textColors, '텍스트 컬러')}
      {renderColorGroup(bgColors, '배경 컬러')}
    </section>
  );
};

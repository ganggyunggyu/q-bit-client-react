export const ColorVariants = () => {
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
    <section className="space-y-4">
      <h2 className="text-display-2">🎨 컬러 팔레트</h2>
      <div className="flex flex-col gap-3">
        {colorVars.map(({ label, name }) => (
          <div
            key={label}
            className="flex items-center gap-10 p-4 rounded-lg shadow-xl bg-white"
          >
            <div
              className="w-16 h-16 rounded-md border border-primary/30"
              style={{ backgroundColor: `var(${label})` }}
            />
            <div className="flex flex-col">
              <span className="text-caption-sb text-black-normal">{name}</span>
              <span className="text-caption-sb text-black-normal">{label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

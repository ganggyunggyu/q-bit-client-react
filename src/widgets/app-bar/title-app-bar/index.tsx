export const TitleAppBar = ({ title }) => {
  return (
    <header className="flex items-center justify-center w-full px-4 bg-normal pt-10">
      <p className="flex-1 font-title-sb">{title}</p>
    </header>
  );
};

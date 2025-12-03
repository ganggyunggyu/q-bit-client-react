import { AppBar } from '@/widgets';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface License {
  name: string;
  version: string;
  license: string;
  url: string;
}

const LICENSES: License[] = [
  { name: 'React', version: '18.x', license: 'MIT', url: 'https://reactjs.org' },
  { name: 'Vite', version: '5.x', license: 'MIT', url: 'https://vitejs.dev' },
  { name: 'TailwindCSS', version: '3.x', license: 'MIT', url: 'https://tailwindcss.com' },
  { name: 'Framer Motion', version: '11.x', license: 'MIT', url: 'https://www.framer.com/motion' },
  { name: 'TanStack Query', version: '5.x', license: 'MIT', url: 'https://tanstack.com/query' },
  { name: 'React Router', version: '6.x', license: 'MIT', url: 'https://reactrouter.com' },
  { name: 'Axios', version: '1.x', license: 'MIT', url: 'https://axios-http.com' },
  { name: 'Lucide React', version: '0.x', license: 'ISC', url: 'https://lucide.dev' },
  { name: 'Day.js', version: '1.x', license: 'MIT', url: 'https://day.js.org' },
  { name: 'Jotai', version: '2.x', license: 'MIT', url: 'https://jotai.org' },
];

const LicensesPage = () => {
  return (
    <main className="min-h-screen bg-bg-secondary">
      <AppBar variant="titleBack" title="오픈소스 라이선스" />

      <section className="p-4">
        <p className="font-body-m text-text-secondary mb-4">
          자박은 다음 오픈소스 라이브러리를 사용하고 있습니다.
        </p>

        <div className="bg-bg-primary rounded-xl overflow-hidden">
          {LICENSES.map((lib, index) => (
            <motion.a
              key={lib.name}
              href={lib.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03 }}
              className={`flex items-center gap-3 p-4 active:bg-bg-secondary transition-colors ${
                index !== LICENSES.length - 1 ? 'border-b border-divide' : ''
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-body-sb text-text-primary">{lib.name}</p>
                  <span className="px-2 py-0.5 bg-bg-secondary rounded text-xs text-text-tertiary">
                    {lib.version}
                  </span>
                </div>
                <p className="font-caption-m text-text-tertiary">
                  {lib.license} License
                </p>
              </div>
              <ExternalLink size={16} className="text-text-tertiary" />
            </motion.a>
          ))}
        </div>
      </section>
    </main>
  );
};

export default LicensesPage;

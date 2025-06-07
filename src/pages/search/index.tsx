import React, { useEffect, useState } from 'react';
import { SearchAppBar } from '@/widgets';

const CERT_LIST = [
  '이름',
  '이름이',
  '이름이 뭐였더라',
  '이름이아름이',
  '자격증',
  '자격이름',
];

export const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      if (query.trim() === '') {
        setResults([]);
        setIsLoading(false);
        return;
      }

      const filtered = CERT_LIST.filter((item) => item.includes(query.trim()));
      setResults(filtered);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <main className="pt-[85px]">
      <SearchAppBar
        className="px-3"
        inputProps={{
          placeholder: '검색',
          value: query,
          onChange: (e) => setQuery(e.target.value),
        }}
      />

      <ul className="mt-3 px-4 space-y-2 min-h-[80px]">
        {isLoading ? (
          <div className="flex justify-center items-center py-6">
            <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : results.length > 0 ? (
          results.map((result, index) => (
            <li
              key={index}
              className="flex items-center text-gray-500 text-body-s gap-2"
            >
              <span className="i-tabler-search text-gray-400" />
              {result}
            </li>
          ))
        ) : query.trim() !== '' ? (
          <li className="text-gray-400 text-body-s">검색 결과 없음</li>
        ) : null}
      </ul>
    </main>
  );
};

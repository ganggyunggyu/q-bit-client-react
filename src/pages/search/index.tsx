import React from 'react';
import { debounce } from 'es-toolkit';

import { SearchAppBar } from '@/widgets';
import { useSearchCertNameQuery } from '@/entities';
import { useRouter } from '@/shared';

export const Search = () => {
  const [inputValue, setInputValue] = React.useState('');
  const [query, setQuery] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);

  const { navigate } = useRouter();

  const debouncedSetQuery = React.useMemo(
    () =>
      debounce((value: string) => {
        setQuery(value);
        setIsTyping(false);
      }, 300),
    [],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setIsTyping(true);
    debouncedSetQuery(value);
  };
  const { data: results = [], isLoading } = useSearchCertNameQuery(query);

  const handleNameClick = (id: string) => {
    navigate(`/search/${id}`);
  };

  return (
    <main className="">
      <SearchAppBar
        className="px-3"
        inputProps={{
          placeholder: '검색',
          value: inputValue,
          onChange: handleChange,
        }}
      />

      <ul className="mt-3 px-4 space-y-2 min-h-[80px]">
        {(isTyping || isLoading) && (
          <div className="flex justify-center items-center py-6">
            <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!isTyping && !isLoading && results.length > 0 && (
          <React.Fragment>
            {results.map((result) => (
              <li
                key={result._id}
                onClick={() => handleNameClick(result._id)}
                className="flex items-center text-gray-500 text-body-s gap-2"
              >
                <span className="i-tabler-search text-gray-400" />
                {result.jmfldnm}
              </li>
            ))}
          </React.Fragment>
        )}

        {!isTyping &&
          !isLoading &&
          inputValue.trim() !== '' &&
          results.length === 0 && (
            <li className="text-gray-400 text-body-s">검색 결과 없음</li>
          )}
      </ul>
    </main>
  );
};

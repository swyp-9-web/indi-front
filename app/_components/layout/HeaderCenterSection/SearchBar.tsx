'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { ROUTE_PATHS } from '@/constants';
import { SearchIcon } from '@/lib/icons';

export default function SearchBar() {
  const [value, setValue] = useState('');

  const router = useRouter();

  const handleSearchFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`${ROUTE_PATHS.PRODUCTS}?query=${value}`);
  };

  return (
    <form onSubmit={handleSearchFormSubmit} className="relative h-9 w-97">
      <label htmlFor="search">
        <SearchIcon className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 hover:cursor-text" />
      </label>
      <Input
        id="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="bg-custom-ivory-50 placeholder:text-custom-gray-300 rounded-full border-none py-2 pr-3 pl-9.5"
        placeholder="작가/작품 검색"
      />
    </form>
  );
}

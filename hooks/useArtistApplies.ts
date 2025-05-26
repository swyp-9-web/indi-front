import { useEffect, useState } from 'react';

import { fetchArtistAppliesList } from '@/lib/apis/admin.api';
import { ArtistAppliesResponse } from '@/lib/apis/admin.type';

export function useArtistApplies(initialPage = 1, size = 10) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [data, setData] = useState<ArtistAppliesResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetchArtistAppliesList(currentPage, size, { runtime: 'client' });
        if (!cancelled) setData(res);
      } catch (err) {
        console.error(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [currentPage, size]);

  const totalPage = data ? Math.ceil(data.result.meta.totalApplies / size) : 0;

  return { data, loading, currentPage, setCurrentPage, totalPage };
}

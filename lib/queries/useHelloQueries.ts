import { useQuery } from '@tanstack/react-query';

import { fetchHello } from '../apis/hello.api';

export const useHelloQuery = () =>
  useQuery({
    queryKey: ['hello'],
    queryFn: fetchHello,
  });

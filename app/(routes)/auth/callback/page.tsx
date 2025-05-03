'use client';

import { useEffect, useState } from 'react';

import { API_BASE_URL } from '@/constants';

export default function AuthCallback() {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_BASE_URL.SERVER}/api/v1/users/me`, {
          credentials: 'include',
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setUser(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchUser();
  }, []);

  if (error) return <div>에러: {error}</div>;
  if (!user) return <div>로딩 중...</div>;

  return (
    <div>
      <h1>사용자 정보</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}

'use client';

import React from 'react';

import { ArtistAppliesResponse } from '@/lib/apis/admin.type';
import { formatDateToYMD } from '@/utils/date';

import AllowAndDisallow from './AllowAndDisallow';
import Status from './Status';
import ViewDetails from './ViewDetails';

type ApplyItem = ArtistAppliesResponse['result']['applies'][number];

export default React.memo(function ArtistRow({ apply }: { apply: ApplyItem }) {
  return (
    <tr key={apply.id} className="text-custom-brand-primary text-center">
      <td className="px-4 py-2 text-sm whitespace-nowrap">{apply.id}</td>
      <td>
        <Status status={apply.status} rejCount={apply.rejectedCount} />
      </td>
      <td className="px-4 py-2 text-sm whitespace-nowrap">{apply.user.id}</td>
      <td className="px-4 py-2 text-sm whitespace-nowrap">{apply.user.nickname}</td>
      <td className="px-4 py-2 text-sm whitespace-nowrap">{apply.email}</td>
      <td className="px-4 py-2 text-sm whitespace-nowrap">
        {apply.snsLink ? (
          <a
            href={apply.snsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border-[1px] border-blue-600 px-2 py-1 text-blue-600"
          >
            링크
          </a>
        ) : (
          '—'
        )}
      </td>
      <td className="px-4 py-2 text-sm whitespace-nowrap">{formatDateToYMD(apply.createdAt)}</td>
      <td className="max-w-52 px-4 py-2 text-sm">
        <span className="block truncate">{apply.artistAboutMe}</span>
      </td>
      <td>
        <AllowAndDisallow userId={apply.user.id} applyedId={apply.id} />
      </td>
      <td>
        <ViewDetails detail={apply} />
      </td>
    </tr>
  );
});

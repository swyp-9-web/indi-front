'use server';

import { revalidateTag } from 'next/cache';

export async function revalidateArtistTag(artistId: string) {
  revalidateTag(`artist-${artistId}`);
}

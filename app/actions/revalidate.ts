'use server';

import { revalidatePath } from 'next/cache';

import { ROUTE_PATHS } from '@/constants';

export async function revalidateArtistPath(artistId: number) {
  revalidatePath(ROUTE_PATHS.ARTIST(String(artistId)));
}

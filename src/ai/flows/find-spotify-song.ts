'use server';

/**
 * @fileOverview A flow for finding songs on Spotify.
 *
 * - findSpotifySong - A function that handles the song finding process.
 * - FindSpotifySongInput - The input type for the findSpotifySong function.
 * - FindSpotifySongOutput - The return type for the findSpotifySong function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FindSpotifySongInputSchema = z.object({
  query: z.string().describe('The search query for the song.'),
});
export type FindSpotifySongInput = z.infer<typeof FindSpotifySongInputSchema>;

const FindSpotifySongOutputSchema = z.object({
  songName: z.string().describe('The name of the song.'),
  artistName: z.string().describe('The name of the artist.'),
  albumImageUrl: z.string().describe('The URL of the album image.'),
  previewUrl: z.string().describe('The URL of the song preview.'),
});
export type FindSpotifySongOutput = z.infer<typeof FindSpotifySongOutputSchema>;

export async function findSpotifySong(input: FindSpotifySongInput): Promise<FindSpotifySongOutput> {
  return findSpotifySongFlow(input);
}

const findSpotifySongFlow = ai.defineFlow(
  {
    name: 'findSpotifySongFlow',
    inputSchema: FindSpotifySongInputSchema,
    outputSchema: FindSpotifySongOutputSchema,
  },
  async input => {
    // Call the spotify search API here
    const response = await fetch(
      `https://straw.page/power/spotify/search?q=${input.query}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Assuming the API returns a list of songs, we take the first one.
    if (data.length === 0) {
      throw new Error('No songs found.');
    }

    const firstSong = data[0];

    const output: FindSpotifySongOutput = {
      songName: firstSong.name,
      artistName: firstSong.artist_list,
      albumImageUrl: firstSong.album_image_url,
      previewUrl: firstSong.preview,
    };

    return output;
  }
);

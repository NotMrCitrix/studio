'use client';

import Image from 'next/image';
import type React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, Music2 } from 'lucide-react';

interface Song {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  previewUrl: string | null;
  dataAiHint?: string;
}

const songs: Song[] = [
  {
    id: 'meanttobe',
    title: 'Meant to Be',
    artist: 'bbno$',
    imageUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/51/c1/a0/51c1a014-5219-3769-9c53-283546a93604/075679758280.jpg/200x200bb.jpg',
    previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/bb/69/fa/bb69fa77-f1d3-4620-608f-252f3f35c524/mzaf_13174075927173936759.plus.aac.p.m4a',
    dataAiHint: 'hiphop rap',
  },
  {
    id: 'finelemondemon',
    title: 'Fine',
    artist: 'Lemon Demon',
    imageUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/f4/f3/e2/f4f3e22a-a70c-452c-87a2-706a3d0010c5/artwork.jpg/200x200bb.jpg',
    previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/e0/73/95/e07395d7-212a-9554-6d67-7860c0553558/mzaf_11970757684010349741.plus.aac.p.m4a',
    dataAiHint: 'indie pop',
  },
  {
    id: 'notallowedtvgirl',
    title: 'Not Allowed',
    artist: 'TV Girl',
    imageUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/00/ac/93/00ac9300-92f7-503d-3b22-93d027779274/859716206028.jpg/200x200bb.jpg',
    previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/53/93/b0/5393b0c4-f09f-a01b-a9b2-a24b87e069f1/mzaf_12007878714715764887.plus.aac.p.m4a',
    dataAiHint: 'lofi indie',
  },
  {
    id: 'machinelovejamiepage',
    title: 'Machine Love',
    artist: 'Jamie Page',
    imageUrl: 'https://i1.sndcdn.com/artworks-000101830900-l9z2v7-t500x500.jpg',
    previewUrl: null, 
    dataAiHint: 'synthwave retro game-ost',
  },
];

interface SongCardProps {
  song: Song;
  playingSongId: string | null;
  onPlayPauseToggle: (songId: string) => void;
}

const SongCard: React.FC<SongCardProps> = ({ song, playingSongId, onPlayPauseToggle }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const isPlaying = playingSongId === song.id;

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      if (isPlaying) {
        audioElement.play().catch(error => {
          console.error(`Error playing '${song.title}': ${error.message}`, error);
          // Optionally, if play fails, inform parent to reset playing state
          // onPlayPauseToggle(null); // This might cause a loop if not handled carefully
        });
      } else {
        audioElement.pause();
        // Check if seeking to avoid error when setting currentTime
        if (!audioElement.seeking) {
            try {
                audioElement.currentTime = 0; 
            } catch (e) {
                console.warn(`Could not reset currentTime for ${song.title}: ${(e as Error).message}`);
            }
        }
      }
    }
  }, [isPlaying, song.title]); // song.title for console logging context

  const handlePlayButtonClick = () => {
    if (song.previewUrl) {
      onPlayPauseToggle(song.id);
    }
  };
  
  return (
    <Card className="bg-card hover:shadow-primary/20 hover:shadow-lg transition-shadow duration-300 w-full">
      {song.previewUrl && <audio ref={audioRef} src={song.previewUrl} preload="metadata" />}
      <CardHeader className="flex flex-row items-center gap-4 p-4">
        <div className="relative w-20 h-20">
          <Image
            src={song.imageUrl}
            alt={song.title}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
            data-ai-hint={song.dataAiHint}
          />
        </div>
        <div className="flex-grow">
          <CardTitle className="text-xl text-foreground" style={{ fontFamily: 'VT323, monospace' }}>{song.title}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground flex items-center" style={{ fontFamily: 'VT323, monospace' }}>
            <Music2 size={14} className="mr-1 text-primary" /> {song.artist}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        {song.previewUrl ? (
          <Button
            variant="outline"
            size="sm"
            className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={handlePlayButtonClick}
          >
            {isPlaying ? <Pause size={16} className="mr-2" /> : <Play size={16} className="mr-2" />}
            {isPlaying ? 'Pause Preview' : 'Play Preview'}
          </Button>
        ) : (
          <Button variant="outline" size="sm" className="w-full" disabled>
            Preview N/A
          </Button>
        )}
      </CardContent>
    </Card>
  );
};


const FavoriteSongs: React.FC = () => {
  const [playingSongId, setPlayingSongId] = useState<string | null>(null);

  const handlePlayPauseToggle = (songId: string) => {
    if (playingSongId === songId) {
      setPlayingSongId(null); // If current playing song is clicked, stop it.
    } else {
      setPlayingSongId(songId); // Else, play the new song.
    }
  };

  return (
    <section className="py-8">
      <h2 className="text-4xl text-foreground mb-6 text-left" style={{ fontFamily: 'VT323, monospace' }}>
        My favorite songs
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {songs.map((song) => (
          <SongCard 
            key={song.id} 
            song={song} 
            playingSongId={playingSongId} 
            onPlayPauseToggle={handlePlayPauseToggle} 
          />
        ))}
      </div>
    </section>
  );
};

export default FavoriteSongs;

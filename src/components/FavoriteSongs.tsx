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
    // Data from example HTML (eat ya veggies album)
    imageUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/06/53/0f/06530f5e-28a1-512b-660d-617fda70a102/193436403337.jpg/200x200bb.jpg',
    previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/17/8a/3c/178a3c47-d40d-cf58-1b55-572e0d1a7523/mzaf_7500688799019275422.plus.aac.p.m4a',
    dataAiHint: 'hiphop rap',
  },
  {
    id: 'finelemondemon',
    title: 'Fine',
    artist: 'Lemon Demon',
    // Data from example HTML (View-Monster album)
    imageUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/3d/7a/0a/3d7a0af0-ffb9-b2c7-5c5e-8abdf2001cb4/786851150827.jpg/200x200bb.jpg',
    previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/7e/cd/cd/7ecdcd73-7c2b-de52-e575-c4d74e31f2e7/mzaf_14306633859304567186.plus.aac.p.m4a',
    dataAiHint: 'indie pop',
  },
  {
    id: 'notallowedtvgirl',
    title: 'Not Allowed',
    artist: 'TV Girl',
    // Retained current data as example HTML data was incorrect for this song title/album
    imageUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/00/ac/93/00ac9300-92f7-503d-3b22-93d027779274/859716206028.jpg/200x200bb.jpg',
    previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/53/93/b0/5393b0c4-f09f-a01b-a9b2-a24b87e069f1/mzaf_12007878714715764887.plus.aac.p.m4a',
    dataAiHint: 'lofi indie',
  },
  {
    id: 'machinelovejamiepage',
    title: 'Machine Love',
    artist: 'Jamie Page',
    // Retained current data as example HTML data was for a different song
    imageUrl: 'https://i1.sndcdn.com/artworks-000101830900-l9z2v7-t500x500.jpg',
    previewUrl: null, 
    dataAiHint: 'synthwave retro game-ost',
  },
];

interface SongCardProps {
  song: Song;
  playingSongId: string | null;
  onPlayPauseToggle: (songId: string, audioRef: React.RefObject<HTMLAudioElement>) => void;
}

const SongCard: React.FC<SongCardProps> = ({ song, playingSongId, onPlayPauseToggle }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const isPlaying = playingSongId === song.id;

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      if (isPlaying && song.previewUrl) {
        audioElement.play().catch(error => {
          console.error(`Error playing '${song.title}': ${(error as Error).message}`, error);
        });
      } else {
        audioElement.pause();
         if (!audioElement.seeking && audioElement.currentTime > 0) { // Check currentTime before resetting
            try {
                audioElement.currentTime = 0; 
            } catch (e) {
                console.warn(`Could not reset currentTime for ${song.title}: ${(e as Error).message}`);
            }
        }
      }
    }
  }, [isPlaying, song.title, song.previewUrl]);

  const handlePlayButtonClick = () => {
    if (song.previewUrl) {
      onPlayPauseToggle(song.id, audioRef);
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
  const [currentAudioElement, setCurrentAudioElement] = useState<HTMLAudioElement | null>(null);

  const handlePlayPauseToggle = (songId: string, audioRef: React.RefObject<HTMLAudioElement>) => {
    const newAudioElement = audioRef.current;

    if (playingSongId === songId) {
      // If current playing song is clicked, stop it.
      if (currentAudioElement) {
        currentAudioElement.pause();
        if(!currentAudioElement.seeking && currentAudioElement.currentTime > 0){
            try {
                currentAudioElement.currentTime = 0;
            } catch(e){
                console.warn(`Could not reset currentTime: ${(e as Error).message}`);
            }
        }
      }
      setPlayingSongId(null);
      setCurrentAudioElement(null);
    } else {
      // Stop any currently playing song
      if (currentAudioElement) {
        currentAudioElement.pause();
         if(!currentAudioElement.seeking && currentAudioElement.currentTime > 0){
            try {
                currentAudioElement.currentTime = 0;
            } catch(e){
                console.warn(`Could not reset currentTime: ${(e as Error).message}`);
            }
        }
      }
      // Play the new song
      if (newAudioElement) {
        newAudioElement.play().catch(error => console.error("Error playing audio:", error));
      }
      setPlayingSongId(songId);
      setCurrentAudioElement(newAudioElement);
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

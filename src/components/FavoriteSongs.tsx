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
}

const songs: Song[] = [
  { 
    id: 'imdoingfine', 
    title: "I'm Doing Fine", 
    artist: 'Marino', 
    imageUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/aa/48/80/aa4880ee-9fc7-4156-c1b9-b2c59c98b957/7300343008392.jpg/200x200bb.jpg', 
    previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/97/fa/da/97fada7f-e580-1199-bba3-373dbff84ec6/mzaf_12879073499565325787.plus.aac.p.m4a' 
  },
  { 
    id: 'fromthestart', 
    title: 'From the Start', 
    artist: 'Good Kid', 
    imageUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/f4/11/f0/f411f0cb-e16d-b33d-044b-37ebddb33e04/0.jpg/200x200bb.jpg', 
    previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/4e/05/33/4e0533c3-3f93-1771-a7e1-0d02d16b33a6/mzaf_7701577053524228574.plus.aac.p.m4a'
  },
  { 
    id: 'coffee', 
    title: 'Coffee', 
    artist: "Jack Stauber's Micropop", 
    imageUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/ff/cb/54/ffcb54b8-7fdc-fbc6-ac8d-b3ef6c32483e/5059435229031_cover.jpg/200x200bb.jpg',
    previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/be/c1/c1/bec1c1c1-182f-6dfb-f28b-f46d64cec422/mzaf_14069016237272833082.plus.aac.p.m4a'
  },
  { 
    id: 'tvoff', 
    title: 'tv off (feat. Lefty Gunplay)', 
    artist: 'Kendrick Lamar', 
    imageUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/50/c2/cc/50c2cc95-3658-9417-0d4b-831abde44ba1/24UM1IM28978.rgb.jpg/200x200bb.jpg',
    previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/40/c3/92/40c392db-07fa-9e30-eedb-d96ccd65cb89/mzaf_8483268782938498986.plus.aac.p.m4a'
  },
];

interface SongCardProps {
  song: Song;
  playingSongId: string | null;
  onPlayPause: (songId: string, audioRef: React.RefObject<HTMLAudioElement>) => void;
}

const SongCard: React.FC<SongCardProps> = ({ song, playingSongId, onPlayPause }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const isPlaying = playingSongId === song.id;

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      if (isPlaying) {
        audioElement.play().catch(error => console.error("Error playing audio:", error));
      } else {
        audioElement.pause();
      }
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    if (song.previewUrl) {
      onPlayPause(song.id, audioRef);
    }
  };
  
  return (
    <Card className="bg-card hover:shadow-primary/20 hover:shadow-lg transition-shadow duration-300 w-full">
      {song.previewUrl && <audio ref={audioRef} src={song.previewUrl} />}
      <CardHeader className="flex flex-row items-center gap-4 p-4">
        <div className="relative w-20 h-20">
          <Image
            src={song.imageUrl}
            alt={song.title}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
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
            onClick={handlePlayPause}
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
  const audioRefs = useRef<{[key: string]: React.RefObject<HTMLAudioElement>}>({});

  const handlePlayPause = (songId: string, audioRef: React.RefObject<HTMLAudioElement>) => {
    // Pause currently playing song if different
    if (playingSongId && playingSongId !== songId) {
      const currentAudioRef = audioRefs.current[playingSongId];
      currentAudioRef?.current?.pause();
    }
    
    // Toggle play/pause for the clicked song
    if (playingSongId === songId) {
      setPlayingSongId(null); // Pause
    } else {
      setPlayingSongId(songId); // Play
    }
    audioRefs.current[songId] = audioRef;
  };

  return (
    <section className="py-8">
      <h2 className="text-4xl text-foreground mb-6 text-left" style={{ fontFamily: 'VT323, monospace' }}>
        My favorite songs
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {songs.map((song) => (
          <SongCard key={song.id} song={song} playingSongId={playingSongId} onPlayPause={handlePlayPause} />
        ))}
      </div>
    </section>
  );
};

export default FavoriteSongs;

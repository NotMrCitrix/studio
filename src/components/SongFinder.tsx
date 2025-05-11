'use client';

import type React from 'react';
import { useState, useRef, useEffect, useTransition } from 'react';
import Image from 'next/image';
import { findSpotifySong, type FindSpotifySongOutput } from '@/ai/flows/find-spotify-song';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Search, Play, Pause, Music2, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SongFinder: React.FC = () => {
  const [query, setQuery] = useState('');
  const [songResult, setSongResult] = useState<FindSpotifySongOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      setError('Please enter a search query.');
      return;
    }

    setError(null);
    setSongResult(null);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    startTransition(async () => {
      try {
        const result = await findSpotifySong({ query });
        setSongResult(result);
      } catch (err) {
        console.error('Error finding song:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to find song. Please try again.';
        setError(errorMessage);
        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive',
        });
      }
    });
  };

  const handlePlayPause = () => {
    if (!audioRef.current || !songResult?.previewUrl) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => {
        console.error("Error playing preview:", err);
        toast({
          title: "Playback Error",
          description: "Could not play song preview.",
          variant: "destructive",
        });
      });
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      const handleEnded = () => setIsPlaying(false);
      audioElement.addEventListener('ended', handleEnded);
      return () => audioElement.removeEventListener('ended', handleEnded);
    }
  }, [songResult]);


  return (
    <section className="py-12">
      <h2 className="text-5xl text-foreground mb-8 text-center" style={{ fontFamily: 'VT323, monospace' }}>
        AI Song Finder
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-8 max-w-xl mx-auto">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter song name, artist, or lyrics..."
          className="flex-grow text-lg p-3 bg-input border-border placeholder:text-muted-foreground"
          style={{ fontFamily: 'VT323, monospace' }}
        />
        <Button type="submit" disabled={isPending} className="text-lg p-3 bg-primary hover:bg-accent transition-colors">
          {isPending ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Search className="mr-2 h-5 w-5" />}
          Search
        </Button>
      </form>

      {error && (
        <Card className="bg-destructive/20 border-destructive text-destructive-foreground max-w-xl mx-auto">
          <CardContent className="p-4 flex items-center">
            <XCircle className="h-5 w-5 mr-2" />
            <p style={{ fontFamily: 'VT323, monospace' }}>{error}</p>
          </CardContent>
        </Card>
      )}

      {songResult && (
        <Card className="max-w-xl mx-auto bg-card shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
          {songResult.previewUrl && <audio ref={audioRef} src={songResult.previewUrl} />}
          <CardHeader className="flex flex-col sm:flex-row items-center gap-4 p-6">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32">
              <Image
                src={songResult.albumImageUrl || 'https://picsum.photos/200'}
                alt={songResult.songName}
                layout="fill"
                objectFit="cover"
                className="rounded-md shadow-md"
                data-ai-hint="album cover"
              />
            </div>
            <div className="flex-grow text-center sm:text-left">
              <CardTitle className="text-3xl text-foreground mb-1" style={{ fontFamily: 'VT323, monospace' }}>
                {songResult.songName}
              </CardTitle>
              <CardDescription className="text-xl text-muted-foreground flex items-center justify-center sm:justify-start" style={{ fontFamily: 'VT323, monospace' }}>
                <Music2 size={18} className="mr-2 text-primary" /> {songResult.artistName}
              </CardDescription>
            </div>
          </CardHeader>
          {songResult.previewUrl && (
            <CardContent className="p-6 pt-0">
              <Button
                variant="outline"
                size="lg"
                className="w-full text-lg p-3 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={handlePlayPause}
                disabled={isPending}
              >
                {isPlaying ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
                {isPlaying ? 'Pause Preview' : 'Play Preview'}
              </Button>
            </CardContent>
          )}
        </Card>
      )}
    </section>
  );
};

export default SongFinder;

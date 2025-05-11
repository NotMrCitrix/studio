'use client';
import type React from 'react';
import { useRef } from 'react';
import AppHeader from '@/components/AppHeader';
import ProfileSection from '@/components/ProfileSection';
import FavoriteGames from '@/components/FavoriteGames';
import FavoriteSongs from '@/components/FavoriteSongs';
import ArtworkShowcase from '@/components/ArtworkShowcase';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  const artworkRef = useRef<HTMLElement>(null);

  const scrollToArtwork = () => {
    artworkRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-background text-foreground font-sans">
      <div className="w-full max-w-[1200px] mx-auto px-4">
        <AppHeader onCitriTabClick={scrollToArtwork} />
        
        <main className="mt-12 flex flex-col gap-12">
          <ProfileSection />
          
          <Separator className="bg-border/50 my-8" />

          <section>
            <h2 className="text-5xl text-foreground mb-6 text-center md:text-left" style={{ fontFamily: 'VT323, monospace' }}>
              About me!
            </h2>
            <FavoriteGames />
            <FavoriteSongs />
          </section>
          
          <Separator className="bg-border/50 my-8" />
          
          {/* Assign ref to the ArtworkShowcase section's wrapper if needed, or to the section itself */}
          <div ref={artworkRef as React.RefObject<HTMLDivElement>}>
            <ArtworkShowcase />
          </div>
        </main>

        <footer className="py-12 mt-16 text-center">
          <p className="text-muted-foreground" style={{ fontFamily: 'VT323, monospace' }}>CitriPage by MrCitrix</p>
        </footer>
      </div>
    </div>
  );
}

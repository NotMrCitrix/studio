'use client';
import type React from 'react';
import { useRef, useState, useEffect } from 'react';
import AppHeader from '@/components/AppHeader';
import ProfileSection from '@/components/ProfileSection';
import FavoriteGames from '@/components/FavoriteGames';
import FavoriteSongs from '@/components/FavoriteSongs';
import ArtworkShowcase from '@/components/ArtworkShowcase';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  const homeSectionRef = useRef<HTMLDivElement>(null);
  const artworkRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'citri'>('home');

  useEffect(() => {
    const artworkObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveTab('citri');
        } else {
          // If artwork is not intersecting, 'home' tab should be active.
          // This handles scrolling past artwork in both directions.
          setActiveTab('home');
        }
      },
      {
        threshold: 0.1, // 10% of artwork section visible to be considered active
        // rootMargin can be used to adjust detection sensitivity, e.g., trigger earlier/later
        // Example: rootMargin: "-10% 0px -10% 0px" would shrink the detection viewport by 10% top/bottom
      }
    );

    if (artworkRef.current) {
      artworkObserver.observe(artworkRef.current);
    }

    return () => {
      if (artworkRef.current) {
        artworkObserver.unobserve(artworkRef.current);
      }
    };
  }, []);

  const scrollToHome = () => {
    homeSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToArtwork = () => {
    artworkRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-background text-foreground font-sans">
      <div className="w-full max-w-[1200px] mx-auto px-4">
        <AppHeader
          activeTab={activeTab}
          onHomeTabClick={scrollToHome}
          onCitriTabClick={scrollToArtwork}
        />
        
        {/* Increased margin-top to ensure content isn't hidden by the sticky header. Adjust as needed based on header height. */}
        <main className="mt-24 flex flex-col gap-12"> 
          <div ref={homeSectionRef}>
            <ProfileSection />
          </div>
          
          <Separator className="bg-border/50 my-8" />

          <section>
            <h2 className="text-5xl text-foreground mb-6 text-center md:text-left" style={{ fontFamily: 'VT323, monospace' }}>
              About me!
            </h2>
            <FavoriteGames />
            <FavoriteSongs />
          </section>
          
          <Separator className="bg-border/50 my-8" />
          
          <div ref={artworkRef}>
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

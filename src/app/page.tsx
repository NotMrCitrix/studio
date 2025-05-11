
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
          // Check if the home section is visible to set the tab correctly when scrolling up from artwork.
          const homeSectionVisible = homeSectionRef.current && homeSectionRef.current.getBoundingClientRect().top >= 0 && homeSectionRef.current.getBoundingClientRect().bottom <= window.innerHeight;
          if(homeSectionVisible || entry.boundingClientRect.top > 0) { // if scrolling up past artwork
            setActiveTab('home');
          }
        }
      },
      {
        threshold: 0.1, // 10% of artwork section visible to be considered active
      }
    );

    const homeObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && artworkRef.current && artworkRef.current.getBoundingClientRect().top > window.innerHeight) {
          setActiveTab('home');
        }
      },
      {
        threshold: 0.1,
      }
    );


    if (artworkRef.current) {
      artworkObserver.observe(artworkRef.current);
    }
    if (homeSectionRef.current) {
      homeObserver.observe(homeSectionRef.current);
    }

    return () => {
      if (artworkRef.current) {
        artworkObserver.unobserve(artworkRef.current);
      }
      if (homeSectionRef.current) {
        homeObserver.unobserve(homeSectionRef.current);
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
        
        {/* Reduced margin-top to move content up */}
        <main className="mt-20 flex flex-col gap-12"> 
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
          {/* Removed "CitriPage by MrCitrix" text */}
        </footer>
      </div>
    </div>
  );
}


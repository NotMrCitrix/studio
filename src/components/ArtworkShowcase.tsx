import Image from 'next/image';
import type React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

const artworks = [
  { id: 'art1', imageUrl: 'https://files.strawcdn.com/straw/NFNkHgHHwFGlLYDoDngv.png', caption: 'Drawn by b0nette', dataAiHint: 'character art' },
  { id: 'art2', imageUrl: 'https://files.strawcdn.com/straw/BSYDZmEMTVJlxPLcZrnu.png', caption: 'Drawn by b0nette', dataAiHint: 'digital painting' },
  { id: 'art3', imageUrl: 'https://files.strawcdn.com/straw/xlTnZnIxrNFazdJuWdTN.png', caption: 'Drawn by b0nette', dataAiHint: 'illustration design' },
  { id: 'art4', imageUrl: 'https://files.strawcdn.com/straw/igcvbNXaeZeFgPEWtIhv.png', caption: 'Drawn by Kinkin', dataAiHint: 'fan art' },
];

const ArtworkShowcase: React.FC = () => {
  return (
    <section id="artwork-showcase" className="py-12">
      <h2 className="text-5xl text-foreground mb-8 text-left" style={{ fontFamily: 'VT323, monospace' }}>
        Citri! :3
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {artworks.map((art) => (
          <Card key={art.id} className="bg-card overflow-hidden hover:shadow-primary/20 hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-0">
              <div className="relative w-full aspect-square"> {/* Maintain aspect ratio */}
                <Image
                  src={art.imageUrl}
                  alt={art.caption}
                  layout="fill"
                  objectFit="contain" // Changed from cover to contain to match original more closely
                  data-ai-hint={art.dataAiHint}
                />
              </div>
            </CardContent>
            <CardFooter className="p-3 bg-card-foreground/5">
              <p className="text-sm text-muted-foreground w-full text-center" style={{ fontFamily: 'VT323, monospace' }}>{art.caption}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ArtworkShowcase;

import type React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardTitle } from '@/components/ui/card';

interface Game {
  id: string;
  name: string;
  imageUrl?: string; // Optional: URL for the game image
  dataAiHint?: string; // Optional: AI hint for placeholder image
}

const games: Game[] = [
  {
    id: 'ultrakill',
    name: 'Ultrakill',
    imageUrl: 'https://picsum.photos/seed/ultrakill/200/200', // Placeholder for ultrakill.png
    dataAiHint: 'ultrakill game',
  },
  {
    id: 'gttod',
    name: 'Get to the orange door',
    // No imageUrl, so no image will be shown
  },
  {
    id: 'eraser',
    name: 'Eraser',
  },
  {
    id: 'hollowknight',
    name: 'Hollow Knight',
  },
  {
    id: 'smo',
    name: 'Super Mario Odyssey',
  },
  {
    id: 'titanfall2',
    name: 'Titanfall 2',
    imageUrl: 'https://picsum.photos/seed/titanfall2/200/200', // Placeholder for titanfall2.png
    dataAiHint: 'titanfall game',
  },
  {
    id: 'ghostrunner',
    name: 'Ghostrunner',
  },
];

const FavoriteGames: React.FC = () => {
  return (
    <section className="py-8">
      <h2 className="text-4xl text-foreground mb-6 text-left" style={{ fontFamily: 'VT323, monospace' }}>
        My favorite games
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {games.map((game) => (
          <Card
            key={game.id}
            className="bg-card hover:shadow-primary/20 hover:shadow-lg transition-shadow duration-300 flex flex-col items-center p-4 overflow-hidden"
          >
            <CardContent className="flex flex-col items-center text-center p-0 w-full">
              {game.imageUrl && (
                <div className="relative w-full max-w-[180px] aspect-square mb-3 rounded-md overflow-hidden shadow-sm">
                  <Image
                    src={game.imageUrl}
                    alt={game.name} // Use game name as alt text
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint={game.dataAiHint}
                  />
                </div>
              )}
              <CardTitle className="text-xl text-foreground mt-2" style={{ fontFamily: 'VT323, monospace' }}>
                {game.name}
              </CardTitle>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FavoriteGames;

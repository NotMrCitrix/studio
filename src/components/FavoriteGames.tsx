import Image from 'next/image';
import type React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const games = [
  { id: 'ultrakill', name: 'Ultrakill', imageUrl: 'https://picsum.photos/seed/ultrakill/300/200', dataAiHint: 'action game' },
  { id: 'gttod', name: 'Get to the orange door', imageUrl: 'https://picsum.photos/seed/gttod/300/200', dataAiHint: 'parkour shooter' },
  { id: 'eraser', name: 'Eraser', imageUrl: 'https://picsum.photos/seed/eraser/300/200', dataAiHint: 'puzzle game' },
  { id: 'hollowknight', name: 'Hollow Knight', imageUrl: 'https://picsum.photos/seed/hollowknight/300/200', dataAiHint: 'metroidvania indie' },
  { id: 'smo', name: 'Super Mario Odyssey', imageUrl: 'https://picsum.photos/seed/smo/300/200', dataAiHint: 'platformer adventure' },
  { id: 'titanfall2', name: 'Titanfall 2', imageUrl: 'https://picsum.photos/seed/titanfall2/300/200', dataAiHint: 'fps mech' },
  { id: 'ghostrunner', name: 'Ghostrunner', imageUrl: 'https://picsum.photos/seed/ghostrunner/300/200', dataAiHint: 'cyberpunk parkour' },
];

const FavoriteGames: React.FC = () => {
  return (
    <section className="py-8">
      <h2 className="text-4xl text-foreground mb-6 text-left" style={{ fontFamily: 'VT323, monospace' }}>
        My favorite games
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {games.map((game) => (
          <Card key={game.id} className="bg-card hover:shadow-primary/20 hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="p-0">
              <div className="relative w-full h-40">
                <Image
                  src={game.imageUrl}
                  alt={game.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-md"
                  data-ai-hint={game.dataAiHint}
                />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-xl text-foreground mb-1" style={{ fontFamily: 'VT323, monospace' }}>{game.name}</CardTitle>
              {/* No description provided in original HTML for games, so keeping it minimal */}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FavoriteGames;

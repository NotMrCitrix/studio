import type React from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';

interface Game {
  id: string;
  name: string;
}

const games: Game[] = [
  {
    id: 'ultrakill',
    name: 'Ultrakill',
  },
  {
    id: 'gttod',
    name: 'Get to the orange door',
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

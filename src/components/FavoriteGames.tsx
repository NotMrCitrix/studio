import type React from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Crosshair, DoorOpen, EraserIcon, Bug, Star, Rocket, Zap, Gamepad2 } from 'lucide-react';

interface Game {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const games: Game[] = [
  { id: 'ultrakill', name: 'Ultrakill', icon: <Crosshair size={40} className="text-primary mb-2" /> },
  { id: 'gttod', name: 'Get to the orange door', icon: <DoorOpen size={40} className="text-primary mb-2" /> },
  { id: 'eraser', name: 'Eraser', icon: <EraserIcon size={40} className="text-primary mb-2" /> },
  { id: 'hollowknight', name: 'Hollow Knight', icon: <Bug size={40} className="text-primary mb-2" /> },
  { id: 'smo', name: 'Super Mario Odyssey', icon: <Star size={40} className="text-primary mb-2" /> },
  { id: 'titanfall2', name: 'Titanfall 2', icon: <Rocket size={40} className="text-primary mb-2" /> },
  { id: 'ghostrunner', name: 'Ghostrunner', icon: <Zap size={40} className="text-primary mb-2" /> },
];

const FavoriteGames: React.FC = () => {
  return (
    <section className="py-8">
      <h2 className="text-4xl text-foreground mb-6 text-left" style={{ fontFamily: 'VT323, monospace' }}>
        My favorite games
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {games.map((game) => (
          <Card key={game.id} className="bg-card hover:shadow-primary/20 hover:shadow-lg transition-shadow duration-300 flex flex-col justify-center items-center min-h-[150px] p-4">
            <CardContent className="flex flex-col items-center justify-center text-center p-0">
              {game.icon}
              <CardTitle className="text-xl text-foreground" style={{ fontFamily: 'VT323, monospace' }}>{game.name}</CardTitle>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FavoriteGames;

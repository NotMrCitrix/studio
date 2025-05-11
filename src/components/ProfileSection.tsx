import Image from 'next/image';
import type React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const ProfileSection: React.FC = () => {
  return (
    <section className="py-12">
      <Card className="bg-transparent border-none shadow-none">
        <CardContent className="flex flex-col md:flex-row items-center gap-8 p-0">
          <div className="relative w-40 h-40 md:w-48 md:h-48 transform scale-110 hover:scale-125 transition-transform duration-300">
            <Image
              src="https://files.strawcdn.com/straw/prGJyQBdcRXCKuYOTYCW.png"
              alt="MrCitrix Profile Picture"
              layout="fill"
              objectFit="contain"
              className="rounded-md"
              data-ai-hint="profile avatar"
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-6xl text-foreground mb-2" style={{ fontFamily: 'VT323, monospace' }}>
              Hi! Im MrCitrix
            </h1>
            <p className="text-3xl text-foreground" style={{ fontFamily: 'VT323, monospace' }}>
              Im a python and web developer trying to make useful stuff
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default ProfileSection;

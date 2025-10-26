import { Link } from 'react-router-dom';
import { Club } from '@/contexts/AppContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ClubCardProps {
  club: Club;
}

const ClubCard = ({ club }: ClubCardProps) => {
  // Check if logo is a filename (image) or emoji
  const isImageLogo = club.logo.includes('.jpg') || club.logo.includes('.png');
  
  return (
    <Card className="group relative overflow-hidden bg-card hover:shadow-club transition-all duration-300 hover:-translate-y-2">
      <div className="p-6 flex flex-col items-center text-center space-y-4">
        <Link to={`/club/${club.id}`} className="block">
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 cursor-pointer overflow-hidden border-4 border-white">
            {isImageLogo ? (
              <img
                src={`/src/assets/clubs/${club.logo}`}
                alt={club.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-5xl">{club.logo}</span>
            )}
          </div>
        </Link>
        
        <div className="space-y-2">
          <h3 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors">
            {club.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
            {club.description}
          </p>
        </div>

        <Link to={`/club/${club.id}`} className="w-full">
          <Button className="w-full bg-primary hover:bg-primary-dark transition-colors">
            Learn More
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default ClubCard;

import { Event } from '@/contexts/AppContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock, ExternalLink, Award } from 'lucide-react';

interface EventCardProps {
  event: Event;
  showCertificates?: boolean;
}

const EventCard = ({ event, showCertificates = false }: EventCardProps) => {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500 hover:bg-green-600';
      case 'Postponed':
        return 'bg-orange-500 hover:bg-orange-600';
      case 'Preponed':
        return 'bg-blue-500 hover:bg-blue-600';
      default:
        return 'bg-primary hover:bg-primary-dark';
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-300">
      {event.posterUrl && (
        <div className="h-48 overflow-hidden bg-muted relative">
          <img
            src={event.posterUrl}
            alt={event.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          {event.status && (
            <Badge className={`absolute top-2 right-2 ${getStatusColor(event.status)}`}>
              {event.status}
            </Badge>
          )}
        </div>
      )}
      
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-xl text-foreground flex-1">{event.title}</h3>
          {!event.posterUrl && event.status && (
            <Badge className={getStatusColor(event.status)}>
              {event.status}
            </Badge>
          )}
        </div>
        
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{new Date(event.date).toLocaleDateString('en-IN', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <span>{event.timings}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{event.location}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-3">
          {event.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-2">
          {event.registrationUrl && (
            <a
              href={event.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button className="w-full bg-primary hover:bg-primary-dark">
                <ExternalLink className="w-4 h-4 mr-2" />
                Register Now
              </Button>
            </a>
          )}
          
          {showCertificates && event.certificatesUrl && (
            <a
              href={event.certificatesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Award className="w-4 h-4 mr-2" />
                Certificates
              </Button>
            </a>
          )}
        </div>
      </div>
    </Card>
  );
};

export default EventCard;

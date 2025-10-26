import { useParams, Link } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import EventCard from '@/components/EventCard';
import RecruitmentCard from '@/components/RecruitmentCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Phone, Mail, Calendar, Briefcase, Award } from 'lucide-react';
const ClubDetail = () => {
  const {
    clubId
  } = useParams();
  const {
    clubs,
    events,
    recruitments
  } = useApp();
  const club = clubs.find(c => c.id === clubId);
  if (!club) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Club Not Found</h1>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>;
  }
  const clubEvents = events.filter(e => e.clubId === clubId);
  const upcomingEvents = clubEvents.filter(e => new Date(e.date) >= new Date());
  const pastEvents = clubEvents.filter(e => new Date(e.date) < new Date());
  const clubRecruitments = recruitments.filter(r => r.clubId === clubId && r.isActive);
  return <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero text-white py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <Link to="/">
            <Button variant="secondary" size="sm" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          <div className="flex flex-col md:flex-row items-center gap-6">
            
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-3">{club.name}</h1>
              <p className="text-lg text-white/90 max-w-2xl">{club.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <Tabs defaultValue="about" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:w-[600px] mx-auto">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="events">
              Events
              {upcomingEvents.length > 0 && <span className="ml-2 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                  {upcomingEvents.length}
                </span>}
            </TabsTrigger>
            <TabsTrigger value="recruitment">
              Recruitment
              {clubRecruitments.length > 0 && <span className="ml-2 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                  {clubRecruitments.length}
                </span>}
            </TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="space-y-6">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-foreground">About {club.name}</h2>
              <p className="text-muted-foreground leading-relaxed">{club.description}</p>
            </Card>

            {pastEvents.length > 0 && <div>
                <h3 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
                  <Award className="w-6 h-6 text-primary" />
                  Past Events & Certificates
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pastEvents.map(event => <EventCard key={event.id} event={event} showCertificates />)}
                </div>
              </div>}
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            {upcomingEvents.length > 0 ? <>
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-primary" />
                  Upcoming Events
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingEvents.map(event => <EventCard key={event.id} event={event} showCertificates />)}
                </div>
              </> : <Card className="p-12 text-center">
                <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No Upcoming Events</h3>
                <p className="text-muted-foreground">
                  Stay tuned! New events will be announced soon.
                </p>
              </Card>}

            {pastEvents.length > 0 && <div className="mt-12">
                <h3 className="text-2xl font-bold mb-6 text-foreground">Past Events</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pastEvents.map(event => <EventCard key={event.id} event={event} showCertificates />)}
                </div>
              </div>}
          </TabsContent>

          <TabsContent value="recruitment" className="space-y-6">
            {clubRecruitments.length > 0 ? <>
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-primary" />
                  Open Positions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {clubRecruitments.map(recruitment => <RecruitmentCard key={recruitment.id} recruitment={recruitment} />)}
                </div>
              </> : <Card className="p-12 text-center">
                <Briefcase className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No Active Recruitments</h3>
                <p className="text-muted-foreground">
                  We're not currently recruiting, but check back soon for new opportunities!
                </p>
              </Card>}
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-foreground">Contact Information</h2>
              <div className="space-y-6">
                {club.contacts.map((contact, index) => <div key={index} className="border-l-4 border-primary pl-6 py-2">
                    <h3 className="font-semibold text-lg mb-3">{contact.name}</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Phone className="w-4 h-4 text-primary" />
                        <a href={`tel:${contact.phone}`} className="hover:text-primary transition-colors">
                          {contact.phone}
                        </a>
                      </div>
                      {contact.email && <div className="flex items-center gap-3 text-muted-foreground">
                          <Mail className="w-4 h-4 text-primary" />
                          <a href={`mailto:${contact.email}`} className="hover:text-primary transition-colors">
                            {contact.email}
                          </a>
                        </div>}
                    </div>
                  </div>)}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>;
};
export default ClubDetail;
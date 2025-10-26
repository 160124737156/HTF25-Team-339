import { Link } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import ClubCard from '@/components/ClubCard';
import EventCard from '@/components/EventCard';
import RecruitmentCard from '@/components/RecruitmentCard';
import { Button } from '@/components/ui/button';
import { Calendar, Users, LogIn, Settings } from 'lucide-react';
import cbitLogo from '@/assets/cbit-logo.jpg';
const Index = () => {
  const {
    clubs,
    events,
    recruitments,
    isAdmin,
    logout
  } = useApp();

  // Get upcoming events (sorted by date)
  const upcomingEvents = events.filter(event => new Date(event.date) >= new Date()).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(0, 6);

  // Get active recruitments
  const activeRecruitments = recruitments.filter(r => r.isActive).slice(0, 4);
  return <div className="min-h-screen bg-background">
      {/* Navigation Bar with College Logo */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            
            <div>
              <h1 className="text-lg font-bold text-primary">CBIT Connect</h1>
              <p className="text-xs text-muted-foreground">Clubs & Events</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isAdmin ? <>
                <Link to="/admin/dashboard">
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={logout}>
                  Logout
                </Button>
              </> : <Link to="/admin/login">
                <Button variant="outline" size="sm">
                  <LogIn className="w-4 h-4 mr-2" />
                  Admin Login
                </Button>
              </Link>}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-white py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Welcome to CBIT Connect: Clubs & Events
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-white/90">
            Discover clubs, join events, and be part of something amazing at Chaitanya Bharathi Institute of Technology
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a href="#clubs">
              <Button size="lg" variant="secondary" className="min-w-[180px]">
                <Users className="w-5 h-5 mr-2" />
                View All Clubs
              </Button>
            </a>
            <a href="#events">
              <Button size="lg" variant="outline" className="min-w-[180px] border-white text-white hover:bg-white hover:text-primary">
                <Calendar className="w-5 h-5 mr-2" />
                See Events
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Clubs Section */}
      <section id="clubs" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              List of All Clubs
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our diverse range of clubs and find your perfect fit
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {clubs.map(club => <ClubCard key={club.id} club={club} />)}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      {upcomingEvents.length > 0 && <section id="events" className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Upcoming Events
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Don't miss out on the exciting events happening at CBIT
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map(event => <EventCard key={event.id} event={event} showCertificates />)}
            </div>
          </div>
        </section>}

      {/* Recruitment Opportunities Section */}
      {activeRecruitments.length > 0 && <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Recruitment Opportunities
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Join our clubs and become part of a vibrant community
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeRecruitments.map(recruitment => <RecruitmentCard key={recruitment.id} recruitment={recruitment} />)}
            </div>
          </div>
        </section>}

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-hero text-white">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Interested in Joining Our Team?
          </h2>
          <p className="text-lg text-white/90">
            We're always looking for enthusiastic students to join us and make a difference. Contact us to learn more!
          </p>
          <a href="#clubs">
            <Button size="lg" variant="secondary" className="min-w-[200px]">
              Explore Clubs
            </Button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                
                <h3 className="font-bold text-xl">CBIT Connect</h3>
              </div>
              <p className="text-white/80 text-sm">
                Chaitanya Bharathi Institute of Technology - Empowering students through clubs and events
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <div className="space-y-2 text-sm text-white/80">
                <p>📍 Gandipet, Hyderabad - 500075</p>
                <p>📞 +91 40 24193276</p>
                <p>✉️ info@cbit.ac.in</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Connect With Us</h4>
              <div className="flex gap-4">
                <a href="#" className="text-white/80 hover:text-white transition-colors">Facebook</a>
                <a href="#" className="text-white/80 hover:text-white transition-colors">Instagram</a>
                <a href="#" className="text-white/80 hover:text-white transition-colors">LinkedIn</a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/60">
            <p>&copy; {new Date().getFullYear()} CBIT Connect: Clubs & Events. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;
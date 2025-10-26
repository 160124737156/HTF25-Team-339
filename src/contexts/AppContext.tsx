import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Club {
  id: string;
  name: string;
  description: string;
  logo: string;
  contacts: { name: string; phone: string; email?: string }[];
}

export interface Event {
  id: string;
  clubId: string;
  title: string;
  date: string;
  location: string;
  timings: string;
  description: string;
  posterUrl: string;
  registrationUrl: string;
  certificatesUrl?: string;
  status?: 'Upcoming' | 'Completed' | 'Postponed' | 'Preponed';
  registrations?: EventRegistration[];
}

export interface EventRegistration {
  id: string;
  eventId: string;
  name: string;
  rollNumber: string;
  year: string;
  section: string;
  attended?: boolean;
  registeredAt: string;
}

export interface Recruitment {
  id: string;
  clubId: string;
  position: string;
  description: string;
  deadline: string;
  isActive: boolean;
}

export interface Application {
  id: string;
  recruitmentId: string;
  clubId: string;
  name: string;
  rollNumber: string;
  section: string;
  year: string;
  branch: string;
  submittedAt?: string;
}

interface AppContextType {
  clubs: Club[];
  events: Event[];
  recruitments: Recruitment[];
  applications: Application[];
  addClub: (club: Omit<Club, 'id'>) => void;
  addEvent: (event: Omit<Event, 'id'>) => void;
  addRecruitment: (recruitment: Omit<Recruitment, 'id'>) => void;
  addApplication: (application: Omit<Application, 'id'>) => void;
  updateEvent: (id: string, certificatesUrl: string) => void;
  updateEventStatus: (id: string, status: Event['status']) => void;
  updateEventRegistrations: (eventId: string, registrations: EventRegistration[]) => void;
  isAdmin: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CLUBS: 'cbit_clubs',
  EVENTS: 'cbit_events',
  RECRUITMENTS: 'cbit_recruitments',
  APPLICATIONS: 'cbit_applications',
  IS_ADMIN: 'cbit_is_admin',
};

// Initial club data - updated with actual club logos
const initialClubs: Club[] = [
  {
    id: '1',
    name: 'United Dance Crew',
    description: 'Move to the rhythm with various dance forms and performances.',
    logo: 'United_Dance_Crew.jpg',
    contacts: [{ name: 'Admin', phone: '+91 1234567890', email: 'udc@cbit.ac.in' }],
  },
  {
    id: '2',
    name: 'CBIT NSS',
    description: 'National Service Scheme - Make a difference through community service.',
    logo: 'CBIT_NSS.jpg',
    contacts: [{ name: 'Admin', phone: '+91 1234567891', email: 'nss@cbit.ac.in' }],
  },
  {
    id: '3',
    name: 'CBIT Open Source Community',
    description: 'Explore open source technologies and contribute to the community.',
    logo: 'CBIT_Open_Source_Community.jpg',
    contacts: [{ name: 'Admin', phone: '+91 1234567892', email: 'cosc@cbit.ac.in' }],
  },
  {
    id: '4',
    name: 'CBIT Spandana Club',
    description: 'Multi-disciplinary club promoting various arts and cultural activities.',
    logo: 'CBIT_Spandana_Club.jpg',
    contacts: [{ name: 'Admin', phone: '+91 1234567893', email: 'spandana@cbit.ac.in' }],
  },
  {
    id: '5',
    name: 'Chaaya - The Film Club',
    description: 'Explore cinema, filmmaking, and visual storytelling.',
    logo: 'Chaaya_-_The_Film_Club.jpg',
    contacts: [{ name: 'Admin', phone: '+91 1234567894', email: 'chaaya@cbit.ac.in' }],
  },
  {
    id: '6',
    name: 'Chaitanya Geethi',
    description: 'Express yourself through music, vocals, and performances.',
    logo: 'Chaitanya_Geethi.jpg',
    contacts: [{ name: 'Admin', phone: '+91 1234567895', email: 'geethi@cbit.ac.in' }],
  },
  {
    id: '7',
    name: 'Chaitanya Kreeda',
    description: 'Promote sports, fitness, and athletic excellence.',
    logo: 'Chaitanya_Kreeda.jpg',
    contacts: [{ name: 'Admin', phone: '+91 1234567896', email: 'kreeda@cbit.ac.in' }],
  },
  {
    id: '8',
    name: 'Chaitanya Samskruthi',
    description: 'Celebrate culture, literature, and traditional arts.',
    logo: 'Chaitanya_Samskruthi.jpg',
    contacts: [{ name: 'Admin', phone: '+91 1234567897', email: 'samskruthi@cbit.ac.in' }],
  },
  {
    id: '9',
    name: 'Chaitanya Vaadya',
    description: 'Instrumental music club fostering musical talent.',
    logo: 'Chaitanya_Vaadya.jpg',
    contacts: [{ name: 'Admin', phone: '+91 1234567898', email: 'vaadya@cbit.ac.in' }],
  },
  {
    id: '10',
    name: 'IEEE CBIT',
    description: 'Institute of Electrical and Electronics Engineers student chapter.',
    logo: 'IEEE-CBIT.jpg',
    contacts: [{ name: 'Admin', phone: '+91 1234567899', email: 'ieee@cbit.ac.in' }],
  },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [clubs, setClubs] = useState<Club[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.CLUBS);
    return stored ? JSON.parse(stored) : initialClubs;
  });

  const [events, setEvents] = useState<Event[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.EVENTS);
    return stored ? JSON.parse(stored) : [];
  });

  const [recruitments, setRecruitments] = useState<Recruitment[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.RECRUITMENTS);
    return stored ? JSON.parse(stored) : [];
  });

  const [applications, setApplications] = useState<Application[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
    return stored ? JSON.parse(stored) : [];
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEYS.IS_ADMIN) === 'true';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CLUBS, JSON.stringify(clubs));
  }, [clubs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RECRUITMENTS, JSON.stringify(recruitments));
  }, [recruitments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.IS_ADMIN, isAdmin.toString());
  }, [isAdmin]);

  const addClub = (club: Omit<Club, 'id'>) => {
    const newClub = { ...club, id: Date.now().toString() };
    setClubs((prev) => [...prev, newClub]);
  };

  const addEvent = (event: Omit<Event, 'id'>) => {
    const newEvent = { 
      ...event, 
      id: Date.now().toString(),
      status: 'Upcoming' as const,
      registrations: []
    };
    setEvents((prev) => [...prev, newEvent]);
  };

  const addRecruitment = (recruitment: Omit<Recruitment, 'id'>) => {
    const newRecruitment = { ...recruitment, id: Date.now().toString() };
    setRecruitments((prev) => [...prev, newRecruitment]);
  };

  const addApplication = (application: Omit<Application, 'id'>) => {
    const newApplication = {
      ...application,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString(),
    };
    setApplications((prev) => [...prev, newApplication]);
  };

  const updateEvent = (id: string, certificatesUrl: string) => {
    setEvents((prev) =>
      prev.map((event) => (event.id === id ? { ...event, certificatesUrl } : event))
    );
  };

  const updateEventStatus = (id: string, status: Event['status']) => {
    setEvents((prev) =>
      prev.map((event) => (event.id === id ? { ...event, status } : event))
    );
  };

  const updateEventRegistrations = (eventId: string, registrations: EventRegistration[]) => {
    setEvents((prev) =>
      prev.map((event) => (event.id === eventId ? { ...event, registrations } : event))
    );
  };

  const login = (username: string, password: string): boolean => {
    // Simple authentication - in production, use proper authentication
    if (username === 'admin' && password === 'admin123') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
  };

  return (
    <AppContext.Provider
      value={{
        clubs,
        events,
        recruitments,
        applications,
        addClub,
        addEvent,
        addRecruitment,
        addApplication,
        updateEvent,
        updateEventStatus,
        updateEventRegistrations,
        isAdmin,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

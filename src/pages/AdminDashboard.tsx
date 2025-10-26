import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Plus, Users, Calendar, Briefcase, FileText, Award, Settings, ClipboardCheck } from 'lucide-react';
import { toast } from 'sonner';
import ManageEvents from '@/components/ManageEvents';
import TakeAttendance from '@/components/TakeAttendance';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isAdmin, logout, clubs, events, recruitments, applications, addEvent, addRecruitment, updateEvent } = useApp();

  // Redirect if not logged in
  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/login');
    }
  }, [isAdmin, navigate]);

  // Event form state
  const [eventForm, setEventForm] = useState({
    clubId: '',
    title: '',
    date: '',
    location: '',
    timings: '',
    description: '',
    posterUrl: '',
    registrationUrl: '',
  });

  // Recruitment form state
  const [recruitmentForm, setRecruitmentForm] = useState({
    clubId: '',
    position: '',
    description: '',
    deadline: '',
    isActive: true,
  });

  // Certificate form state
  const [certificateForm, setCertificateForm] = useState({
    eventId: '',
    certificatesUrl: '',
  });

  const handleEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEvent(eventForm);
    toast.success('Event added successfully!', {
      description: 'The event is now visible on the website.',
    });
    setEventForm({
      clubId: '',
      title: '',
      date: '',
      location: '',
      timings: '',
      description: '',
      posterUrl: '',
      registrationUrl: '',
    });
  };

  const handleRecruitmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addRecruitment(recruitmentForm);
    toast.success('Recruitment added successfully!', {
      description: 'The recruitment is now visible on the website.',
    });
    setRecruitmentForm({
      clubId: '',
      position: '',
      description: '',
      deadline: '',
      isActive: true,
    });
  };

  const handleCertificateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateEvent(certificateForm.eventId, certificateForm.certificatesUrl);
    toast.success('Certificate link added successfully!', {
      description: 'Students can now access the certificates.',
    });
    setCertificateForm({
      eventId: '',
      certificatesUrl: '',
    });
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero text-white py-6 px-4">
        <div className="container mx-auto max-w-6xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="secondary" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Website
              </Button>
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
          </div>
          <Button variant="secondary" size="sm" onClick={logout}>
            Logout
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <Tabs defaultValue="events" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 gap-2">
            <TabsTrigger value="events">
              <Calendar className="w-4 h-4 mr-2" />
              Add Event
            </TabsTrigger>
            <TabsTrigger value="recruitment">
              <Briefcase className="w-4 h-4 mr-2" />
              Add Recruitment
            </TabsTrigger>
            <TabsTrigger value="manage-events">
              <Settings className="w-4 h-4 mr-2" />
              Manage Events
            </TabsTrigger>
            <TabsTrigger value="attendance">
              <ClipboardCheck className="w-4 h-4 mr-2" />
              Attendance
            </TabsTrigger>
            <TabsTrigger value="applicants">
              <Users className="w-4 h-4 mr-2" />
              Applicants
              {applications.length > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                  {applications.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="certificates">
              <Award className="w-4 h-4 mr-2" />
              Certificates
            </TabsTrigger>
          </TabsList>

          {/* Add Event Tab */}
          <TabsContent value="events">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Plus className="w-6 h-6 text-primary" />
                Add New Event
              </h2>
              <form onSubmit={handleEventSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="club">Select Club *</Label>
                    <Select
                      required
                      value={eventForm.clubId}
                      onValueChange={(value) => setEventForm({ ...eventForm, clubId: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a club" />
                      </SelectTrigger>
                      <SelectContent>
                        {clubs.map((club) => (
                          <SelectItem key={club.id} value={club.id}>
                            {club.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">Event Title *</Label>
                    <Input
                      id="title"
                      required
                      value={eventForm.title}
                      onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                      placeholder="e.g., Tech Fest 2025"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      required
                      value={eventForm.date}
                      onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timings">Timings *</Label>
                    <Input
                      id="timings"
                      required
                      value={eventForm.timings}
                      onChange={(e) => setEventForm({ ...eventForm, timings: e.target.value })}
                      placeholder="e.g., 9:00 AM - 5:00 PM"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      required
                      value={eventForm.location}
                      onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                      placeholder="e.g., Main Auditorium, CBIT"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      required
                      value={eventForm.description}
                      onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                      placeholder="Describe the event..."
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="posterUrl">Poster Image URL</Label>
                    <Input
                      id="posterUrl"
                      type="url"
                      value={eventForm.posterUrl}
                      onChange={(e) => setEventForm({ ...eventForm, posterUrl: e.target.value })}
                      placeholder="https://example.com/poster.jpg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="registrationUrl">Registration Form URL</Label>
                    <Input
                      id="registrationUrl"
                      type="url"
                      value={eventForm.registrationUrl}
                      onChange={(e) => setEventForm({ ...eventForm, registrationUrl: e.target.value })}
                      placeholder="https://forms.google.com/..."
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary-dark">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Event
                </Button>
              </form>
            </Card>
          </TabsContent>

          {/* Add Recruitment Tab */}
          <TabsContent value="recruitment">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Plus className="w-6 h-6 text-primary" />
                Add New Recruitment
              </h2>
              <form onSubmit={handleRecruitmentSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="recruitClub">Select Club *</Label>
                    <Select
                      required
                      value={recruitmentForm.clubId}
                      onValueChange={(value) => setRecruitmentForm({ ...recruitmentForm, clubId: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a club" />
                      </SelectTrigger>
                      <SelectContent>
                        {clubs.map((club) => (
                          <SelectItem key={club.id} value={club.id}>
                            {club.logo} {club.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="position">Position Title *</Label>
                    <Input
                      id="position"
                      required
                      value={recruitmentForm.position}
                      onChange={(e) => setRecruitmentForm({ ...recruitmentForm, position: e.target.value })}
                      placeholder="e.g., Event Manager, Media Head"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="recruitDescription">Description *</Label>
                    <Textarea
                      id="recruitDescription"
                      required
                      value={recruitmentForm.description}
                      onChange={(e) => setRecruitmentForm({ ...recruitmentForm, description: e.target.value })}
                      placeholder="Describe the role and requirements..."
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deadline">Application Deadline *</Label>
                    <Input
                      id="deadline"
                      type="date"
                      required
                      value={recruitmentForm.deadline}
                      onChange={(e) => setRecruitmentForm({ ...recruitmentForm, deadline: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2 flex items-center justify-between p-4 border rounded-lg">
                    <Label htmlFor="isActive" className="cursor-pointer">Active Recruitment</Label>
                    <Switch
                      id="isActive"
                      checked={recruitmentForm.isActive}
                      onCheckedChange={(checked) => setRecruitmentForm({ ...recruitmentForm, isActive: checked })}
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary-dark">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Recruitment
                </Button>
              </form>
            </Card>
          </TabsContent>

          {/* Manage Events Tab - NEW */}
          <TabsContent value="manage-events">
            <ManageEvents />
          </TabsContent>

          {/* Take Attendance Tab - NEW */}
          <TabsContent value="attendance">
            <TakeAttendance />
          </TabsContent>

          {/* Applicants Tab */}
          <TabsContent value="applicants">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FileText className="w-6 h-6 text-primary" />
                All Applications ({applications.length})
              </h2>
              
              {applications.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Roll Number</TableHead>
                        <TableHead>Section</TableHead>
                        <TableHead>Year</TableHead>
                        <TableHead>Branch</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Submitted</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {applications.map((app) => {
                        const recruitment = recruitments.find((r) => r.id === app.recruitmentId);
                        const club = clubs.find((c) => c.id === app.clubId);
                        return (
                          <TableRow key={app.id}>
                            <TableCell className="font-medium">{app.name}</TableCell>
                            <TableCell>{app.rollNumber}</TableCell>
                            <TableCell>{app.section}</TableCell>
                            <TableCell>{app.year}</TableCell>
                            <TableCell>{app.branch}</TableCell>
                            <TableCell>
                              {recruitment?.position} <span className="text-muted-foreground">at {club?.name}</span>
                            </TableCell>
                            <TableCell>
                              {new Date(app.submittedAt).toLocaleDateString('en-IN')}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">No applications received yet</p>
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certificates">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Award className="w-6 h-6 text-primary" />
                Add Certificate Links
              </h2>
              <form onSubmit={handleCertificateSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="certEvent">Select Event *</Label>
                    <Select
                      required
                      value={certificateForm.eventId}
                      onValueChange={(value) => setCertificateForm({ ...certificateForm, eventId: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose an event" />
                      </SelectTrigger>
                      <SelectContent>
                        {events.map((event) => {
                          const club = clubs.find((c) => c.id === event.clubId);
                          return (
                            <SelectItem key={event.id} value={event.id}>
                              {event.title} ({club?.name})
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="certUrl">Google Drive/Certificate Link *</Label>
                    <Input
                      id="certUrl"
                      type="url"
                      required
                      value={certificateForm.certificatesUrl}
                      onChange={(e) => setCertificateForm({ ...certificateForm, certificatesUrl: e.target.value })}
                      placeholder="https://drive.google.com/..."
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary-dark">
                  <Award className="w-4 h-4 mr-2" />
                  Add Certificate Link
                </Button>
              </form>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Events with Certificates</h3>
                <div className="space-y-2">
                  {events.filter((e) => e.certificatesUrl).length > 0 ? (
                    events.filter((e) => e.certificatesUrl).map((event) => {
                      const club = clubs.find((c) => c.id === event.clubId);
                      return (
                        <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-medium">{event.title}</p>
                            <p className="text-sm text-muted-foreground">{club?.name}</p>
                          </div>
                          <a
                            href={event.certificatesUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline text-sm"
                          >
                            View Certificates →
                          </a>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-muted-foreground text-center py-8">No certificates added yet</p>
                  )}
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;

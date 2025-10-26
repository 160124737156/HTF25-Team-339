import { useState } from 'react';
import { useApp, EventRegistration } from '@/contexts/AppContext';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Download, Users } from 'lucide-react';
import { toast } from 'sonner';
import * as XLSX from 'xlsx';

const TakeAttendance = () => {
  const { events, clubs, updateEventRegistrations } = useApp();
  const [selectedEventId, setSelectedEventId] = useState('');
  const [attendanceMap, setAttendanceMap] = useState<Record<string, boolean>>({});

  const selectedEvent = events.find((e) => e.id === selectedEventId);
  const club = clubs.find((c) => c.id === selectedEvent?.clubId);

  // Generate sample registrations if none exist (for demo purposes)
  const registrations: EventRegistration[] = selectedEvent?.registrations?.length 
    ? selectedEvent.registrations 
    : selectedEvent 
    ? [
        {
          id: '1',
          eventId: selectedEvent.id,
          name: 'Sample Student 1',
          rollNumber: '160121733001',
          year: '3rd Year',
          section: 'A',
          attended: false,
          registeredAt: new Date().toISOString(),
        },
        {
          id: '2',
          eventId: selectedEvent.id,
          name: 'Sample Student 2',
          rollNumber: '160121733002',
          year: '2nd Year',
          section: 'B',
          attended: false,
          registeredAt: new Date().toISOString(),
        },
      ]
    : [];

  const handleAttendanceToggle = (registrationId: string, checked: boolean) => {
    setAttendanceMap((prev) => ({ ...prev, [registrationId]: checked }));
  };

  const handleSubmitAttendance = () => {
    if (!selectedEvent) return;

    const updatedRegistrations = registrations.map((reg) => ({
      ...reg,
      attended: attendanceMap[reg.id] || false,
    }));

    updateEventRegistrations(selectedEvent.id, updatedRegistrations);

    // Generate and download Excel
    const attendees = updatedRegistrations.filter((r) => r.attended);
    
    const excelData = attendees.map((reg) => ({
      'Roll Number': reg.rollNumber,
      'Name': reg.name,
      'Year': reg.year,
      'Section': reg.section,
      'Registered At': new Date(reg.registeredAt).toLocaleString('en-IN'),
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance');

    // Add event details at the top
    XLSX.utils.sheet_add_aoa(
      worksheet,
      [
        ['Event Title:', selectedEvent.title],
        ['Club:', club?.name || 'N/A'],
        ['Date:', new Date(selectedEvent.date).toLocaleDateString('en-IN')],
        ['Total Attendees:', attendees.length.toString()],
        ['Timestamp:', new Date().toLocaleString('en-IN')],
        [],
      ],
      { origin: 'A1' }
    );

    const fileName = `${selectedEvent.title.replace(/\s+/g, '_')}_Attendance_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);

    toast.success('Attendance recorded and downloaded!', {
      description: `${attendees.length} attendees marked present.`,
    });

    setAttendanceMap({});
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Users className="w-6 h-6 text-primary" />
        Take Attendance
      </h2>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="attendance-event">Select Event *</Label>
          <Select value={selectedEventId} onValueChange={setSelectedEventId}>
            <SelectTrigger>
              <SelectValue placeholder="Choose an event" />
            </SelectTrigger>
            <SelectContent>
              {events.map((event) => {
                const eventClub = clubs.find((c) => c.id === event.clubId);
                return (
                  <SelectItem key={event.id} value={event.id}>
                    {event.title} ({eventClub?.name}) - {new Date(event.date).toLocaleDateString('en-IN')}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        {selectedEvent && (
          <>
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">{selectedEvent.title}</h3>
              <p className="text-sm text-muted-foreground">
                {club?.name} • {new Date(selectedEvent.date).toLocaleDateString('en-IN')} • {selectedEvent.location}
              </p>
              <p className="text-sm mt-2">
                <strong>Total Registrations:</strong> {registrations.length}
              </p>
            </div>

            {registrations.length > 0 ? (
              <>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">Present</TableHead>
                        <TableHead>Roll Number</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Year</TableHead>
                        <TableHead>Section</TableHead>
                        <TableHead>Registered At</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {registrations.map((reg) => (
                        <TableRow key={reg.id}>
                          <TableCell>
                            <Checkbox
                              checked={attendanceMap[reg.id] || false}
                              onCheckedChange={(checked) =>
                                handleAttendanceToggle(reg.id, checked as boolean)
                              }
                            />
                          </TableCell>
                          <TableCell className="font-medium">{reg.rollNumber}</TableCell>
                          <TableCell>{reg.name}</TableCell>
                          <TableCell>{reg.year}</TableCell>
                          <TableCell>{reg.section}</TableCell>
                          <TableCell>
                            {new Date(reg.registeredAt).toLocaleDateString('en-IN')}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <Button
                  onClick={handleSubmitAttendance}
                  className="w-full"
                  disabled={Object.keys(attendanceMap).length === 0}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Submit & Download Attendance Excel
                </Button>
              </>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No registrations found for this event</p>
                <p className="text-sm mt-2">(Sample data will appear here for demo)</p>
              </div>
            )}
          </>
        )}
      </div>
    </Card>
  );
};

export default TakeAttendance;

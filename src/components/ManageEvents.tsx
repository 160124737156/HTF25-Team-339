import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin } from 'lucide-react';
import { toast } from 'sonner';

const ManageEvents = () => {
  const { events, clubs, updateEventStatus } = useApp();
  const [selectedStatuses, setSelectedStatuses] = useState<Record<string, string>>({});

  const handleStatusChange = (eventId: string, status: string) => {
    setSelectedStatuses((prev) => ({ ...prev, [eventId]: status }));
  };

  const handleUpdateStatus = (eventId: string) => {
    const newStatus = selectedStatuses[eventId];
    if (!newStatus) return;

    updateEventStatus(eventId, newStatus as any);
    toast.success('Event status updated successfully!', {
      description: `The event status has been updated to ${newStatus}.`,
    });
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500';
      case 'Postponed':
        return 'bg-orange-500';
      case 'Preponed':
        return 'bg-blue-500';
      default:
        return 'bg-primary';
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Events</h2>
      
      {events.length > 0 ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event Title</TableHead>
                <TableHead>Club</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Current Status</TableHead>
                <TableHead>Update Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => {
                const club = clubs.find((c) => c.id === event.clubId);
                return (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.title}</TableCell>
                    <TableCell>{club?.name || 'Unknown'}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        {new Date(event.date).toLocaleDateString('en-IN')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        {event.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(event.status)}>
                        {event.status || 'Upcoming'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={selectedStatuses[event.id] || event.status || 'Upcoming'}
                        onValueChange={(value) => handleStatusChange(event.id, value)}
                      >
                        <SelectTrigger className="w-[150px]">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Upcoming">Upcoming</SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                          <SelectItem value="Postponed">Postponed</SelectItem>
                          <SelectItem value="Preponed">Preponed</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        onClick={() => handleUpdateStatus(event.id)}
                        disabled={!selectedStatuses[event.id] || selectedStatuses[event.id] === event.status}
                      >
                        Update
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg">No events found</p>
        </div>
      )}
    </Card>
  );
};

export default ManageEvents;

import { useState } from 'react';
import { Recruitment, useApp } from '@/contexts/AppContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Briefcase, Calendar, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface RecruitmentCardProps {
  recruitment: Recruitment;
}

const RecruitmentCard = ({ recruitment }: RecruitmentCardProps) => {
  const { addApplication, clubs } = useApp();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    section: '',
    year: '',
    branch: '',
  });

  const club = clubs.find((c) => c.id === recruitment.clubId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addApplication({
      recruitmentId: recruitment.id,
      clubId: recruitment.clubId,
      ...formData,
    });

    toast.success('Application submitted successfully!', {
      description: `Your application for ${recruitment.position} has been received.`,
    });

    setFormData({
      name: '',
      rollNumber: '',
      section: '',
      year: '',
      branch: '',
    });
    setOpen(false);
  };

  if (!recruitment.isActive) return null;

  return (
    <Card className="p-6 hover:shadow-md transition-all duration-300">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-bold text-xl text-foreground flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary" />
              {recruitment.position}
            </h3>
            {club && (
              <p className="text-sm text-muted-foreground">at {club.name}</p>
            )}
          </div>
          {recruitment.isActive && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium">
              <CheckCircle className="w-3 h-3" />
              Active
            </span>
          )}
        </div>

        <p className="text-sm text-muted-foreground">
          {recruitment.description}
        </p>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4 text-primary" />
          <span>
            Deadline: {new Date(recruitment.deadline).toLocaleDateString('en-IN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="w-full bg-primary hover:bg-primary-dark">
              Apply Now
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Apply for {recruitment.position}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rollNumber">Roll Number *</Label>
                <Input
                  id="rollNumber"
                  required
                  value={formData.rollNumber}
                  onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                  placeholder="Enter your roll number"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="section">Section *</Label>
                  <Input
                    id="section"
                    required
                    value={formData.section}
                    onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                    placeholder="e.g., A"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year">Year *</Label>
                  <Input
                    id="year"
                    required
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="e.g., 2nd Year"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="branch">Branch/Degree *</Label>
                <Input
                  id="branch"
                  required
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  placeholder="e.g., CSE, ECE, etc."
                />
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary-dark">
                Submit Application
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </Card>
  );
};

export default RecruitmentCard;

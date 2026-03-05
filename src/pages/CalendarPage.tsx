import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold font-display">Calendar</h1>
          <p className="text-muted-foreground">View upcoming events and deadlines</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardContent className="p-4 flex justify-center">
              <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md" />
            </CardContent>
          </Card>
          <Card className="lg:col-span-2">
            <CardHeader><CardTitle className="text-lg">Upcoming Events</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {[
                { title: 'Mid-term Examinations', date: 'Mar 15, 2026', type: 'Exam' },
                { title: 'Workshop on AI/ML', date: 'Mar 20, 2026', type: 'Workshop' },
                { title: 'Sports Day', date: 'Mar 25, 2026', type: 'Event' },
                { title: 'Project Submission Deadline', date: 'Apr 1, 2026', type: 'Deadline' },
              ].map((event, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <CalendarIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.date}</p>
                  </div>
                  <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full">{event.type}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CalendarPage;

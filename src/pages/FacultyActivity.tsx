import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, MessageSquare, CheckCircle } from 'lucide-react';
import StatsCard from '@/components/StatsCard';

const FacultyActivity = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold font-display">Faculty Activity</h1>
          <p className="text-muted-foreground">Monitor faculty performance across departments</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatsCard title="Active Faculty" value={15} icon={<Users className="h-6 w-6" />} />
          <StatsCard title="Notices Posted" value={42} icon={<FileText className="h-6 w-6" />} />
          <StatsCard title="Issues Resolved" value={128} icon={<CheckCircle className="h-6 w-6" />} />
        </div>
        <Card>
          <CardHeader><CardTitle className="text-lg">Faculty Overview</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Dr. Smith', dept: 'Computer Science', resolved: 15, pending: 2 },
                { name: 'Prof. Johnson', dept: 'Electronics', resolved: 12, pending: 3 },
                { name: 'Dr. Williams', dept: 'Mechanical', resolved: 18, pending: 1 },
                { name: 'Prof. Davis', dept: 'Civil', resolved: 10, pending: 4 },
              ].map((f, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      {f.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{f.name}</p>
                      <p className="text-xs text-muted-foreground">{f.dept}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-success">{f.resolved} resolved</p>
                    <p className="text-xs text-muted-foreground">{f.pending} pending</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default FacultyActivity;

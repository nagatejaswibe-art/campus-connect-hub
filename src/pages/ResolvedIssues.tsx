import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import StatusBadge from '@/components/StatusBadge';
import { CheckCircle } from 'lucide-react';

const ResolvedIssues = () => {
  const resolved = [
    { title: 'Water supply issue - Hostel A', date: 'Mar 1, 2026', type: 'Complaint' },
    { title: 'Lab equipment request', date: 'Feb 28, 2026', type: 'Request' },
    { title: 'WiFi connectivity issue', date: 'Feb 25, 2026', type: 'Complaint' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold font-display">Resolved Issues</h1>
          <p className="text-muted-foreground">Previously resolved complaints and requests</p>
        </div>
        <div className="space-y-4">
          {resolved.map((r, i) => (
            <Card key={i}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <div>
                    <p className="font-medium text-sm">{r.title}</p>
                    <p className="text-xs text-muted-foreground">{r.date} • {r.type}</p>
                  </div>
                </div>
                <StatusBadge status="resolved" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ResolvedIssues;

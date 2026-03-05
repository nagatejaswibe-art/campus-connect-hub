import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import StatusBadge from '@/components/StatusBadge';
import { toast } from 'sonner';
import { CheckCircle, XCircle } from 'lucide-react';

const LeaveApprovals = () => {
  const [leaves, setLeaves] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchLeaves(); }, []);

  const fetchLeaves = async () => {
    const { data } = await supabase.from('leaves').select('*').order('created_at', { ascending: false });
    setLeaves(data || []);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from('leaves').update({ status }).eq('id', id);
    if (error) toast.error('Failed to update');
    else { toast.success(`Leave ${status}`); fetchLeaves(); }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold font-display">Leave Approvals</h1>
          <p className="text-muted-foreground">Review student leave applications</p>
        </div>
        {loading ? <p className="text-muted-foreground">Loading...</p> :
        leaves.length === 0 ? (
          <Card><CardContent className="p-8 text-center text-muted-foreground">No leave applications.</CardContent></Card>
        ) : (
          <div className="space-y-4">
            {leaves.map((l) => (
              <Card key={l.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{l.reason}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {new Date(l.from_date).toLocaleDateString()} → {new Date(l.to_date).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-muted-foreground">{l.department}</p>
                    </div>
                    <StatusBadge status={l.status} />
                  </div>
                  {l.status === 'pending' && (
                    <div className="flex gap-2 mt-3 pt-3 border-t border-border/50">
                      <Button size="sm" onClick={() => updateStatus(l.id, 'approved')}>
                        <CheckCircle className="mr-1 h-3 w-3" /> Approve
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => updateStatus(l.id, 'rejected')}>
                        <XCircle className="mr-1 h-3 w-3" /> Reject
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default LeaveApprovals;

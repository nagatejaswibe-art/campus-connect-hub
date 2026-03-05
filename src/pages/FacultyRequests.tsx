import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import StatusBadge from '@/components/StatusBadge';
import { toast } from 'sonner';
import { CheckCircle, XCircle } from 'lucide-react';

const FacultyRequests = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchRequests(); }, []);

  const fetchRequests = async () => {
    const { data } = await supabase.from('requests').select('*').order('created_at', { ascending: false });
    setRequests(data || []);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from('requests').update({ status }).eq('id', id);
    if (error) toast.error('Failed to update');
    else { toast.success(`Request ${status}`); fetchRequests(); }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold font-display">
            {user?.role === 'admin' ? 'All Requests' : 'Student Requests'}
          </h1>
          <p className="text-muted-foreground">Review and manage student requests</p>
        </div>
        {loading ? <p className="text-muted-foreground">Loading...</p> :
        requests.length === 0 ? (
          <Card><CardContent className="p-8 text-center text-muted-foreground">No requests found.</CardContent></Card>
        ) : (
          <div className="space-y-4">
            {requests.map((r) => (
              <Card key={r.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">{r.type}</span>
                      <p className="font-medium mt-1">{r.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{r.department} • {new Date(r.created_at).toLocaleDateString()}</p>
                    </div>
                    <StatusBadge status={r.status} />
                  </div>
                  {r.status === 'pending' && (user?.role === 'faculty' || user?.role === 'admin') && (
                    <div className="flex gap-2 mt-3 pt-3 border-t border-border/50">
                      <Button size="sm" onClick={() => updateStatus(r.id, 'approved')}>
                        <CheckCircle className="mr-1 h-3 w-3" /> Approve
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => updateStatus(r.id, 'rejected')}>
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

export default FacultyRequests;

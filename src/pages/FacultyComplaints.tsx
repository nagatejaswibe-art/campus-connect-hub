import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import StatusBadge from '@/components/StatusBadge';
import { toast } from 'sonner';
import { CheckCircle, XCircle, Forward, MessageSquare } from 'lucide-react';

const FacultyComplaints = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState<any[]>([]);
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    const { data } = await supabase.from('complaints').select('*').order('created_at', { ascending: false });
    setComplaints(data || []);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string, reply?: string) => {
    const update: any = { status };
    if (reply) update.faculty_reply = reply;
    const { error } = await supabase.from('complaints').update(update).eq('id', id);
    if (error) toast.error('Failed to update');
    else {
      toast.success(`Status updated to ${status}`);
      fetchComplaints();
    }
  };

  const forwardToAdmin = async (id: string) => {
    const { error } = await supabase.from('complaints').update({ forwarded_to_admin: true }).eq('id', id);
    if (error) toast.error('Failed to forward');
    else {
      toast.success('Forwarded to admin');
      fetchComplaints();
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold font-display">
            {user?.role === 'admin' ? 'All Complaints' : 'Student Complaints'}
          </h1>
          <p className="text-muted-foreground">Review and manage complaints</p>
        </div>
        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : complaints.length === 0 ? (
          <Card><CardContent className="p-8 text-center text-muted-foreground">No complaints found.</CardContent></Card>
        ) : (
          <div className="space-y-4">
            {complaints.map((c) => (
              <Card key={c.id}>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full capitalize">{c.category}</span>
                        <span className="text-xs text-muted-foreground">{c.department}</span>
                        {c.forwarded_to_admin && <span className="text-xs bg-warning/10 text-warning px-2 py-0.5 rounded-full">Forwarded</span>}
                      </div>
                      <p className="font-medium">{c.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{new Date(c.created_at).toLocaleDateString()}</p>
                      {c.faculty_reply && (
                        <div className="mt-2 p-2 bg-muted/50 rounded text-sm">
                          <span className="font-medium">Reply:</span> {c.faculty_reply}
                        </div>
                      )}
                    </div>
                    <StatusBadge status={c.status} />
                  </div>
                  {c.status !== 'resolved' && (
                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/50">
                      <Textarea
                        placeholder="Add reply..."
                        value={replyText[c.id] || ''}
                        onChange={(e) => setReplyText({ ...replyText, [c.id]: e.target.value })}
                        rows={2}
                        className="flex-1 min-w-[200px]"
                      />
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => updateStatus(c.id, 'in-progress', replyText[c.id])}>
                          <MessageSquare className="mr-1 h-3 w-3" /> Reply
                        </Button>
                        <Button size="sm" onClick={() => updateStatus(c.id, 'resolved', replyText[c.id])}>
                          <CheckCircle className="mr-1 h-3 w-3" /> Resolve
                        </Button>
                        {user?.role === 'faculty' && !c.forwarded_to_admin && (
                          <Button size="sm" variant="secondary" onClick={() => forwardToAdmin(c.id)}>
                            <Forward className="mr-1 h-3 w-3" /> Forward
                          </Button>
                        )}
                      </div>
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

export default FacultyComplaints;

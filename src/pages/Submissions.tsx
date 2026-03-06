import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StatusBadge from '@/components/StatusBadge';
import { MessageSquare, Send, Clock, FileText } from 'lucide-react';

const Submissions = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [leaves, setLeaves] = useState<any[]>([]);
  const [feedback, setFeedback] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      supabase.from('complaints').select('*').eq('student_id', user.id).order('created_at', { ascending: false }),
      supabase.from('requests').select('*').eq('student_id', user.id).order('created_at', { ascending: false }),
      supabase.from('leaves').select('*').eq('student_id', user.id).order('created_at', { ascending: false }),
      supabase.from('feedback').select('*').eq('student_id', user.id).order('created_at', { ascending: false }),
    ]).then(([c, r, l, f]) => {
      setComplaints(c.data || []);
      setRequests(r.data || []);
      setLeaves(l.data || []);
      setFeedback(f.data || []);
      setLoading(false);
    });
  }, [user]);

  const renderEmpty = () => (
    <p className="text-muted-foreground text-center py-8">No submissions found.</p>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold font-display">My Submissions</h1>
          <p className="text-muted-foreground">Complete history of all your submissions</p>
        </div>
        {loading ? <p className="text-muted-foreground">Loading...</p> : (
          <Tabs defaultValue="complaints">
            <TabsList className="flex-wrap">
              <TabsTrigger value="complaints" className="gap-1"><MessageSquare className="h-3.5 w-3.5" /> Complaints ({complaints.length})</TabsTrigger>
              <TabsTrigger value="requests" className="gap-1"><Send className="h-3.5 w-3.5" /> Requests ({requests.length})</TabsTrigger>
              <TabsTrigger value="leaves" className="gap-1"><Clock className="h-3.5 w-3.5" /> Leaves ({leaves.length})</TabsTrigger>
              <TabsTrigger value="feedback" className="gap-1"><FileText className="h-3.5 w-3.5" /> Feedback ({feedback.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="complaints" className="mt-4 space-y-3">
              {complaints.length === 0 ? renderEmpty() : complaints.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4 flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full capitalize">{item.category}</span>
                      </div>
                      <p className="font-medium text-sm">{(item as any).title || item.description?.slice(0, 60)}</p>
                      <p className="text-xs text-muted-foreground mt-1">{new Date(item.created_at).toLocaleDateString()}</p>
                      {item.faculty_reply && (
                        <div className="mt-2 p-2 bg-muted/50 rounded text-xs"><span className="font-medium">Reply:</span> {item.faculty_reply}</div>
                      )}
                    </div>
                    <StatusBadge status={item.status} />
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="requests" className="mt-4 space-y-3">
              {requests.length === 0 ? renderEmpty() : requests.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4 flex items-start justify-between">
                    <div>
                      <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">{item.type}</span>
                      <p className="font-medium text-sm mt-1">{item.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{new Date(item.created_at).toLocaleDateString()}</p>
                    </div>
                    <StatusBadge status={item.status} />
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="leaves" className="mt-4 space-y-3">
              {leaves.length === 0 ? renderEmpty() : leaves.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4 flex items-start justify-between">
                    <div>
                      <p className="font-medium text-sm">{item.reason}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {new Date(item.from_date).toLocaleDateString()} → {new Date(item.to_date).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-muted-foreground">{item.department}</p>
                    </div>
                    <StatusBadge status={item.status} />
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="feedback" className="mt-4 space-y-3">
              {feedback.length === 0 ? renderEmpty() : feedback.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <p className="font-medium text-sm">{item.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{new Date(item.created_at).toLocaleDateString()}</p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Submissions;

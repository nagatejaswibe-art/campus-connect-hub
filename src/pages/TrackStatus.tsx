import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StatusBadge from '@/components/StatusBadge';

const TrackStatus = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [leaves, setLeaves] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    supabase.from('complaints').select('*').eq('student_id', user.id).order('created_at', { ascending: false }).then(({ data }) => setComplaints(data || []));
    supabase.from('requests').select('*').eq('student_id', user.id).order('created_at', { ascending: false }).then(({ data }) => setRequests(data || []));
    supabase.from('leaves').select('*').eq('student_id', user.id).order('created_at', { ascending: false }).then(({ data }) => setLeaves(data || []));
  }, [user]);

  const renderItems = (items: any[], titleKey: string) => (
    items.length === 0 ? (
      <p className="text-muted-foreground text-center py-8">No items found.</p>
    ) : (
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border/50">
            <div>
              <p className="font-medium text-sm">{item[titleKey] || item.description?.slice(0, 50)}</p>
              <p className="text-xs text-muted-foreground mt-1">{new Date(item.created_at).toLocaleDateString()}</p>
            </div>
            <StatusBadge status={item.status} />
          </div>
        ))}
      </div>
    )
  );

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold font-display">Track Status</h1>
          <p className="text-muted-foreground">Monitor your submissions</p>
        </div>
        <Tabs defaultValue="complaints">
          <TabsList>
            <TabsTrigger value="complaints">Complaints ({complaints.length})</TabsTrigger>
            <TabsTrigger value="requests">Requests ({requests.length})</TabsTrigger>
            <TabsTrigger value="leaves">Leaves ({leaves.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="complaints" className="mt-4">
            {renderItems(complaints, 'category')}
          </TabsContent>
          <TabsContent value="requests" className="mt-4">
            {renderItems(requests, 'type')}
          </TabsContent>
          <TabsContent value="leaves" className="mt-4">
            {renderItems(leaves, 'reason')}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default TrackStatus;

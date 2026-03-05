import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bookmark, Search, Calendar as CalendarIcon } from 'lucide-react';
import { toast } from 'sonner';

interface Notice {
  id: string;
  title: string;
  description: string;
  event_date: string | null;
  department: string | null;
  is_global: boolean | null;
  pinned: boolean | null;
  created_at: string;
}

const Notices = () => {
  const { user } = useAuth();
  const [notices, setNotices] = useState<Notice[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    const { data, error } = await supabase.from('notices').select('*').order('created_at', { ascending: false });
    if (data) setNotices(data);
    setLoading(false);
  };

  const saveNotice = async (noticeId: string) => {
    if (!user) return;
    const { error } = await supabase.from('saved_notices').insert({ user_id: user.id, notice_id: noticeId });
    if (error) {
      if (error.code === '23505') toast.info('Already saved!');
      else toast.error('Failed to save notice');
    } else {
      toast.success('Notice saved!');
    }
  };

  const filtered = notices.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold font-display">Notices</h1>
            <p className="text-muted-foreground">View all active notices</p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search notices..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
          </div>
        </div>
        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : filtered.length === 0 ? (
          <Card><CardContent className="p-8 text-center text-muted-foreground">No notices found.</CardContent></Card>
        ) : (
          <div className="grid gap-4">
            {filtered.map((notice) => (
              <Card key={notice.id} className={notice.pinned ? 'border-primary/30 bg-primary/5' : ''}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {notice.pinned && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">Pinned</span>}
                        {notice.department && <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">{notice.department}</span>}
                        {notice.is_global && <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full">Global</span>}
                      </div>
                      <h3 className="font-semibold">{notice.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{notice.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>{new Date(notice.created_at).toLocaleDateString()}</span>
                        {notice.event_date && (
                          <span className="flex items-center gap-1">
                            <CalendarIcon className="h-3 w-3" /> Event: {new Date(notice.event_date).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                    {user?.role === 'student' && (
                      <Button variant="ghost" size="icon" onClick={() => saveNotice(notice.id)}>
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Notices;

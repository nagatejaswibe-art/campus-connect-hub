import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bookmark, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const SavedNotices = () => {
  const { user } = useAuth();
  const [saved, setSaved] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchSaved(); }, []);

  const fetchSaved = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('saved_notices')
      .select('*, notices(*)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    setSaved(data || []);
    setLoading(false);
  };

  const removeSaved = async (id: string) => {
    const { error } = await supabase.from('saved_notices').delete().eq('id', id);
    if (error) toast.error('Failed to remove');
    else { toast.success('Removed'); fetchSaved(); }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold font-display">Saved Notices</h1>
          <p className="text-muted-foreground">Your bookmarked notices</p>
        </div>
        {loading ? <p className="text-muted-foreground">Loading...</p> :
        saved.length === 0 ? (
          <Card><CardContent className="p-8 text-center text-muted-foreground">No saved notices yet.</CardContent></Card>
        ) : (
          <div className="grid gap-4">
            {saved.map((s) => (
              <Card key={s.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{(s.notices as any)?.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{(s.notices as any)?.description}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeSaved(s.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
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

export default SavedNotices;

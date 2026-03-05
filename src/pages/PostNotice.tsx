import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { FileText, Send } from 'lucide-react';

const DEPARTMENTS = ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Electrical', 'Information Technology'];

const PostNotice = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [department, setDepartment] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [isGlobal, setIsGlobal] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !title.trim() || !description.trim()) {
      toast.error('Please fill required fields');
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from('notices').insert({
        title: title.trim(),
        description: description.trim(),
        department: isGlobal ? null : (department || user.department || null),
        event_date: eventDate || null,
        is_global: isGlobal,
        pinned,
        created_by: user.id,
      });
      if (error) throw error;
      toast.success('Notice posted!');
      setTitle('');
      setDescription('');
      setDepartment('');
      setEventDate('');
      setIsGlobal(false);
      setPinned(false);
    } catch (err: any) {
      toast.error(err.message || 'Failed to post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in max-w-2xl">
        <div>
          <h1 className="text-2xl font-bold font-display">Post Notice</h1>
          <p className="text-muted-foreground">Create a new notice for students</p>
        </div>
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Title *</Label>
                <Input placeholder="Notice title" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Description *</Label>
                <Textarea placeholder="Notice details..." value={description} onChange={(e) => setDescription(e.target.value)} rows={5} />
              </div>
              {!isGlobal && (
                <div className="space-y-2">
                  <Label>Department</Label>
                  <Select value={department} onValueChange={setDepartment}>
                    <SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
                    <SelectContent>
                      {DEPARTMENTS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div className="space-y-2">
                <Label>Event Date (optional)</Label>
                <Input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Switch checked={isGlobal} onCheckedChange={setIsGlobal} />
                  <Label>Global Notice</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={pinned} onCheckedChange={setPinned} />
                  <Label>Pin Notice</Label>
                </div>
              </div>
              <Button type="submit" disabled={loading}>
                <Send className="mr-2 h-4 w-4" />
                {loading ? 'Posting...' : 'Post Notice'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PostNotice;

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Send } from 'lucide-react';

const REQUEST_TYPES = ['Bonafide Certificate', 'Document Request', 'Academic Support Request', 'Lab Access', 'Other'];

const Requests = () => {
  const { user } = useAuth();
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !type || !description.trim()) {
      toast.error('Please fill all fields');
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from('requests').insert({
        student_id: user.id,
        department: user.department || 'General',
        type,
        description: description.trim(),
      });
      if (error) throw error;
      toast.success('Request submitted!');
      setType('');
      setDescription('');
    } catch (err: any) {
      toast.error(err.message || 'Failed to submit');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in max-w-2xl">
        <div>
          <h1 className="text-2xl font-bold font-display">Send Request</h1>
          <p className="text-muted-foreground">Submit a request to your department faculty</p>
        </div>
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Request Type</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger><SelectValue placeholder="Select request type" /></SelectTrigger>
                  <SelectContent>
                    {REQUEST_TYPES.map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea placeholder="Describe your request..." value={description} onChange={(e) => setDescription(e.target.value)} rows={5} />
              </div>
              <Button type="submit" disabled={loading}>
                <Send className="mr-2 h-4 w-4" />
                {loading ? 'Submitting...' : 'Submit Request'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Requests;

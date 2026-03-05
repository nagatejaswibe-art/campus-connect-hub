import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Send } from 'lucide-react';

const Feedback = () => {
  const { user } = useAuth();
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !description.trim()) {
      toast.error('Please enter your feedback');
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from('feedback').insert({
        student_id: user.id,
        department: user.department || 'General',
        description: description.trim(),
      });
      if (error) throw error;
      toast.success('Feedback submitted!');
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
          <h1 className="text-2xl font-bold font-display">Send Feedback</h1>
          <p className="text-muted-foreground">Share your feedback with the department</p>
        </div>
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Your Feedback</Label>
                <Textarea placeholder="Write your feedback..." value={description} onChange={(e) => setDescription(e.target.value)} rows={6} />
              </div>
              <Button type="submit" disabled={loading}>
                <Send className="mr-2 h-4 w-4" />
                {loading ? 'Submitting...' : 'Submit Feedback'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Feedback;
